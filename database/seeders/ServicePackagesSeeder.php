<?php

namespace Database\Seeders;

use App\Models\ServiceCategory;
use App\Models\ServicePackage;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ServicePackagesSeeder extends Seeder
{
    public function run(): void
    {
        if (ServiceCategory::query()->exists()) {
            return;
        }

        $groups = [
            [
                'category' => 'Logo Design',
                'tiers' => [
                    [
                        'name' => 'Starter',
                        'price' => 99,
                        'features' => [
                            '2 logo concepts',
                            '2 revisions',
                            'PNG + JPG files',
                            '3-day delivery',
                        ],
                    ],
                    [
                        'name' => 'Professional',
                        'price' => 249,
                        'popular' => true,
                        'features' => [
                            '5 logo concepts',
                            'Unlimited revisions',
                            'Vector + Print files',
                            'Brand color palette',
                            '2-day delivery',
                        ],
                    ],
                    [
                        'name' => 'Brand Identity',
                        'price' => 599,
                        'features' => [
                            '10 logo concepts',
                            'Full brand guide',
                            'Business card design',
                            'Letterhead design',
                            'Social media kit',
                            '1-day delivery',
                        ],
                    ],
                ],
            ],
            [
                'category' => 'Web Design',
                'tiers' => [
                    [
                        'name' => 'Landing Page',
                        'price' => 499,
                        'features' => [
                            '1-page responsive',
                            'Contact form',
                            'SEO basics',
                            '5-day delivery',
                        ],
                    ],
                    [
                        'name' => 'Business Site',
                        'price' => 1499,
                        'popular' => true,
                        'features' => [
                            'Up to 8 pages',
                            'CMS included',
                            'Mobile optimized',
                            'On-page SEO',
                            '10-day delivery',
                        ],
                    ],
                    [
                        'name' => 'E-Commerce',
                        'price' => 2999,
                        'features' => [
                            'Full online store',
                            'Payment integration',
                            'Inventory mgmt',
                            'Product import',
                            'Training included',
                        ],
                    ],
                ],
            ],
            [
                'category' => 'Digital Marketing',
                'tiers' => [
                    [
                        'name' => 'Social Starter',
                        'price' => 399,
                        'features' => [
                            '12 posts/month',
                            '2 platforms',
                            'Monthly report',
                            'Content calendar',
                        ],
                    ],
                    [
                        'name' => 'Growth',
                        'price' => 899,
                        'popular' => true,
                        'features' => [
                            '24 posts/month',
                            '4 platforms',
                            'Paid ads setup',
                            'Bi-weekly reports',
                            'Strategy calls',
                        ],
                    ],
                    [
                        'name' => 'Enterprise',
                        'price' => 1999,
                        'features' => [
                            'Daily content',
                            'All platforms',
                            'Ad management',
                            'SEO + PPC',
                            'Dedicated manager',
                        ],
                    ],
                ],
            ],
        ];

        foreach ($groups as $sort => $group) {
            $category = ServiceCategory::query()->create([
                'name' => $group['category'],
                'slug' => Str::slug($group['category']),
                'sort_order' => $sort + 1,
                'is_active' => true,
            ]);

            foreach ($group['tiers'] as $tierSort => $tier) {
                ServicePackage::query()->create([
                    'service_category_id' => $category->id,
                    'name' => $tier['name'],
                    'slug' => Str::slug($category->name.'-'.$tier['name']),
                    'price' => $tier['price'],
                    'popular' => $tier['popular'] ?? false,
                    'features' => $tier['features'],
                    'sort_order' => $tierSort + 1,
                    'is_active' => true,
                ]);
            }
        }
    }
}
