<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Coupon;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call(SettingsSeeder::class);

        User::factory()->admin()->create([
            'name' => 'Administrator',
            'email' => 'admin@proprintcontractors.test',
        ]);

        User::factory()->create([
            'name' => 'Demo Customer',
            'email' => 'customer@proprintcontractors.test',
        ]);

        $categories = [
            ['name' => 'Business Cards', 'slug' => 'business-cards', 'sort_order' => 1],
            ['name' => 'Signage', 'slug' => 'signage', 'sort_order' => 2],
            ['name' => 'Apparel', 'slug' => 'apparel', 'sort_order' => 3],
        ];

        foreach ($categories as $c) {
            Category::query()->create([
                'name' => $c['name'],
                'slug' => $c['slug'],
                'description' => null,
                'is_active' => true,
                'sort_order' => $c['sort_order'],
            ]);
        }

        $products = [
            ['category' => 'business-cards', 'name' => 'Premium Matte Business Cards', 'sku' => 'PPC-BC-001', 'price' => 29.99, 'stock' => 500],
            ['category' => 'business-cards', 'name' => 'Gloss Finish Cards (500)', 'sku' => 'PPC-BC-002', 'price' => 49.99, 'stock' => 120],
            ['category' => 'signage', 'name' => 'Outdoor Vinyl Banner 3×6 ft', 'sku' => 'PPC-SG-101', 'price' => 89.99, 'stock' => 40],
            ['category' => 'signage', 'name' => 'Rigid Yard Signs (Qty 10)', 'sku' => 'PPC-SG-102', 'price' => 159.99, 'stock' => 25],
            ['category' => 'apparel', 'name' => 'Screen Printed Tee', 'sku' => 'PPC-AP-201', 'price' => 24.99, 'stock' => 200],
            ['category' => 'apparel', 'name' => 'Embroidered Polo', 'sku' => 'PPC-AP-202', 'price' => 34.99, 'stock' => 150],
        ];

        Coupon::query()->create([
            'code' => 'SAVE10',
            'type' => 'percent',
            'value' => 10,
            'max_uses' => null,
            'times_used' => 0,
            'starts_at' => null,
            'ends_at' => null,
            'min_subtotal' => 25,
            'is_active' => true,
        ]);

        Coupon::query()->create([
            'code' => 'FLAT5',
            'type' => 'fixed',
            'value' => 5,
            'max_uses' => null,
            'times_used' => 0,
            'starts_at' => null,
            'ends_at' => null,
            'min_subtotal' => null,
            'is_active' => true,
        ]);

        foreach ($products as $p) {
            $category = Category::query()->where('slug', $p['category'])->firstOrFail();

            Product::query()->create([
                'category_id' => $category->id,
                'name' => $p['name'],
                'slug' => Str::slug($p['name']).'-'.Str::lower(Str::random(4)),
                'sku' => $p['sku'],
                'description' => 'High-quality print-on-demand item: '.$p['name'].'.',
                'price' => $p['price'],
                'compare_at_price' => null,
                'stock_quantity' => $p['stock'],
                'image' => null,
                'is_active' => true,
                'is_customizable' => $p['sku'] === 'PPC-AP-201',
                'custom_print_area' => $p['sku'] === 'PPC-AP-201'
                    ? [
                        'left' => 0.12,
                        'top' => 0.18,
                        'width' => 0.76,
                        'height' => 0.62,
                    ]
                    : null,
            ]);
        }
    }
}
