/** @type {{ key: string, label: string, rows?: number, required?: boolean }[]} */
export const DIGITAL_MARKETING_BRIEF_FIELDS = [
    {
        key: 'social_media_purpose',
        label: 'What is your purpose on social media?',
        rows: 3,
    },
    {
        key: 'brand_objective',
        label: "What is your brand's objective?",
        rows: 3,
        required: true,
    },
    {
        key: 'social_media_goals',
        label:
            'What do you hope to achieve using social media? How will you know you’ve achieved it?',
        rows: 4,
    },
    {
        key: 'biggest_barrier',
        label: 'What’s the biggest barrier to your success on social media?',
        rows: 3,
    },
    {
        key: 'growth_plan_fit',
        label: 'How does social media fit into your growth plan?',
        rows: 3,
    },
    {
        key: 'target_audience',
        label: 'Describe your target audience. Who are they?',
        rows: 4,
    },
    {
        key: 'audience_engagement',
        label: 'How does your brand engage them?',
        rows: 3,
    },
    {
        key: 'brand_voice',
        label: 'Describe your brand voice',
        rows: 3,
    },
    {
        key: 'update_tone',
        label: 'What tone should social media updates have?',
        rows: 2,
    },
    {
        key: 'main_message',
        label: 'What is the main message your brand is trying to communicate?',
        rows: 3,
    },
    {
        key: 'brand_differentiator',
        label: 'What makes your brand different from others?',
        rows: 3,
    },
    {
        key: 'why_choose_you',
        label: 'Why do people choose you over your competitors?',
        rows: 3,
    },
    {
        key: 'brand_vision',
        label: 'What’s your brand vision?',
        rows: 3,
    },
    {
        key: 'content_resources',
        label: 'What resources do you have available for content creation?',
        rows: 3,
    },
    {
        key: 'publish_frequency',
        label: 'How often do you want to publish new content to your profiles?',
        rows: 2,
    },
    {
        key: 'offline_campaigns',
        label: 'How does social media tie in with your offline campaigns?',
        rows: 3,
    },
    {
        key: 'audience_content_response',
        label: 'What type of content does your audience respond to best (if known)?',
        rows: 3,
    },
    {
        key: 'content_types_to_create',
        label:
            'What type of content do you want to create for your audience (images, video, quotes, blog posts, etc.)?',
        rows: 3,
    },
    {
        key: 'content_message',
        label: 'What message are you trying to send with your content?',
        rows: 3,
    },
    {
        key: 'user_generated_content',
        label: 'How do you use user-generated content in your campaigns?',
        rows: 3,
    },
    {
        key: 'holidays_to_observe',
        label: 'What holidays does your client want to observe?',
        rows: 2,
    },
    {
        key: 'existing_profiles',
        label: 'What profiles do you have and on which social platform?',
        rows: 3,
    },
    {
        key: 'expand_networks',
        label: 'Are you looking to expand onto new networks?',
        rows: 2,
    },
    {
        key: 'narrow_networks',
        label: 'Are you looking to narrow your focus to fewer networks?',
        rows: 2,
    },
    {
        key: 'social_customer_service',
        label:
            'Do you want to provide customer service on social media? If so, on which platform and from which profile?',
        rows: 3,
    },
    {
        key: 'measure_roi',
        label: 'How do you intend to measure return on investment?',
        rows: 3,
    },
    {
        key: 'working_and_not_working',
        label: 'What is working for you (and not working) right now?',
        rows: 3,
    },
    {
        key: 'sales_funnel_fit',
        label: 'How does social media fit into your sales funnel or buyer’s journey?',
        rows: 3,
    },
    {
        key: 'past_attempts',
        label: 'What have you tried in the past?',
        rows: 3,
    },
    {
        key: 'tracking_pixels',
        label: 'Have you got any tracking pixels installed on your site?',
        rows: 2,
    },
];

export function emptyDigitalMarketingBrief() {
    /** @type {Record<string, string>} */
    const brief = {};

    for (const field of DIGITAL_MARKETING_BRIEF_FIELDS) {
        brief[field.key] = '';
    }

    return brief;
}

/** @type {Record<string, string>} */
export const DIGITAL_MARKETING_BRIEF_LABELS = Object.fromEntries(
    DIGITAL_MARKETING_BRIEF_FIELDS.map((field) => [field.key, field.label]),
);
