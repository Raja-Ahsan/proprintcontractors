import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

const selectClass = 'mt-1 block w-full rounded-md border-border bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:ring-primary';

export default function Create({ categories }) {
    const form = useForm({
        service_category_id: categories[0]?.id ?? '',
        name: '',
        slug: '',
        price: '',
        popular: false,
        features_text: '',
        sort_order: 0,
        is_active: true,
    });

    return (
        <AdminLayout header={<h1 className="text-2xl font-black">New service package</h1>}>
            <Head title="New service package" />
            <form onSubmit={(e) => { e.preventDefault(); form.post(route('admin.service-packages.store')); }} className="neon-card max-w-2xl space-y-4 rounded-2xl border border-border bg-card/80 p-6">
                <div>
                    <InputLabel htmlFor="service_category_id" value="Category" />
                    <select id="service_category_id" value={form.data.service_category_id} onChange={(e) => form.setData('service_category_id', e.target.value)} className={selectClass} required>
                        {categories.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
                    </select>
                    <InputError message={form.errors.service_category_id} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="name" value="Package name" />
                    <TextInput id="name" value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} className="mt-1 block w-full" required />
                    <InputError message={form.errors.name} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="slug" value="Slug (optional)" />
                    <TextInput id="slug" value={form.data.slug} onChange={(e) => form.setData('slug', e.target.value)} className="mt-1 block w-full" />
                </div>
                <div>
                    <InputLabel htmlFor="price" value="Price (USD)" />
                    <TextInput id="price" type="number" min="0" step="0.01" value={form.data.price} onChange={(e) => form.setData('price', e.target.value)} className="mt-1 block w-full" required />
                    <InputError message={form.errors.price} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="features_text" value="Features (one per line)" />
                    <textarea id="features_text" rows={6} value={form.data.features_text} onChange={(e) => form.setData('features_text', e.target.value)} className="mt-1 block w-full rounded-md border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary" />
                </div>
                <div>
                    <InputLabel htmlFor="sort_order" value="Sort order" />
                    <TextInput id="sort_order" type="number" min="0" value={form.data.sort_order} onChange={(e) => form.setData('sort_order', e.target.value)} className="mt-1 block w-full" />
                </div>
                <label className="flex items-center gap-2">
                    <input type="checkbox" checked={form.data.popular} onChange={(e) => form.setData('popular', e.target.checked)} className="rounded border-border text-primary" />
                    <span className="text-sm">Mark as most popular</span>
                </label>
                <label className="flex items-center gap-2">
                    <input type="checkbox" checked={form.data.is_active} onChange={(e) => form.setData('is_active', e.target.checked)} className="rounded border-border text-primary" />
                    <span className="text-sm">Active</span>
                </label>
                <div className="flex gap-4 pt-2">
                    <PrimaryButton disabled={form.processing}>Save</PrimaryButton>
                    <Link href={route('admin.service-packages.index')} className="text-sm text-muted-foreground hover:text-primary">Cancel</Link>
                </div>
            </form>
        </AdminLayout>
    );
}
