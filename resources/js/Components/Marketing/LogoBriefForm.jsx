import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { LOGO_BRIEF_OPTIONS } from '@/data/logoBriefOptions';

const textareaClass =
    'mt-1 block w-full rounded-md border border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary';

function CheckboxGroup({ label, options, values, onToggle, errorKey, errors }) {
    return (
        <div>
            <p className="text-sm font-semibold text-foreground">{label}</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {options.map((option) => {
                    const checked = values.includes(option);

                    return (
                        <label
                            key={option}
                            className={`flex cursor-pointer items-start gap-2 rounded-lg border px-3 py-2 text-sm transition ${
                                checked
                                    ? 'border-primary bg-primary/10 text-foreground'
                                    : 'border-border text-muted-foreground hover:border-primary/50'
                            }`}
                        >
                            <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => onToggle(option)}
                                className="mt-0.5 rounded border-border text-primary focus:ring-primary"
                            />
                            <span>{option}</span>
                        </label>
                    );
                })}
            </div>
            <InputError message={errors?.[errorKey]} className="mt-2" />
        </div>
    );
}

export default function LogoBriefForm({ brief, errors, onField, onToggleArray }) {
    return (
        <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground">Logo brief</h2>
            <p className="mt-1 text-sm text-muted-foreground">
                Help our designers understand your brand. Fields marked * are required.
            </p>

            <div className="mt-6 space-y-5">
                <div>
                    <InputLabel
                        htmlFor="brief_logo_name"
                        value="Exact name to appear on logo *"
                    />
                    <TextInput
                        id="brief_logo_name"
                        value={brief.logo_name}
                        onChange={(e) => onField('logo_name', e.target.value)}
                        className="mt-1 block w-full"
                        required
                    />
                    <InputError message={errors?.logo_name} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="brief_slogan" value="Slogan or tagline" />
                    <TextInput
                        id="brief_slogan"
                        value={brief.slogan}
                        onChange={(e) => onField('slogan', e.target.value)}
                        className="mt-1 block w-full"
                    />
                    <InputError message={errors?.slogan} className="mt-2" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="brief_business_description"
                        value="Business description"
                    />
                    <textarea
                        id="brief_business_description"
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
                        htmlFor="brief_business_industry"
                        value="Business industry"
                    />
                    <TextInput
                        id="brief_business_industry"
                        value={brief.business_industry}
                        onChange={(e) =>
                            onField('business_industry', e.target.value)
                        }
                        className="mt-1 block w-full"
                    />
                    <InputError
                        message={errors?.business_industry}
                        className="mt-2"
                    />
                </div>

                <div>
                    <InputLabel
                        htmlFor="brief_competitors"
                        value="Competitors or similar businesses"
                    />
                    <textarea
                        id="brief_competitors"
                        value={brief.competitors}
                        onChange={(e) => onField('competitors', e.target.value)}
                        rows={3}
                        className={textareaClass}
                    />
                    <InputError message={errors?.competitors} className="mt-2" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="brief_business_website"
                        value="Business website"
                    />
                    <TextInput
                        id="brief_business_website"
                        type="url"
                        value={brief.business_website}
                        onChange={(e) =>
                            onField('business_website', e.target.value)
                        }
                        placeholder="https://"
                        className="mt-1 block w-full"
                    />
                    <InputError
                        message={errors?.business_website}
                        className="mt-2"
                    />
                </div>

                <div className="rounded-lg border border-dashed border-border bg-secondary/30 p-4 text-sm text-muted-foreground">
                    Do you have files, images, sketches or other documents that might
                    help our designer? If yes, please send them to{' '}
                    <a
                        href="mailto:info@proprintcontractors.com"
                        className="font-semibold text-primary hover:underline"
                    >
                        info@proprintcontractors.com
                    </a>
                </div>

                <div>
                    <InputLabel
                        htmlFor="brief_requirements"
                        value="Specific logo requirements, or open to ideas?"
                    />
                    <textarea
                        id="brief_requirements"
                        value={brief.requirements}
                        onChange={(e) => onField('requirements', e.target.value)}
                        rows={3}
                        className={textareaClass}
                    />
                    <InputError message={errors?.requirements} className="mt-2" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="brief_logo_elements"
                        value="Elements you'd like to have in the logos"
                    />
                    <textarea
                        id="brief_logo_elements"
                        value={brief.logo_elements}
                        onChange={(e) => onField('logo_elements', e.target.value)}
                        rows={3}
                        className={textareaClass}
                    />
                    <InputError message={errors?.logo_elements} className="mt-2" />
                </div>

                <CheckboxGroup
                    label="What logo style do you want?"
                    options={LOGO_BRIEF_OPTIONS.logoStyles}
                    values={brief.logo_styles}
                    onToggle={(option) => onToggleArray('logo_styles', option)}
                    errorKey="logo_styles"
                    errors={errors}
                />

                <CheckboxGroup
                    label="What will be the look and feel for the logos?"
                    options={LOGO_BRIEF_OPTIONS.lookAndFeel}
                    values={brief.look_and_feel}
                    onToggle={(option) => onToggleArray('look_and_feel', option)}
                    errorKey="look_and_feel"
                    errors={errors}
                />

                <CheckboxGroup
                    label="How do you plan to use your logo?"
                    options={LOGO_BRIEF_OPTIONS.usage}
                    values={brief.usage}
                    onToggle={(option) => onToggleArray('usage', option)}
                    errorKey="usage"
                    errors={errors}
                />

                <CheckboxGroup
                    label="What is your color preference?"
                    options={LOGO_BRIEF_OPTIONS.colors}
                    values={brief.colors}
                    onToggle={(option) => onToggleArray('colors', option)}
                    errorKey="colors"
                    errors={errors}
                />

                {brief.colors.includes('Other') ? (
                    <div>
                        <InputLabel
                            htmlFor="brief_color_other"
                            value="Other color preference"
                        />
                        <TextInput
                            id="brief_color_other"
                            value={brief.color_other}
                            onChange={(e) =>
                                onField('color_other', e.target.value)
                            }
                            className="mt-1 block w-full"
                        />
                        <InputError message={errors?.color_other} className="mt-2" />
                    </div>
                ) : null}

                <CheckboxGroup
                    label="Which font style would you like to have?"
                    options={LOGO_BRIEF_OPTIONS.fontStyles}
                    values={brief.font_styles}
                    onToggle={(option) => onToggleArray('font_styles', option)}
                    errorKey="font_styles"
                    errors={errors}
                />

                <div>
                    <InputLabel
                        htmlFor="brief_additional_comments"
                        value="Additional comments"
                    />
                    <textarea
                        id="brief_additional_comments"
                        value={brief.additional_comments}
                        onChange={(e) =>
                            onField('additional_comments', e.target.value)
                        }
                        rows={4}
                        className={textareaClass}
                    />
                    <InputError
                        message={errors?.additional_comments}
                        className="mt-2"
                    />
                </div>
            </div>
        </section>
    );
}
