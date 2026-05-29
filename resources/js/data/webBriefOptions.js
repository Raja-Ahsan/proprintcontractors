export const WEB_CONTENT_NEEDS = [
    'I already have complete content',
    'I have some content and need help refining it',
    'I need full web content writing',
    'I need both content writing and images/graphics',
];

export const WEB_HOSTING_NEEDS = [
    'I already have hosting',
    'I need hosting services',
    'Not sure — please advise',
];

export function emptyWebBrief() {
    return {
        business_name: '',
        brand_name: '',
        industry: '',
        business_description: '',
        target_audience: '',
        competitors_inspiration: '',
        color_preferences: '',
        site_feeling: '',
        content_needs: '',
        content_notes: '',
        existing_website_or_domain: '',
        desired_pages: '',
        social_media_links: '',
        designer_notes: '',
        hosting_needs: '',
        hosting_details: '',
    };
}
