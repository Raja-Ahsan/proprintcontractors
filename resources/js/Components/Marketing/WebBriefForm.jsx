import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import {
    WEB_CONTENT_NEEDS,
    WEB_HOSTING_NEEDS,
} from '@/data/webBriefOptions';

const textareaClass =
    'mt-1 block w-full rounded-md border border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary';

const selectClass =
    'mt-1 block w-full rounded-md border border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary';

export default function WebBriefForm({
    brief,
    errors,
    onField,
    contentFiles,
    onContentFilesChange,
    fileError,
}) {
    return (
        <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground">Website brief</h2>
            <p className="mt-1 text-sm text-muted-foreground">
                Tell us about your project so we can plan your new site. Fields
                marked * are required.
            </p>

            <div className="mt-6 space-y-5">
                <div>
                    <InputLabel htmlFor="web_business_name" value="Business name *" />
                    <TextInput
                        id="web_business_name"
                        value={brief.business_name}
                        onChange={(e) => onField('business_name', e.target.value)}
                        className="mt-1 block w-full"
                        required
                    />
                    <InputError message={errors?.business_name} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="web_industry" value="What industry does your business fall into?" />
                    <TextInput
                        id="web_industry"
                        value={brief.industry}
                        onChange={(e) => onField('industry', e.target.value)}
                        className="mt-1 block w-full"
                    />
                    <InputError message={errors?.industry} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="web_brand_name" value="Name of your brand / business" />
                    <TextInput
                        id="web_brand_name"
                        value={brief.brand_name}
                        onChange={(e) => onField('brand_name', e.target.value)}
                        className="mt-1 block w-full"
                    />
                    <InputError message={errors?.brand_name} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="web_business_description" value="Business description" />
                    <textarea
                        id="web_business_description"
                        value={brief.business_description}
                        onChange={(e) =>
                            onField('business_description', e.target.value)
                        }
                        rows={4}
                        className={textareaClass}
                    />
                    <InputError
                        message={errors?.business_description}
                        className="mt-2"
                    />
                </div>

                <div>
                    <InputLabel
                        htmlFor="web_target_audience"
                        value="Who is your target audience? (e.g. consumer, student, business community)"
                    />
                    <TextInput
                        id="web_target_audience"
                        value={brief.target_audience}
                        onChange={(e) => onField('target_audience', e.target.value)}
                        className="mt-1 block w-full"
                    />
                    <InputError message={errors?.target_audience} className="mt-2" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="web_competitors"
                        value="Competitors or inspiration sites — please list them"
                    />
                    <textarea
                        id="web_competitors"
                        value={brief.competitors_inspiration}
                        onChange={(e) =>
                            onField('competitors_inspiration', e.target.value)
                        }
                        rows={3}
                        className={textareaClass}
                    />
                    <InputError
                        message={errors?.competitors_inspiration}
                        className="mt-2"
                    />
                </div>

                <div>
                    <InputLabel htmlFor="web_colors" value="Color preferences" />
                    <TextInput
                        id="web_colors"
                        value={brief.color_preferences}
                        onChange={(e) =>
                            onField('color_preferences', e.target.value)
                        }
                        className="mt-1 block w-full"
                    />
                    <InputError message={errors?.color_preferences} className="mt-2" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="web_site_feeling"
                        value="Overall feeling for your new site (e.g. corporate, trendy, hi-tech, fun)"
                    />
                    <TextInput
                        id="web_site_feeling"
                        value={brief.site_feeling}
                        onChange={(e) => onField('site_feeling', e.target.value)}
                        className="mt-1 block w-full"
                    />
                    <InputError message={errors?.site_feeling} className="mt-2" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="web_content_needs"
                        value="Do you already have website content (text & images), or would you like us to create it? *"
                    />
                    <select
                        id="web_content_needs"
                        value={brief.content_needs}
                        onChange={(e) => onField('content_needs', e.target.value)}
                        className={selectClass}
                        required
                    >
                        <option value="">Select an option</option>
                        {WEB_CONTENT_NEEDS.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors?.content_needs} className="mt-2" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="web_content_notes"
                        value="Additional notes regarding content"
                    />
                    <textarea
                        id="web_content_notes"
                        value={brief.content_notes}
                        onChange={(e) => onField('content_notes', e.target.value)}
                        rows={3}
                        placeholder="Existing content, documents, or preferences"
                        className={textareaClass}
                    />
                    <InputError message={errors?.content_notes} className="mt-2" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="web_content_files"
                        value="Upload content files (optional)"
                    />
                    <input
                        id="web_content_files"
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp,.zip,image/*"
                        onChange={(e) =>
                            onContentFilesChange(
                                Array.from(e.target.files ?? []),
                            )
                        }
                        className="mt-1 block w-full text-sm text-muted-foreground file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-primary-foreground"
                    />
                    {contentFiles.length > 0 ? (
                        <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                            {contentFiles.map((file) => (
                                <li key={`${file.name}-${file.size}`}>
                                    {file.name}
                                </li>
                            ))}
                        </ul>
                    ) : null}
                    <InputError message={fileError} className="mt-2" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="web_existing_website"
                        value="Existing website address, or domain name to acquire"
                    />
                    <TextInput
                        id="web_existing_website"
                        value={brief.existing_website_or_domain}
                        onChange={(e) =>
                            onField('existing_website_or_domain', e.target.value)
                        }
                        placeholder="https://yoursite.com or desired domain"
                        className="mt-1 block w-full"
                    />
                    <InputError
                        message={errors?.existing_website_or_domain}
                        className="mt-2"
                    />
                </div>

                <div>
                    <InputLabel
                        htmlFor="web_desired_pages"
                        value="What pages would you like? (e.g. Home, About, Contact)"
                    />
                    <textarea
                        id="web_desired_pages"
                        value={brief.desired_pages}
                        onChange={(e) => onField('desired_pages', e.target.value)}
                        rows={3}
                        className={textareaClass}
                    />
                    <InputError message={errors?.desired_pages} className="mt-2" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="web_social_links"
                        value="Social media links to incorporate"
                    />
                    <textarea
                        id="web_social_links"
                        value={brief.social_media_links}
                        onChange={(e) =>
                            onField('social_media_links', e.target.value)
                        }
                        rows={3}
                        placeholder="Facebook, Instagram, LinkedIn URLs…"
                        className={textareaClass}
                    />
                    <InputError
                        message={errors?.social_media_links}
                        className="mt-2"
                    />
                </div>

                <div>
                    <InputLabel
                        htmlFor="web_designer_notes"
                        value="Additional notes for our web designer"
                    />
                    <textarea
                        id="web_designer_notes"
                        value={brief.designer_notes}
                        onChange={(e) => onField('designer_notes', e.target.value)}
                        rows={4}
                        className={textareaClass}
                    />
                    <InputError message={errors?.designer_notes} className="mt-2" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="web_hosting_needs"
                        value="Do you already have website hosting, or would you like us to provide hosting? *"
                    />
                    <select
                        id="web_hosting_needs"
                        value={brief.hosting_needs}
                        onChange={(e) => onField('hosting_needs', e.target.value)}
                        className={selectClass}
                        required
                    >
                        <option value="">Select an option</option>
                        {WEB_HOSTING_NEEDS.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors?.hosting_needs} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="web_hosting_details" value="Hosting details (if applicable)" />
                    <textarea
                        id="web_hosting_details"
                        value={brief.hosting_details}
                        onChange={(e) => onField('hosting_details', e.target.value)}
                        rows={3}
                        className={textareaClass}
                    />
                    <InputError message={errors?.hosting_details} className="mt-2" />
                </div>
            </div>
        </section>
    );
}
