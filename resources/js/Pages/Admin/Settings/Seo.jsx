import AdminLayout from '@/Layouts/AdminLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, router, useForm } from '@inertiajs/react';

export default function Seo({ settings }) {
    const form = useForm({
        meta_title: settings.meta_title ?? '',
        meta_description: settings.meta_description ?? '',
        meta_keywords: settings.meta_keywords ?? '',
        og_image: null,
    });

    function submit(e) {
        e.preventDefault();
        router.post(route('admin.settings.seo.update'), form.data, {
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
                        SEO & sharing
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Defaults for page titles and meta tags on shop pages.
                        Individual pages can still override via Inertia.
                    </p>
                </div>
            }
        >
            <Head title="SEO settings" />

            <div className="w-full">
                <form
                    onSubmit={submit}
                    className="neon-card space-y-5 rounded-2xl border border-border bg-card/80 p-6 shadow-elegant backdrop-blur-sm"
                >
                    <div>
                        <label className="text-sm font-semibold text-foreground">
                            Meta title
                        </label>
                        <input
                            className="mt-1 w-full rounded-md border-border bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:ring-primary"
                            value={form.data.meta_title}
                            onChange={(e) =>
                                form.setData('meta_title', e.target.value)
                            }
                        />
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-foreground">
                            Meta description
                        </label>
                        <textarea
                            rows={3}
                            className="mt-1 w-full rounded-md border-border bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:ring-primary"
                            value={form.data.meta_description}
                            onChange={(e) =>
                                form.setData('meta_description', e.target.value)
                            }
                        />
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-foreground">
                            Keywords (comma-separated)
                        </label>
                        <input
                            className="mt-1 w-full rounded-md border-border bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:ring-primary"
                            value={form.data.meta_keywords}
                            onChange={(e) =>
                                form.setData('meta_keywords', e.target.value)
                            }
                        />
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-foreground">
                            Open Graph image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            className="mt-1 block w-full text-sm text-muted-foreground file:mr-3 file:rounded-md file:bg-primary file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-primary-foreground"
                            onChange={(e) =>
                                form.setData(
                                    'og_image',
                                    e.target.files?.[0] ?? null,
                                )
                            }
                        />
                    </div>

                    <PrimaryButton disabled={form.processing}>Save</PrimaryButton>
                </form>
            </div>
        </AdminLayout>
    );
}
