<?php

namespace App\Services;

use App\Models\CustomOrderSubmission;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;

class CustomOrderSubmissionService
{
    /**
     * @param  array<string, mixed>  $validated
     */
    public function create(Request $request, array $validated): CustomOrderSubmission
    {
        $submission = CustomOrderSubmission::query()->create([
            'submission_number' => $this->generateSubmissionNumber(),
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'order_date' => $validated['order_date'] ?? null,
            'design_notes' => $validated['design_notes'] ?? null,
            'order_items' => $this->normalizeOrderItems($validated['order_items'] ?? []),
            'artwork_files' => [],
        ]);

        $artworkFiles = $this->storeArtworkFiles($request, $submission);

        if ($artworkFiles !== []) {
            $submission->update(['artwork_files' => $artworkFiles]);
        }

        return $submission->fresh();
    }

    /**
     * @param  list<array<string, mixed>>  $items
     * @return list<array<string, mixed>>
     */
    public function normalizeOrderItems(array $items): array
    {
        return collect($items)
            ->map(function (array $item): array {
                $color = trim((string) ($item['color_material'] ?? ''));

                return [
                    'category' => (string) ($item['category'] ?? ''),
                    'quantity' => isset($item['quantity']) && $item['quantity'] !== ''
                        ? (int) $item['quantity']
                        : null,
                    'size_specs' => $this->nullableString($item['size_specs'] ?? null),
                    'color_material' => $color !== '' ? $color : null,
                    'notes' => $this->nullableString($item['notes'] ?? null),
                ];
            })
            ->values()
            ->all();
    }

    public function orderItemsHtml(CustomOrderSubmission $submission): string
    {
        $rows = '';

        foreach ($submission->order_items ?? [] as $item) {
            $color = $item['color_material'] ?? null;
            $colorCell = $color
                ? '<span style="display:inline-block;width:14px;height:14px;border:1px solid #ccc;vertical-align:middle;background:'
                    .e($color).';"></span> '.e($color)
                : '—';

            $rows .= '<tr>'
                .'<td style="padding:8px;border:1px solid #eee;">'.e((string) ($item['category'] ?? '—')).'</td>'
                .'<td style="padding:8px;border:1px solid #eee;text-align:right;">'.e((string) ($item['quantity'] ?? '—')).'</td>'
                .'<td style="padding:8px;border:1px solid #eee;">'.e((string) ($item['size_specs'] ?? '—')).'</td>'
                .'<td style="padding:8px;border:1px solid #eee;">'.$colorCell.'</td>'
                .'<td style="padding:8px;border:1px solid #eee;">'.e((string) ($item['notes'] ?? '—')).'</td>'
                .'</tr>';
        }

        if ($rows === '') {
            return '<p><em>No items listed.</em></p>';
        }

        return '<table style="width:100%;border-collapse:collapse;font-size:14px;">'
            .'<thead><tr>'
            .'<th align="left" style="padding:8px;border:1px solid #eee;">Category</th>'
            .'<th align="right" style="padding:8px;border:1px solid #eee;">Qty</th>'
            .'<th align="left" style="padding:8px;border:1px solid #eee;">Size / specs</th>'
            .'<th align="left" style="padding:8px;border:1px solid #eee;">Color</th>'
            .'<th align="left" style="padding:8px;border:1px solid #eee;">Notes</th>'
            .'</tr></thead>'
            .'<tbody>'.$rows.'</tbody>'
            .'</table>';
    }

    public function artworkFilesHtml(CustomOrderSubmission $submission): string
    {
        $files = $submission->artwork_files ?? [];

        if ($files === []) {
            return '';
        }

        $items = collect($files)
            ->map(function (array $file): string {
                $name = e((string) ($file['original_name'] ?? 'File'));
                $url = e((string) ($file['url'] ?? '#'));

                return '<li><a href="'.$url.'">'.$name.'</a></li>';
            })
            ->implode('');

        return '<h3>Artwork files</h3><ul>'.$items.'</ul>';
    }

    /**
     * @return list<array{path: string, original_name: string, url: string}>
     */
    protected function storeArtworkFiles(Request $request, CustomOrderSubmission $submission): array
    {
        if (! $request->hasFile('artwork_files')) {
            return [];
        }

        $stored = [];

        foreach ($request->file('artwork_files', []) as $file) {
            if (! $file instanceof UploadedFile || ! $file->isValid()) {
                continue;
            }

            $path = $file->store(
                sprintf('order-forms/%s/artwork', $submission->id),
                'public',
            );

            $stored[] = [
                'path' => $path,
                'original_name' => $file->getClientOriginalName(),
                'url' => asset('storage/'.$path),
            ];
        }

        return $stored;
    }

    protected function generateSubmissionNumber(): string
    {
        return 'COF-'.strtoupper(bin2hex(random_bytes(4))).'-'.now()->format('His');
    }

    protected function nullableString(mixed $value): ?string
    {
        $string = trim((string) ($value ?? ''));

        return $string !== '' ? $string : null;
    }
}
