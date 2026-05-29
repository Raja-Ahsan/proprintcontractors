import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ category }) {
    const form = useForm({
        name: category.name ?? '',
        slug: category.slug ?? '',
        sort_order: category.sort_order ?? 0,
        is_active: category.is_active ?? true,
    });

    return (
        <AdminLayout header={<h1 className="text-2xl font-black">Edit category</h1>}>
            <Head title="Edit service category" />
            <form onSubmit={(e) => { e.preventDefault(); form.put(route('admin.service-categories.update', category.id)); }} className="neon-card max-w-xl space-y-4 rounded-2xl border border-border bg-card/80 p-6">
                <div>
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput id="name" value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} className="mt-1 block w-full" required />
                    <InputError message={form.errors.name} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="slug" value="Slug" />
                    <TextInput id="slug" value={form.data.slug} onChange={(e) => form.setData('slug', e.target.value)} className="mt-1 block w-full" />
                    <InputError message={form.errors.slug} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="sort_order" value="Sort order" />
                    <TextInput id="sort_order" type="number" min="0" value={form.data.sort_order} onChange={(e) => form.setData('sort_order', e.target.value)} className="mt-1 block w-full" />
                </div>
                <label className="flex items-center gap-2">
                    <input type="checkbox" checked={form.data.is_active} onChange={(e) => form.setData('is_active', e.target.checked)} className="rounded border-border text-primary" />
                    <span className="text-sm">Active</span>
                </label>
                <div className="flex gap-4 pt-2">
                    <PrimaryButton disabled={form.processing}>Update</PrimaryButton>
                    <Link href={route('admin.service-categories.index')} className="text-sm text-muted-foreground hover:text-primary">Cancel</Link>
                </div>
            </form>
        </AdminLayout>
    );
}
