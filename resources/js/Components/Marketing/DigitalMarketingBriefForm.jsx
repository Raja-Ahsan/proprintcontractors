import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { DIGITAL_MARKETING_BRIEF_FIELDS } from '@/data/digitalMarketingBriefOptions';

const textareaClass =
    'mt-1 block w-full rounded-md border border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary';

export default function DigitalMarketingBriefForm({ brief, errors, onField }) {
    return (
        <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground">
                Digital marketing brief
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
                Help us understand your brand, audience, and social media goals.
                Brand objective is required; all other fields are optional.
            </p>

            <div className="mt-6 space-y-5">
                {DIGITAL_MARKETING_BRIEF_FIELDS.map((field) => {
                    const id = `dm_${field.key}`;
                    const value = brief[field.key] ?? '';

                    return (
                        <div key={field.key}>
                            <InputLabel
                                htmlFor={id}
                                value={`${field.label}${field.required ? ' *' : ''}`}
                            />
                            {field.rows && field.rows > 1 ? (
                                <textarea
                                    id={id}
                                    value={value}
                                    onChange={(e) =>
                                        onField(field.key, e.target.value)
                                    }
                                    rows={field.rows}
                                    required={field.required ?? false}
                                    className={textareaClass}
                                />
                            ) : (
                                <TextInput
                                    id={id}
                                    value={value}
                                    onChange={(e) =>
                                        onField(field.key, e.target.value)
                                    }
                                    required={field.required ?? false}
                                    className="mt-1 block w-full"
                                />
                            )}
                            <InputError
                                message={errors?.[field.key]}
                                className="mt-2"
                            />
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
