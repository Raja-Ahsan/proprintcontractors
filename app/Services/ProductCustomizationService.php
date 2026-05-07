<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Throwable;

class ProductCustomizationService
{
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

        return hash('sha256', json_encode($fabric, JSON_THROW_ON_ERROR | JSON_SORT_KEYS | JSON_UNESCAPED_UNICODE));
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
        if (! isset($design['fabric']) || ! is_array($design['fabric'])) {
            throw new \InvalidArgumentException('Invalid customization design.');
        }

        return [
            'product_id' => $productId,
            'fabric' => $design['fabric'],
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
                $store = json_decode($store, true, 512, JSON_THROW_ON_ERROR);
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
