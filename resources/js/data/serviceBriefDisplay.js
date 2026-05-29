import { DIGITAL_MARKETING_BRIEF_LABELS } from '@/data/digitalMarketingBriefOptions';

/** @type {Record<string, string>} */
const LOGO_BRIEF_LABELS = {
    logo_name: 'Exact name on logo',
    slogan: 'Slogan or tagline',
    business_description: 'Business description',
    business_industry: 'Business industry',
    competitors: 'Competitors or similar businesses',
    business_website: 'Business website',
    requirements: 'Logo requirements',
    logo_elements: 'Elements in the logos',
    logo_styles: 'Logo style',
    look_and_feel: 'Look and feel',
    usage: 'Planned logo usage',
    colors: 'Color preference',
    color_other: 'Other colors',
    font_styles: 'Font style',
    additional_comments: 'Additional comments',
};

/** @type {Record<string, string>} */
const WEB_BRIEF_LABELS = {
    business_name: 'Business name',
    brand_name: 'Brand / business name',
    industry: 'Industry',
    business_description: 'Business description',
    target_audience: 'Target audience',
    competitors_inspiration: 'Competitors or inspiration sites',
    color_preferences: 'Color preferences',
    site_feeling: 'Overall site feeling',
    content_needs: 'Website content needs',
    content_notes: 'Additional content notes',
    existing_website_or_domain: 'Existing website or domain',
    desired_pages: 'Desired pages',
    social_media_links: 'Social media links',
    designer_notes: 'Notes for web designer',
    hosting_needs: 'Hosting needs',
    hosting_details: 'Hosting details',
};

function sectionsFromLabels(brief, labels) {
    return Object.entries(labels)
        .map(([key, label]) => {
            const value = brief[key];

            if (value == null || value === '') {
                return null;
            }

            if (Array.isArray(value) && value.length === 0) {
                return null;
            }

            return {
                key,
                label,
                value: Array.isArray(value) ? value.join(', ') : String(value),
            };
        })
        .filter(Boolean);
}

export function logoBriefSections(brief) {
    if (!brief || brief.type !== 'logo') {
        return [];
    }

    return sectionsFromLabels(brief, LOGO_BRIEF_LABELS);
}

export function webBriefSections(brief) {
    if (!brief || brief.type !== 'web') {
        return [];
    }

    const sections = sectionsFromLabels(brief, WEB_BRIEF_LABELS);

    if (Array.isArray(brief.content_files) && brief.content_files.length > 0) {
        sections.push({
            key: 'content_files',
            label: 'Uploaded content files',
            value: brief.content_files
                .map((file) => file.original_name ?? file.path ?? 'File')
                .join(', '),
            files: brief.content_files,
        });
    }

    return sections;
}

export function digitalMarketingBriefSections(brief) {
    if (!brief || brief.type !== 'digital_marketing') {
        return [];
    }

    return sectionsFromLabels(brief, DIGITAL_MARKETING_BRIEF_LABELS);
}

export function briefSections(brief) {
    if (!brief?.type) {
        return { title: '', sections: [] };
    }

    if (brief.type === 'logo') {
        return { title: 'Logo brief', sections: logoBriefSections(brief) };
    }

    if (brief.type === 'web') {
        return { title: 'Website brief', sections: webBriefSections(brief) };
    }

    if (brief.type === 'digital_marketing') {
        return {
            title: 'Digital marketing brief',
            sections: digitalMarketingBriefSections(brief),
        };
    }

    return { title: '', sections: [] };
}
