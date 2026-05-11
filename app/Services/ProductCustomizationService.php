<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use JsonException;
use Throwable;

class ProductCustomizationService
{
    /** @see https://www.php.net/manual/en/function.json-encode.php */
    private const JSON_ENCODE_DEPTH = 8192;

    /**
     * Turn nested stdClass/object trees from decoding into plain arrays for validation & hashing.
     *
     * @return array<string, mixed>
     */
    public function normalizeFabricTree(mixed $fabric): array
    {
        if ($fabric === null) {
            return [];
        }

        if (! is_array($fabric) && ! is_object($fabric)) {
            throw new \InvalidArgumentException('Customization design fabric must be a JSON-like array or object.');
        }

        $json = json_encode(
            $fabric,
            \JSON_UNESCAPED_UNICODE | \JSON_INVALID_UTF8_SUBSTITUTE,
            self::JSON_ENCODE_DEPTH,
        );

        if ($json === false) {
            throw new \InvalidArgumentException('Customization design JSON could not be normalized.');
        }

        try {
            $decoded = json_decode($json, true, self::JSON_ENCODE_DEPTH, \JSON_THROW_ON_ERROR);
        } catch (JsonException $e) {
            throw new \InvalidArgumentException(
                'Customization design JSON could not be normalized: '.$e->getMessage(),
                previous: $e,
            );
        }

        return is_array($decoded) ? $decoded : [];
    }

    /**
     * Recursive key sorting for deterministic checksums without {@see \JSON_SORT_KEYS}.
     *
     * Some PHP builds shipped with Windows / XAMPP omit the JSON_SORT_KEYS constant; this matches the typical effect of sorting object keys during encoding.
     */
    private function deepSortAssocKeysForHash(mixed $value): mixed
    {
        if (! is_array($value)) {
            return $value;
        }

        foreach ($value as $k => $child) {
            $value[$k] = $this->deepSortAssocKeysForHash($child);
        }

        if (array_is_list($value)) {
            return $value;
        }

        ksort($value);

        return $value;
    }

    /**
     * Stable hash for merging cart lines — uses Fabric JSON only.
     *
     * @param  array<string, mixed>|null  $fabric
     */
    public function checksumFabric(?array $fabric): ?string
    {
        if ($fabric === null || $fabric === []) {
            return null;
        }

        $normalized = $this->normalizeFabricTree($fabric);
        $sortedForHash = $this->deepSortAssocKeysForHash($normalized);

        try {
            $payload = json_encode(
                $sortedForHash,
                \JSON_THROW_ON_ERROR | \JSON_UNESCAPED_UNICODE | \JSON_INVALID_UTF8_SUBSTITUTE,
                self::JSON_ENCODE_DEPTH,
            );

            return hash('sha256', $payload);
        } catch (JsonException $e) {
            $fallback = json_encode(
                $sortedForHash,
                \JSON_UNESCAPED_UNICODE | \JSON_INVALID_UTF8_SUBSTITUTE | \JSON_PARTIAL_OUTPUT_ON_ERROR,
                self::JSON_ENCODE_DEPTH,
            );

            return hash(
                'sha256',
                $fallback !== false ? $fallback : substr(serialize($normalized), 0, 65535),
            );
        }
    }

    public function decodeBase64Png(?string $dataUriOrBase64): ?string
    {
        if ($dataUriOrBase64 === null || $dataUriOrBase64 === '') {
            return null;
        }

        $raw = preg_replace('#^data:image/png;base64,#i', '', $dataUriOrBase64);

        return $raw !== null ? $raw : $dataUriOrBase64;
    }

    /**
     * @return array{fabric:mixed,width?:int,height?:int,variation_id?:int,product_id:int}
     *
     * @throws \InvalidArgumentException
     */
    public function normalizeDesign(array $design, int $productId): array
    {
        if (! array_key_exists('fabric', $design) || $design['fabric'] === null) {
            throw new \InvalidArgumentException('Invalid customization design.');
        }

        $fabric = $this->normalizeFabricTree($design['fabric']);

        if (! isset($fabric['objects']) || ! is_array($fabric['objects'])) {
            throw new \InvalidArgumentException('Invalid customization design.');
        }

        return [
            'product_id' => $productId,
            'fabric' => $fabric,
            'canvas_width' => isset($design['canvas_width']) ? (int) $design['canvas_width'] : null,
            'canvas_height' => isset($design['canvas_height']) ? (int) $design['canvas_height'] : null,
            'variation_id' => isset($design['variation_id']) ? (int) $design['variation_id'] : null,
            'saved_at' => now()->toIso8601String(),
        ];
    }

    public function storePreviewPng(string $base64): string|false
    {
        $decoded = base64_decode($this->decodeBase64Png($base64) ?? '', true);

        if ($decoded === false || $decoded === '') {
            return false;
        }

        if (strlen($decoded) > 8 * 1024 * 1024) {
            return false;
        }

        try {
            if (@imagecreatefromstring($decoded) === false) {
                return false;
            }
        } catch (Throwable) {
            return false;
        }

        $path = sprintf(
            'customizations/previews/%s/%s.png',
            now()->format('Y/m'),
            Str::lower(Str::random(40))
        );

        Storage::disk('public')->put($path, $decoded);

        return $path;
    }

    /**
     * Collect storage paths referenced by uploaded asset URLs in a Fabric export.
     *
     * @param  array<string, mixed>  $fabric
     * @return array<int, string>
     */
    public function extractReferencedStoragePaths(array $fabric): array
    {
        $urls = [];
        $walk = function ($node) use (&$walk, &$urls): void {
            if (is_array($node)) {
                foreach ($node as $value) {
                    $walk($value);
                }

                return;
            }

            if (! is_string($node) || $node === '') {
                return;
            }

            if (! str_contains($node, '/storage/')) {
                return;
            }

            if (! str_contains($node, 'customizations/')) {
                return;
            }

            if (preg_match('#/storage/(.+)$#', $node, $m)) {
                $urls[] = urldecode($m[1]);
            }
        };

        $walk($fabric['objects'] ?? []);

        return array_values(array_unique($urls));
    }

    /**
     * @param  mixed  $store
     * @return array<int, string>
     */
    public function summarizeTexts($store): array
    {
        if ($store instanceof \BackedEnum) {
            return [];
        }

        if (is_string($store)) {
            try {
                $store = json_decode($store, true, 512, \JSON_THROW_ON_ERROR);
            } catch (Throwable) {
                return [];
            }
        }

        if (! is_array($store)) {
            return [];
        }

        $fabric = $store['fabric'] ?? null;
        $objects = [];

        if (is_array($fabric) && isset($fabric['objects']) && is_array($fabric['objects'])) {
            $objects = $fabric['objects'];
        }

        $out = [];

        foreach ($objects as $obj) {
            if (! is_array($obj)) {
                continue;
            }

            $type = strtolower((string) ($obj['type'] ?? ''));

            if (in_array($type, ['i-text', 'itext', 'textbox', 'text', 'textarea'], true)) {
                $text = isset($obj['text']) ? trim((string) $obj['text']) : '';

                if ($text !== '' && mb_strlen($text) <= 2000) {
                    $out[] = $text;
                }
            }
        }

        return $out;
    }
}
