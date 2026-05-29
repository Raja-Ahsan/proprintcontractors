<?php

namespace App\Services;

use App\Models\ServiceBooking;
use App\Models\ServiceCategory;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ServiceBriefService
{
    /** @var list<string> */
    public const LOGO_STYLES = [
        'Abstract',
        'Font In Shape',
        'Fonts + Meaning',
        'Geometric Symbol',
        'Handmade',
        'Initials',
        'Just Fonts',
        'Silhouette Symbol',
    ];

    /** @var list<string> */
    public const LOGO_LOOK_AND_FEEL = [
        'Artistic',
        'Corporate',
        'Feminine',
        'Fun',
        'Masculine',
        'Minimal',
        'Royal Sophisticated',
        'Traditional',
        'Web 2.0',
    ];

    /** @var list<string> */
    public const LOGO_USAGE = [
        'Web (Website, banner ads, email marketing)',
        'Print (Business cards, letterhead, stationery)',
        'Clothing (T-Shirts, hats, embroidery)',
    ];

    /** @var list<string> */
    public const LOGO_COLORS = [
        'Red',
        'Yellow',
        'Blue',
        'White',
        'Black',
        'Pink',
        'Orange',
        'Green',
        'Purple',
        'Grey',
        'Brown',
        'Turquoise',
        'Other',
    ];

    /** @var list<string> */
    public const LOGO_FONT_STYLES = [
        'Brush',
        'Decorative',
        'Grunge',
        'Handwritten',
        'Medieval',
        'Retro',
        'Sans Serif',
        'Script',
        'Serif',
        'Techno',
        'Typed',
        'Western',
    ];

    /** @var list<string> */
    public const WEB_CONTENT_NEEDS = [
        'I already have complete content',
        'I have some content and need help refining it',
        'I need full web content writing',
        'I need both content writing and images/graphics',
    ];

    /** @var list<string> */
    public const WEB_HOSTING_NEEDS = [
        'I already have hosting',
        'I need hosting services',
        'Not sure — please advise',
    ];

    /** @var list<string> */
    public const DIGITAL_MARKETING_BRIEF_KEYS = [
        'social_media_purpose',
        'brand_objective',
        'social_media_goals',
        'biggest_barrier',
        'growth_plan_fit',
        'target_audience',
        'audience_engagement',
        'brand_voice',
        'update_tone',
        'main_message',
        'brand_differentiator',
        'why_choose_you',
        'brand_vision',
        'content_resources',
        'publish_frequency',
        'offline_campaigns',
        'audience_content_response',
        'content_types_to_create',
        'content_message',
        'user_generated_content',
        'holidays_to_observe',
        'existing_profiles',
        'expand_networks',
        'narrow_networks',
        'social_customer_service',
        'measure_roi',
        'working_and_not_working',
        'sales_funnel_fit',
        'past_attempts',
        'tracking_pixels',
    ];

    public function briefTypeForCategory(?ServiceCategory $category): ?string
    {
        if ($category === null) {
            return null;
        }

        return match ($category->slug) {
            'logo-design' => 'logo',
            'web-design' => 'web',
            'digital-marketing' => 'digital_marketing',
            default => null,
        };
    }

    /**
     * @return array<string, mixed>
     */
    public function logoBriefValidationRules(): array
    {
        return [
            'brief.logo_name' => ['required', 'string', 'max:255'],
            'brief.slogan' => ['nullable', 'string', 'max:255'],
            'brief.business_description' => ['nullable', 'string', 'max:5000'],
            'brief.business_industry' => ['nullable', 'string', 'max:255'],
            'brief.competitors' => ['nullable', 'string', 'max:2000'],
            'brief.business_website' => ['nullable', 'string', 'max:500'],
            'brief.requirements' => ['nullable', 'string', 'max:5000'],
            'brief.logo_elements' => ['nullable', 'string', 'max:5000'],
            'brief.logo_styles' => ['nullable', 'array'],
            'brief.logo_styles.*' => ['string', Rule::in(self::LOGO_STYLES)],
            'brief.look_and_feel' => ['nullable', 'array'],
            'brief.look_and_feel.*' => ['string', Rule::in(self::LOGO_LOOK_AND_FEEL)],
            'brief.usage' => ['nullable', 'array'],
            'brief.usage.*' => ['string', Rule::in(self::LOGO_USAGE)],
            'brief.colors' => ['nullable', 'array'],
            'brief.colors.*' => ['string', Rule::in(self::LOGO_COLORS)],
            'brief.color_other' => ['nullable', 'string', 'max:500'],
            'brief.font_styles' => ['nullable', 'array'],
            'brief.font_styles.*' => ['string', Rule::in(self::LOGO_FONT_STYLES)],
            'brief.additional_comments' => ['nullable', 'string', 'max:5000'],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function webBriefValidationRules(): array
    {
        return [
            'brief.business_name' => ['required', 'string', 'max:255'],
            'brief.brand_name' => ['nullable', 'string', 'max:255'],
            'brief.industry' => ['nullable', 'string', 'max:255'],
            'brief.business_description' => ['nullable', 'string', 'max:5000'],
            'brief.target_audience' => ['nullable', 'string', 'max:2000'],
            'brief.competitors_inspiration' => ['nullable', 'string', 'max:5000'],
            'brief.color_preferences' => ['nullable', 'string', 'max:2000'],
            'brief.site_feeling' => ['nullable', 'string', 'max:500'],
            'brief.content_needs' => ['required', 'string', Rule::in(self::WEB_CONTENT_NEEDS)],
            'brief.content_notes' => ['nullable', 'string', 'max:5000'],
            'brief.existing_website_or_domain' => ['nullable', 'string', 'max:500'],
            'brief.desired_pages' => ['nullable', 'string', 'max:5000'],
            'brief.social_media_links' => ['nullable', 'string', 'max:5000'],
            'brief.designer_notes' => ['nullable', 'string', 'max:5000'],
            'brief.hosting_needs' => ['required', 'string', Rule::in(self::WEB_HOSTING_NEEDS)],
            'brief.hosting_details' => ['nullable', 'string', 'max:5000'],
            'brief_content_files' => ['nullable', 'array', 'max:5'],
            'brief_content_files.*' => [
                'file',
                'max:8192',
                'mimes:pdf,doc,docx,jpg,jpeg,png,webp,zip',
            ],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function digitalMarketingBriefValidationRules(): array
    {
        $rules = [
            'brief.brand_objective' => ['required', 'string', 'max:5000'],
        ];

        foreach (self::DIGITAL_MARKETING_BRIEF_KEYS as $key) {
            if ($key === 'brand_objective') {
                continue;
            }

            $rules["brief.{$key}"] = ['nullable', 'string', 'max:5000'];
        }

        return $rules;
    }

    /**
     * @param  array<string, mixed>  $brief
     * @return array<string, mixed>
     */
    public function normalizeDigitalMarketingBrief(array $brief): array
    {
        $out = ['type' => 'digital_marketing'];

        foreach (self::DIGITAL_MARKETING_BRIEF_KEYS as $key) {
            if ($key === 'brand_objective') {
                $out[$key] = trim((string) ($brief[$key] ?? ''));

                continue;
            }

            $out[$key] = $this->nullableString($brief[$key] ?? null);
        }

        return $out;
    }

    /**
     * @param  array<string, mixed>  $brief
     * @return array<string, mixed>
     */
    public function normalizeWebBrief(array $brief): array
    {
        return [
            'type' => 'web',
            'business_name' => trim((string) ($brief['business_name'] ?? '')),
            'brand_name' => $this->nullableString($brief['brand_name'] ?? null),
            'industry' => $this->nullableString($brief['industry'] ?? null),
            'business_description' => $this->nullableString($brief['business_description'] ?? null),
            'target_audience' => $this->nullableString($brief['target_audience'] ?? null),
            'competitors_inspiration' => $this->nullableString($brief['competitors_inspiration'] ?? null),
            'color_preferences' => $this->nullableString($brief['color_preferences'] ?? null),
            'site_feeling' => $this->nullableString($brief['site_feeling'] ?? null),
            'content_needs' => trim((string) ($brief['content_needs'] ?? '')),
            'content_notes' => $this->nullableString($brief['content_notes'] ?? null),
            'content_files' => [],
            'existing_website_or_domain' => $this->nullableString($brief['existing_website_or_domain'] ?? null),
            'desired_pages' => $this->nullableString($brief['desired_pages'] ?? null),
            'social_media_links' => $this->nullableString($brief['social_media_links'] ?? null),
            'designer_notes' => $this->nullableString($brief['designer_notes'] ?? null),
            'hosting_needs' => trim((string) ($brief['hosting_needs'] ?? '')),
            'hosting_details' => $this->nullableString($brief['hosting_details'] ?? null),
        ];
    }

    /**
     * @return list<array{path: string, original_name: string, url: string}>
     */
    public function storeWebBriefContentFiles(Request $request, ServiceBooking $booking): array
    {
        if (! $request->hasFile('brief_content_files')) {
            return [];
        }

        $stored = [];

        foreach ($request->file('brief_content_files', []) as $file) {
            if (! $file || ! $file->isValid()) {
                continue;
            }

            $path = $file->store(
                sprintf('service-bookings/%s/content', $booking->id),
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

    /**
     * @param  array<string, mixed>|null  $brief
     */
    public function summarizeBrief(?array $brief): ?string
    {
        if ($brief === null) {
            return null;
        }

        return match ($brief['type'] ?? '') {
            'logo' => $this->summarizeLogoBrief($brief),
            'web' => $this->summarizeWebBrief($brief),
            'digital_marketing' => $this->summarizeDigitalMarketingBrief($brief),
            default => null,
        };
    }

    /**
     * @param  array<string, mixed>  $brief
     */
    private function summarizeLogoBrief(array $brief): string
    {
        $lines = [
            'Logo name: '.($brief['logo_name'] ?? '—'),
        ];

        if (! empty($brief['slogan'])) {
            $lines[] = 'Slogan: '.$brief['slogan'];
        }

        if (! empty($brief['business_industry'])) {
            $lines[] = 'Industry: '.$brief['business_industry'];
        }

        return implode(' · ', $lines);
    }

    /**
     * @param  array<string, mixed>  $brief
     */
    private function summarizeWebBrief(array $brief): string
    {
        $lines = [
            'Business: '.($brief['business_name'] ?? '—'),
        ];

        if (! empty($brief['industry'])) {
            $lines[] = 'Industry: '.$brief['industry'];
        }

        if (! empty($brief['content_needs'])) {
            $lines[] = 'Content: '.$brief['content_needs'];
        }

        return implode(' · ', $lines);
    }

    /**
     * @param  array<string, mixed>  $brief
     */
    private function summarizeDigitalMarketingBrief(array $brief): string
    {
        $lines = [
            'Objective: '.($brief['brand_objective'] ?? '—'),
        ];

        if (! empty($brief['target_audience'])) {
            $lines[] = 'Audience: '.mb_strimwidth((string) $brief['target_audience'], 0, 80, '…');
        }

        return implode(' · ', $lines);
    }

    /**
     * @param  array<string, mixed>  $brief
     * @return array<string, mixed>
     */
    public function normalizeLogoBrief(array $brief): array
    {
        return [
            'type' => 'logo',
            'logo_name' => trim((string) ($brief['logo_name'] ?? '')),
            'slogan' => $this->nullableString($brief['slogan'] ?? null),
            'business_description' => $this->nullableString($brief['business_description'] ?? null),
            'business_industry' => $this->nullableString($brief['business_industry'] ?? null),
            'competitors' => $this->nullableString($brief['competitors'] ?? null),
            'business_website' => $this->nullableString($brief['business_website'] ?? null),
            'requirements' => $this->nullableString($brief['requirements'] ?? null),
            'logo_elements' => $this->nullableString($brief['logo_elements'] ?? null),
            'logo_styles' => $this->filterAllowed($brief['logo_styles'] ?? [], self::LOGO_STYLES),
            'look_and_feel' => $this->filterAllowed($brief['look_and_feel'] ?? [], self::LOGO_LOOK_AND_FEEL),
            'usage' => $this->filterAllowed($brief['usage'] ?? [], self::LOGO_USAGE),
            'colors' => $this->filterAllowed($brief['colors'] ?? [], self::LOGO_COLORS),
            'color_other' => $this->nullableString($brief['color_other'] ?? null),
            'font_styles' => $this->filterAllowed($brief['font_styles'] ?? [], self::LOGO_FONT_STYLES),
            'additional_comments' => $this->nullableString($brief['additional_comments'] ?? null),
        ];
    }

    private function nullableString(mixed $value): ?string
    {
        if ($value === null) {
            return null;
        }

        $trimmed = trim((string) $value);

        return $trimmed === '' ? null : $trimmed;
    }

    /**
     * @param  mixed  $values
     * @param  list<string>  $allowed
     * @return list<string>
     */
    private function filterAllowed(mixed $values, array $allowed): array
    {
        if (! is_array($values)) {
            return [];
        }

        $allowedMap = array_fill_keys($allowed, true);

        return array_values(array_filter(
            array_map(static fn ($v) => is_string($v) ? trim($v) : '', $values),
            static fn (string $v) => $v !== '' && isset($allowedMap[$v]),
        ));
    }
}
