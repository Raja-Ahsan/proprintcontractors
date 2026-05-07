import AdminLayout from '@/Layouts/AdminLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, useForm } from '@inertiajs/react';

const previews = [
    { key: 'headerLogoUrl', label: 'Header (live)' },
    { key: 'footerLogoUrl', label: 'Footer (live)' },
    { key: 'loaderLogoUrl', label: 'Loader (live)' },
    { key: 'faviconUrl', label: 'Favicon (live)', small: true },
];

export default function General({ settings, appearance }) {
    const form = useForm({
        site_name: settings.site_name ?? '',
        phone: settings.phone ?? '',
        email: settings.email ?? '',
        address: settings.address ?? '',
        social_facebook: settings.social_facebook ?? '',
        social_instagram: settings.social_instagram ?? '',
        social_twitter: settings.social_twitter ?? '',
        social_linkedin: settings.social_linkedin ?? '',
        social_youtube: settings.social_youtube ?? '',
        header_logo: null,
        footer_logo: null,
        loader_logo: null,
        favicon: null,
    });

    function submit(e) {
        e.preventDefault();
        form.post(route('admin.settings.general.update'), {
            forceFormData: true,
            preserveScroll: true,
        });
    }

    return (
        <AdminLayout
            header={
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-primary">
                        Settings
                    </p>
                    <h1 className="mt-1 text-2xl font-black md:text-3xl">
                        General & branding
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Logos and favicon apply to the storefront immediately after
                        save. The loader logo appears on the full-screen intro when
                        visitors first open the site.
                    </p>
                </div>
            }
        >
            <Head title="General settings" />

            <div className="w-full">
                <form
                    onSubmit={submit}
                    className="neon-card space-y-6 rounded-2xl border border-border bg-card/80 p-6 shadow-elegant backdrop-blur-sm"
                >
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <label className="text-sm font-semibold text-foreground">
                                Site name
                            </label>
                            <input
                                className="mt-1 w-full rounded-md border-border bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:ring-primary"
                                value={form.data.site_name}
                                onChange={(e) =>
                                    form.setData('site_name', e.target.value)
                                }
                            />
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-foreground">
                                Phone
                            </label>
                            <input
                                className="mt-1 w-full rounded-md border-border bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:ring-primary"
                                value={form.data.phone}
                                onChange={(e) =>
                                    form.setData('phone', e.target.value)
                                }
                            />
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-foreground">
                                Email
                            </label>
                            <input
                                type="email"
                                className="mt-1 w-full rounded-md border-border bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:ring-primary"
                                value={form.data.email}
                                onChange={(e) =>
                                    form.setData('email', e.target.value)
                                }
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="text-sm font-semibold text-foreground">
                                Address
                            </label>
                            <textarea
                                rows={3}
                                className="mt-1 w-full rounded-md border-border bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:ring-primary"
                                value={form.data.address}
                                onChange={(e) =>
                                    form.setData('address', e.target.value)
                                }
                            />
                        </div>
                    </div>

                    <div className="border-t border-border pt-6">
                        <p className="mb-3 text-sm font-bold text-foreground">
                            Social links
                        </p>
                        <div className="grid gap-3 sm:grid-cols-2">
                            {[
                                ['social_facebook', 'Facebook URL'],
                                ['social_instagram', 'Instagram URL'],
                                ['social_twitter', 'X / Twitter URL'],
                                ['social_linkedin', 'LinkedIn URL'],
                                ['social_youtube', 'YouTube URL'],
                            ].map(([key, label]) => (
                                <div key={key}>
                                    <label className="text-xs font-medium text-muted-foreground">
                                        {label}
                                    </label>
                                    <input
                                        className="mt-1 w-full rounded-md border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:border-primary focus:ring-primary"
                                        value={form.data[key]}
                                        onChange={(e) =>
                                            form.setData(key, e.target.value)
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-border pt-6">
                        <p className="mb-3 text-sm font-bold text-foreground">
                            Media uploads
                        </p>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {[
                                ['header_logo', 'Header logo'],
                                ['footer_logo', 'Footer logo'],
                                ['loader_logo', 'Loader logo'],
                                ['favicon', 'Favicon'],
                            ].map(([field, label]) => (
                                <div key={field}>
                                    <label className="text-xs font-medium text-muted-foreground">
                                        {label}
                                    </label>
                                    <input
                                        type="file"
                                        accept={
                                            field === 'favicon'
                                                ? '.ico,.png,.jpg,.jpeg,.svg,.webp,.gif'
                                                : 'image/*'
                                        }
                                        className="mt-1 block w-full text-xs text-muted-foreground file:mr-2 file:rounded-md file:bg-primary file:px-2 file:py-1 file:text-xs file:font-semibold file:text-primary-foreground"
                                        onChange={(e) =>
                                            form.setData(
                                                field,
                                                e.target.files?.[0] ?? null,
                                            )
                                        }
                                    />
                                </div>
                            ))}
                        </div>

                        {previews.some((p) => appearance?.[p.key]) && (
                            <div className="mt-6">
                                <p className="mb-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                                    Live on site (save to update)
                                </p>
                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                    {previews.map(({ key, label, small }) => {
                                        const src = appearance?.[key];
                                        if (!src) {
                                            return null;
                                        }
                                        return (
                                            <div
                                                key={key}
                                                className="rounded-xl border border-border bg-secondary/40 p-3"
                                            >
                                                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                                                    {label}
                                                </p>
                                                <div className="flex min-h-[72px] items-center justify-center rounded-lg bg-background/80 p-2">
                                                    <img
                                                        src={src}
                                                        alt=""
                                                        className={
                                                            small
                                                                ? 'h-10 w-10 object-contain'
                                                                : 'max-h-16 max-w-full object-contain'
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    <PrimaryButton disabled={form.processing}>Save</PrimaryButton>
                </form>
            </div>
        </AdminLayout>
    );
}
