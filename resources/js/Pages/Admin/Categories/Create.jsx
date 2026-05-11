import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create() {
    const form = useForm({
        name: '',
        slug: '',
        description: '',
        sort_order: 0,
        is_active: true,
        image: null,
    });

    function submit(e) {
        e.preventDefault();
        form.post(route('admin.categories.store'), { forceFormData: true });
    }

    return (
        <AdminLayout
            header={
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-primary">
                        Categories
                    </p>
                    <h1 className="mt-1 text-2xl font-black md:text-3xl">
                        New category
                    </h1>
                </div>
            }
        >
            <Head title="New category" />

            <div className="w-full">
                <form
                    onSubmit={submit}
                    className="neon-card space-y-4 rounded-2xl border border-border bg-card/80 p-6 shadow-elegant backdrop-blur-sm"
                >
                    <div>
                        <InputLabel htmlFor="name" value="Name" />
                        <TextInput
                            id="name"
                            value={form.data.name}
                            onChange={(e) => form.setData('name', e.target.value)}
                            className="mt-1 block w-full"
                            required
                        />
                        <InputError message={form.errors.name} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="slug" value="Slug (optional)" />
                        <TextInput
                            id="slug"
                            value={form.data.slug}
                            onChange={(e) => form.setData('slug', e.target.value)}
                            className="mt-1 block w-full"
                            placeholder="auto-generated from name"
                        />
                        <InputError message={form.errors.slug} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="description" value="Description" />
                        <textarea
                            id="description"
                            value={form.data.description}
                            onChange={(e) =>
                                form.setData('description', e.target.value)
                            }
                            rows={4}
                            className="mt-1 block w-full rounded-md border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary"
                        />
                        <InputError
                            message={form.errors.description}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="image" value="Image (optional)" />
                        <input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                form.setData('image', e.target.files?.[0] ?? null)
                            }
                            className="mt-1 block w-full text-sm text-muted-foreground file:me-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-foreground"
                        />
                        <InputError message={form.errors.image} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="sort_order" value="Sort order" />
                        <TextInput
                            id="sort_order"
                            type="number"
                            min="0"
                            value={form.data.sort_order}
                            onChange={(e) =>
                                form.setData('sort_order', e.target.value)
                            }
                            className="mt-1 block w-full"
                        />
                        <InputError
                            message={form.errors.sort_order}
                            className="mt-2"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            id="is_active"
                            type="checkbox"
                            checked={form.data.is_active}
                            onChange={(e) =>
                                form.setData('is_active', e.target.checked)
                            }
                            className="rounded border-border bg-background text-primary shadow-sm focus:ring-primary"
                        />
                        <label
                            htmlFor="is_active"
                            className="text-sm text-foreground"
                        >
                            Active
                        </label>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <PrimaryButton disabled={form.processing}>Save</PrimaryButton>
                        <Link
                            href={route('admin.categories.index')}
                            className="inline-flex items-center px-4 py-2 text-sm text-muted-foreground hover:text-primary"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
