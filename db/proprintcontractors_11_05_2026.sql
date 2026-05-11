-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 11, 2026 at 08:34 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `proprintcontractors`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('pro-print-contractors-cache-356a192b7913b04c54574d18c28d46e6395428ab', 'i:2;', 1778522860),
('pro-print-contractors-cache-356a192b7913b04c54574d18c28d46e6395428ab:timer', 'i:1778522860;', 1778522860),
('pro-print-contractors-cache-5c785c036466adea360111aa28563bfd556b5fba', 'i:1;', 1778518322),
('pro-print-contractors-cache-5c785c036466adea360111aa28563bfd556b5fba:timer', 'i:1778518322;', 1778518322);

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `session_id` varchar(255) DEFAULT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `product_variation_id` bigint(20) UNSIGNED DEFAULT NULL,
  `quantity` int(10) UNSIGNED NOT NULL,
  `customization_json` longtext DEFAULT NULL,
  `customization_preview_path` varchar(512) DEFAULT NULL,
  `customization_checksum` char(64) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cart_items`
--

INSERT INTO `cart_items` (`id`, `user_id`, `session_id`, `product_id`, `product_variation_id`, `quantity`, `customization_json`, `customization_preview_path`, `customization_checksum`, `created_at`, `updated_at`) VALUES
(8, NULL, 'luSeSf92wLs9rYfLfibI2zdLoubEPTGLanjoIwre', 7, 1, 2, NULL, NULL, NULL, '2026-05-11 11:18:58', '2026-05-11 11:18:58'),
(9, NULL, 'luSeSf92wLs9rYfLfibI2zdLoubEPTGLanjoIwre', 7, 1, 1, '{\"product_id\":7,\"fabric\":{\"version\":\"7.3.1\",\"objects\":[{\"cropX\":0,\"cropY\":0,\"type\":\"Image\",\"version\":\"7.3.1\",\"originX\":\"center\",\"originY\":\"center\",\"left\":440,\"top\":320,\"width\":1702,\"height\":501,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":0,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1.2774,\"scaleY\":1.2774,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"src\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/products\\/RflEI4DYSp6idge9YKJQ4jztZez7C2LcbtqKvFRc.jpg\",\"crossOrigin\":\"anonymous\",\"filters\":[]},{\"rx\":0,\"ry\":0,\"type\":\"Rect\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":70.4,\"top\":64,\"width\":739.2,\"height\":512,\"fill\":\"transparent\",\"stroke\":\"rgba(249,115,22,0.9)\",\"strokeWidth\":2,\"strokeDashArray\":[8,6],\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1,\"scaleY\":1,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0},{\"fontSize\":32,\"fontWeight\":\"600\",\"fontFamily\":\"Inter, system-ui, sans-serif\",\"fontStyle\":\"italic\",\"lineHeight\":1.16,\"text\":\"Your text\",\"charSpacing\":0,\"textAlign\":\"left\",\"styles\":[],\"pathStartOffset\":0,\"pathSide\":\"left\",\"pathAlign\":\"baseline\",\"underline\":false,\"overline\":false,\"linethrough\":false,\"textBackgroundColor\":null,\"direction\":\"ltr\",\"textDecorationThickness\":66.667,\"type\":\"IText\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":234,\"top\":204.2111,\"width\":138.7656,\"height\":36.16,\"fill\":\"#ffffff\",\"stroke\":null,\"strokeWidth\":1,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":2.6536,\"scaleY\":4.8651,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":{\"color\":\"rgba(0,0,0,.35)\",\"blur\":6,\"offsetX\":2,\"offsetY\":3,\"affectStroke\":false,\"nonScaling\":false,\"type\":\"shadow\"},\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0},{\"cropX\":0,\"cropY\":0,\"type\":\"Image\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":199.2799,\"top\":382.8146,\"width\":1702,\"height\":501,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":0,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":0.2518,\"scaleY\":0.2518,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"src\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/customizations\\/uploads\\/2026\\/05\\/bbSwG0jFzKBWkHJO05uJNWbTuqqIHBi0SyntNfZ7.jpg\",\"crossOrigin\":\"anonymous\",\"filters\":[]}]},\"canvas_width\":880,\"canvas_height\":640,\"variation_id\":1,\"saved_at\":\"2026-05-11T16:51:26+00:00\"}', 'customizations/previews/2026/05/j9hig41bfqjzqeu4ziidlquhzuiurgeycsy7afcj.png', 'd82f217041c52abce1687fa091e9be63940803637962cb98a7ff73d58b9fbf57', '2026-05-11 11:51:26', '2026-05-11 11:51:26');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `sort_order` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `image`, `is_active`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 'Business Cards', 'business-cards', NULL, NULL, 1, 1, '2026-05-06 13:11:17', '2026-05-07 12:11:21'),
(2, 'Signage', 'signage', NULL, NULL, 1, 2, '2026-05-06 13:11:18', '2026-05-06 13:11:18'),
(3, 'Apparel', 'apparel', NULL, 'categories/CFCKGQOSUKLrnROfI8SLSe99bh1EgSxlc75HXUJr.jpg', 1, 3, '2026-05-06 13:11:18', '2026-05-11 12:44:14'),
(4, 'Stationery', 'stationery', NULL, 'categories/7xc2su9WbARZv41sDb8hN71je9cF7mDO2j4P38to.png', 1, 0, '2026-05-11 12:35:41', '2026-05-11 12:35:41');

-- --------------------------------------------------------

--
-- Table structure for table `coupons`
--

CREATE TABLE `coupons` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `code` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `value` decimal(10,2) NOT NULL,
  `max_uses` int(10) UNSIGNED DEFAULT NULL,
  `times_used` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `starts_at` timestamp NULL DEFAULT NULL,
  `ends_at` timestamp NULL DEFAULT NULL,
  `min_subtotal` decimal(10,2) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `coupons`
--

INSERT INTO `coupons` (`id`, `code`, `type`, `value`, `max_uses`, `times_used`, `starts_at`, `ends_at`, `min_subtotal`, `is_active`, `created_at`, `updated_at`) VALUES
(1, '7%DESC', 'fixed', 10.00, 10, 0, NULL, NULL, 1.00, 1, '2026-05-08 11:25:26', '2026-05-08 11:25:26'),
(2, '10%DESC', 'percent', 10.00, 20, 0, NULL, NULL, 1.00, 1, '2026-05-08 11:25:54', '2026-05-08 11:25:54');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_05_06_180730_add_is_admin_to_users_table', 1),
(5, '2026_05_06_180730_create_categories_table', 1),
(6, '2026_05_06_180731_01_create_products_table', 1),
(7, '2026_05_06_180732_create_cart_items_table', 1),
(8, '2026_05_06_180733_create_orders_table', 1),
(9, '2026_05_06_180734_create_order_items_table', 1),
(10, '2026_05_06_181940_create_coupons_table', 2),
(11, '2026_05_06_181941_add_coupons_guest_stripe_to_orders_table', 2),
(12, '2026_05_06_191241_create_settings_table', 3),
(13, '2026_05_07_120000_add_product_variations_and_types', 4),
(14, '2026_05_07_140000_add_variation_attribute_defs_to_products', 5),
(15, '2026_05_07_160000_add_gallery_to_products', 6),
(16, '2026_05_07_180000_add_shipping_state_to_orders', 7),
(17, '2026_05_08_100000_add_product_customization', 8),
(18, '2026_05_08_200001_enable_existing_products_customizable', 9),
(19, '2026_05_08_120000_add_billing_fields_to_orders_table', 10),
(20, '2026_05_11_100000_add_image_to_categories_table', 11),
(21, '2026_05_11_140000_add_is_featured_to_products_table', 12);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_number` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `coupon_id` bigint(20) UNSIGNED DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `subtotal` decimal(10,2) NOT NULL,
  `tax` decimal(10,2) NOT NULL DEFAULT 0.00,
  `shipping_total` decimal(10,2) NOT NULL DEFAULT 0.00,
  `total` decimal(10,2) NOT NULL,
  `discount_amount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `payment_status` varchar(255) NOT NULL DEFAULT 'unpaid',
  `stripe_checkout_session_id` varchar(255) DEFAULT NULL,
  `shipping_name` varchar(255) NOT NULL,
  `shipping_email` varchar(255) NOT NULL,
  `shipping_phone` varchar(255) DEFAULT NULL,
  `shipping_address_line1` varchar(255) NOT NULL,
  `shipping_address_line2` varchar(255) DEFAULT NULL,
  `shipping_city` varchar(255) NOT NULL,
  `shipping_state` varchar(120) DEFAULT NULL,
  `shipping_postal_code` varchar(255) NOT NULL,
  `shipping_country` varchar(255) NOT NULL DEFAULT 'US',
  `billing_name` varchar(255) DEFAULT NULL,
  `billing_phone` varchar(255) DEFAULT NULL,
  `billing_address_line1` varchar(255) DEFAULT NULL,
  `billing_address_line2` varchar(255) DEFAULT NULL,
  `billing_city` varchar(255) DEFAULT NULL,
  `billing_state` varchar(120) DEFAULT NULL,
  `billing_postal_code` varchar(255) DEFAULT NULL,
  `billing_country` varchar(255) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `placed_at` timestamp NULL DEFAULT NULL,
  `paid_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `order_number`, `user_id`, `coupon_id`, `status`, `subtotal`, `tax`, `shipping_total`, `total`, `discount_amount`, `payment_status`, `stripe_checkout_session_id`, `shipping_name`, `shipping_email`, `shipping_phone`, `shipping_address_line1`, `shipping_address_line2`, `shipping_city`, `shipping_state`, `shipping_postal_code`, `shipping_country`, `billing_name`, `billing_phone`, `billing_address_line1`, `billing_address_line2`, `billing_city`, `billing_state`, `billing_postal_code`, `billing_country`, `notes`, `placed_at`, `paid_at`, `created_at`, `updated_at`) VALUES
(1, 'ORD-03805877-174046', 1, NULL, 'awaiting_payment', 250.00, 0.00, 9.99, 259.99, 0.00, 'unpaid', 'cs_test_a13IK0iPSRe2LK5OBDUUkrg57XGJ3mPYxJDaf6kYwbpIwSVhX7iRVWn15y', 'Administrator', 'admin@proprintcontractors.test', NULL, 'https://www.kon.com.au', NULL, 'https://www.xin.tv', NULL, '99901', 'US', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-05-07 12:40:46', NULL, '2026-05-07 12:40:46', '2026-05-07 12:40:54'),
(2, 'ORD-1FE3E383-174609', 1, 1, 'awaiting_payment', 50.00, 0.00, 9.99, 49.99, 10.00, 'unpaid', 'cs_test_a1xOylf4ldhcfmDQ7sL5WqLeKHcFxcWR7wq2OiUeWtsxGOCV2zvRy7XgUf', 'Administrator', 'admin@proprintcontractors.test', NULL, 'Dha street no 35b', NULL, 'karachi', NULL, '12345', 'US', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-05-08 12:46:09', NULL, '2026-05-08 12:46:09', '2026-05-08 12:46:16'),
(3, 'ORD-44FEA14D-180323', 1, NULL, 'awaiting_payment', 50.00, 0.00, 9.99, 59.99, 0.00, 'unpaid', 'cs_test_a1AQ5AfmJHi5JUr2hUoI6yjPolH0nWmbjDNybHgAMsJkzIgjfyIM6es2hu', 'Administrator', 'admin@proprintcontractors.test', NULL, 'Dha street no 35b', NULL, 'karachi', 'test', '990001', 'US', 'Administrator', NULL, 'Dha street no 35b', NULL, 'karachi', 'test', '990001', 'US', NULL, '2026-05-08 13:03:23', NULL, '2026-05-08 13:03:23', '2026-05-08 13:03:25'),
(4, 'ORD-18774D4C-180855', 1, NULL, 'pending', 40.00, 0.00, 9.99, 49.99, 0.00, 'unpaid', 'cs_test_a1EW9xNzMIgMJi1q44tPBXCCwCRszYlleqqBYwcUZxsyJeKGtQdCBi4DWE', 'Xanthus Griffith', 'zusuto@mailinator.com', '+1 (988) 349-4185', '737 Cowley Road', 'Quibusdam ut pariatu', 'Excepturi voluptates', 'Consequatur ipsa v', '46187', 'FR', 'Xanthus Griffith', '+1 (988) 349-4185', '737 Cowley Road', 'Quibusdam ut pariatu', 'Excepturi voluptates', 'Consequatur ipsa v', '46187', 'FR', 'Consequatur enim und', '2026-05-11 13:08:55', NULL, '2026-05-11 13:08:55', '2026-05-11 13:10:12');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED DEFAULT NULL,
  `product_variation_id` bigint(20) UNSIGNED DEFAULT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_sku` varchar(255) DEFAULT NULL,
  `variation_attributes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`variation_attributes`)),
  `unit_price` decimal(10,2) NOT NULL,
  `quantity` int(10) UNSIGNED NOT NULL,
  `line_total` decimal(10,2) NOT NULL,
  `customization_json` longtext DEFAULT NULL,
  `customization_preview_path` varchar(512) DEFAULT NULL,
  `customization_asset_paths` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`customization_asset_paths`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `product_variation_id`, `product_name`, `product_sku`, `variation_attributes`, `unit_price`, `quantity`, `line_total`, `customization_json`, `customization_preview_path`, `customization_asset_paths`, `created_at`, `updated_at`) VALUES
(1, 1, 8, 3, 'Business Card', '00013', '{\"Packet\":\"1000\"}', 50.00, 3, 150.00, NULL, NULL, NULL, '2026-05-07 12:40:46', '2026-05-07 12:40:46'),
(2, 1, 8, 4, 'Business Card', '00014', '{\"Packet\":\"5000\"}', 100.00, 1, 100.00, NULL, NULL, NULL, '2026-05-07 12:40:46', '2026-05-07 12:40:46'),
(3, 2, 8, 2, 'Business Card', '00012', '{\"Packet\":\"500\"}', 10.00, 2, 20.00, NULL, NULL, NULL, '2026-05-08 12:46:09', '2026-05-08 12:46:09'),
(4, 2, 8, 2, 'Business Card', '00012', '{\"Packet\":\"500\"}', 10.00, 1, 10.00, '{\"product_id\":8,\"fabric\":{\"version\":\"7.3.1\",\"objects\":[{\"cropX\":0,\"cropY\":0,\"type\":\"Image\",\"version\":\"7.3.1\",\"originX\":\"center\",\"originY\":\"center\",\"left\":440,\"top\":320,\"width\":800,\"height\":800,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":0,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1.1,\"scaleY\":1.1,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"src\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/products\\/p6rrnrz44IszIfa9YIz9MOggO2n6328Soe5e5DTh.jpg\",\"crossOrigin\":\"anonymous\",\"filters\":[]},{\"rx\":0,\"ry\":0,\"type\":\"Rect\",\"version\":\"7.3.1\",\"originX\":\"center\",\"originY\":\"center\",\"left\":70.4,\"top\":64,\"width\":739.2,\"height\":512,\"fill\":\"transparent\",\"stroke\":\"rgba(249,115,22,0.9)\",\"strokeWidth\":2,\"strokeDashArray\":[8,6],\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1,\"scaleY\":1,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0},{\"cropX\":0,\"cropY\":0,\"type\":\"Image\",\"version\":\"7.3.1\",\"originX\":\"center\",\"originY\":\"center\",\"left\":273.68,\"top\":271.0421,\"width\":1702,\"height\":501,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":0,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":0.1954,\"scaleY\":0.1954,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"src\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/customizations\\/uploads\\/2026\\/05\\/0EW7hOux30PNwJDdTqNgUfCoRhbIBopzMuEQWFPK.jpg\",\"crossOrigin\":\"anonymous\",\"filters\":[]},{\"cropX\":0,\"cropY\":0,\"type\":\"Image\",\"version\":\"7.3.1\",\"originX\":\"center\",\"originY\":\"center\",\"left\":273.68,\"top\":271.0421,\"width\":1702,\"height\":501,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":0,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":0.1954,\"scaleY\":0.1954,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"src\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/customizations\\/uploads\\/2026\\/05\\/trOsnFU386V69aoLDofF3iKVswC1WnOkC1yP7uax.jpg\",\"crossOrigin\":\"anonymous\",\"filters\":[]},{\"cropX\":0,\"cropY\":0,\"type\":\"Image\",\"version\":\"7.3.1\",\"originX\":\"center\",\"originY\":\"center\",\"left\":273.68,\"top\":271.0421,\"width\":1702,\"height\":501,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":0,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":0.1954,\"scaleY\":0.1954,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"src\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/customizations\\/uploads\\/2026\\/05\\/Mk4N4blYh8cTURmuJZEf0E7BfdOdLTI0QuxChe6G.jpg\",\"crossOrigin\":\"anonymous\",\"filters\":[]},{\"cropX\":0,\"cropY\":0,\"type\":\"Image\",\"version\":\"7.3.1\",\"originX\":\"center\",\"originY\":\"center\",\"left\":273.68,\"top\":271.0421,\"width\":1702,\"height\":501,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":0,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":0.1954,\"scaleY\":0.1954,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"src\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/customizations\\/uploads\\/2026\\/05\\/zMz45UKaWbJdmdgOWqh6i1qXZZ5xYixl5a9KCyqz.jpg\",\"crossOrigin\":\"anonymous\",\"filters\":[]},{\"cropX\":0,\"cropY\":0,\"type\":\"Image\",\"version\":\"7.3.1\",\"originX\":\"center\",\"originY\":\"center\",\"left\":273.68,\"top\":271.0421,\"width\":1702,\"height\":501,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":0,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":0.1954,\"scaleY\":0.1954,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"src\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/customizations\\/uploads\\/2026\\/05\\/98VahrzQOJ9dvpb78Se6SsskTTMwG9SEUQ25aa3g.jpg\",\"crossOrigin\":\"anonymous\",\"filters\":[]},{\"cropX\":0,\"cropY\":0,\"type\":\"Image\",\"version\":\"7.3.1\",\"originX\":\"center\",\"originY\":\"center\",\"left\":273.68,\"top\":153.68,\"width\":512,\"height\":512,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":0,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":0.74,\"scaleY\":0.74,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"src\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/customizations\\/uploads\\/2026\\/05\\/BcN0UgDh5uRosSOhptUqUHbz98ZIKkZdGk6rH8UB.png\",\"crossOrigin\":\"anonymous\",\"filters\":[]}]},\"canvas_width\":880,\"canvas_height\":640,\"variation_id\":2,\"saved_at\":\"2026-05-08T17:27:43+00:00\"}', 'customizations/previews/2026/05/0hrmuvltzkvek2ak7cv4xfm5qh99954xe3znhyrz.png', '[\"customizations\\/uploads\\/2026\\/05\\/0EW7hOux30PNwJDdTqNgUfCoRhbIBopzMuEQWFPK.jpg\",\"customizations\\/uploads\\/2026\\/05\\/trOsnFU386V69aoLDofF3iKVswC1WnOkC1yP7uax.jpg\",\"customizations\\/uploads\\/2026\\/05\\/Mk4N4blYh8cTURmuJZEf0E7BfdOdLTI0QuxChe6G.jpg\",\"customizations\\/uploads\\/2026\\/05\\/zMz45UKaWbJdmdgOWqh6i1qXZZ5xYixl5a9KCyqz.jpg\",\"customizations\\/uploads\\/2026\\/05\\/98VahrzQOJ9dvpb78Se6SsskTTMwG9SEUQ25aa3g.jpg\",\"customizations\\/uploads\\/2026\\/05\\/BcN0UgDh5uRosSOhptUqUHbz98ZIKkZdGk6rH8UB.png\"]', '2026-05-08 12:46:09', '2026-05-08 12:46:09'),
(5, 2, 7, 1, 'test', '0001', '{\"Color\":\"Red\",\"Size\":\"L\"}', 10.00, 1, 10.00, '{\"product_id\":7,\"fabric\":{\"version\":\"7.3.1\",\"objects\":[{\"cropX\":0,\"cropY\":0,\"type\":\"Image\",\"version\":\"7.3.1\",\"originX\":\"center\",\"originY\":\"center\",\"left\":440,\"top\":320,\"width\":1702,\"height\":501,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":0,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1.2774,\"scaleY\":1.2774,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"src\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/products\\/RflEI4DYSp6idge9YKJQ4jztZez7C2LcbtqKvFRc.jpg\",\"crossOrigin\":\"anonymous\",\"filters\":[]},{\"rx\":0,\"ry\":0,\"type\":\"Rect\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":70.4,\"top\":64,\"width\":739.2,\"height\":512,\"fill\":\"transparent\",\"stroke\":\"rgba(249,115,22,0.9)\",\"strokeWidth\":2,\"strokeDashArray\":[8,6],\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1,\"scaleY\":1,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0},{\"fontSize\":32,\"fontWeight\":\"600\",\"fontFamily\":\"Inter, system-ui, sans-serif\",\"fontStyle\":\"normal\",\"lineHeight\":1.16,\"text\":\"Your text\",\"charSpacing\":0,\"textAlign\":\"left\",\"styles\":[],\"pathStartOffset\":0,\"pathSide\":\"left\",\"pathAlign\":\"baseline\",\"underline\":false,\"overline\":false,\"linethrough\":false,\"textBackgroundColor\":null,\"direction\":\"ltr\",\"textDecorationThickness\":66.667,\"type\":\"IText\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":94.4,\"top\":88,\"width\":138.7656,\"height\":36.16,\"fill\":\"#0f172a\",\"stroke\":null,\"strokeWidth\":1,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1,\"scaleY\":1,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0},{\"cropX\":0,\"cropY\":0,\"type\":\"Image\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":273.68,\"top\":271.0421,\"width\":1702,\"height\":501,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":0,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":0.1954,\"scaleY\":0.1954,\"angle\":-13,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"src\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/customizations\\/uploads\\/2026\\/05\\/HO3saNUWsW8yqC5gS4ZdFoiluXtT45FtguSD9kJG.jpg\",\"crossOrigin\":\"anonymous\",\"filters\":[]},{\"fontSize\":32,\"fontWeight\":\"600\",\"fontFamily\":\"Inter, system-ui, sans-serif\",\"fontStyle\":\"normal\",\"lineHeight\":1.16,\"text\":\"Your text\",\"charSpacing\":0,\"textAlign\":\"left\",\"styles\":[],\"pathStartOffset\":0,\"pathSide\":\"left\",\"pathAlign\":\"baseline\",\"underline\":false,\"overline\":false,\"linethrough\":false,\"textBackgroundColor\":null,\"direction\":\"ltr\",\"textDecorationThickness\":66.667,\"type\":\"IText\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":112.4,\"top\":106,\"width\":138.7656,\"height\":36.16,\"fill\":\"#0f172a\",\"stroke\":null,\"strokeWidth\":1,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1,\"scaleY\":1,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0}]},\"canvas_width\":880,\"canvas_height\":640,\"variation_id\":1,\"saved_at\":\"2026-05-08T17:36:54+00:00\"}', 'customizations/previews/2026/05/rjlreqffjpvjxup3mv4ikd07oylenmpvccaz8mcc.png', '[\"customizations\\/uploads\\/2026\\/05\\/HO3saNUWsW8yqC5gS4ZdFoiluXtT45FtguSD9kJG.jpg\"]', '2026-05-08 12:46:09', '2026-05-08 12:46:09'),
(6, 2, 7, 1, 'test', '0001', '{\"Color\":\"Red\",\"Size\":\"L\"}', 10.00, 1, 10.00, '{\"product_id\":7,\"fabric\":{\"version\":\"7.3.1\",\"objects\":[{\"cropX\":0,\"cropY\":0,\"type\":\"Image\",\"version\":\"7.3.1\",\"originX\":\"center\",\"originY\":\"center\",\"left\":440,\"top\":320,\"width\":1702,\"height\":501,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":0,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1.2774,\"scaleY\":1.2774,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"src\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/products\\/RflEI4DYSp6idge9YKJQ4jztZez7C2LcbtqKvFRc.jpg\",\"crossOrigin\":\"anonymous\",\"filters\":[]},{\"rx\":0,\"ry\":0,\"type\":\"Rect\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":70.4,\"top\":64,\"width\":739.2,\"height\":512,\"fill\":\"transparent\",\"stroke\":\"rgba(249,115,22,0.9)\",\"strokeWidth\":2,\"strokeDashArray\":[8,6],\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1,\"scaleY\":1,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0},{\"cropX\":0,\"cropY\":0,\"type\":\"Image\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":-3.6271,\"top\":133.9525,\"width\":1702,\"height\":501,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":0,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":0.4565,\"scaleY\":0.4565,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"src\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/customizations\\/uploads\\/2026\\/05\\/XBTvpbG6OVwBRQgYUNsqhp03YMOGChu3YAgMzU3p.jpg\",\"crossOrigin\":\"anonymous\",\"filters\":[]}]},\"canvas_width\":880,\"canvas_height\":640,\"variation_id\":1,\"saved_at\":\"2026-05-08T17:37:58+00:00\"}', 'customizations/previews/2026/05/1z1afcdijpejfrtnwphkj0kvrc239kwrobhpuhol.png', '[\"customizations\\/uploads\\/2026\\/05\\/XBTvpbG6OVwBRQgYUNsqhp03YMOGChu3YAgMzU3p.jpg\"]', '2026-05-08 12:46:09', '2026-05-08 12:46:09'),
(7, 3, 8, 3, 'Business Card', '00013', '{\"Packet\":\"1000\"}', 50.00, 1, 50.00, '{\"product_id\":8,\"fabric\":{\"version\":\"7.3.1\",\"objects\":[{\"cropX\":0,\"cropY\":0,\"type\":\"Image\",\"version\":\"7.3.1\",\"originX\":\"center\",\"originY\":\"center\",\"left\":440,\"top\":320,\"width\":800,\"height\":800,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":0,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1.1,\"scaleY\":1.1,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"src\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/products\\/p6rrnrz44IszIfa9YIz9MOggO2n6328Soe5e5DTh.jpg\",\"crossOrigin\":\"anonymous\",\"filters\":[]},{\"rx\":0,\"ry\":0,\"type\":\"Rect\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":70.4,\"top\":64,\"width\":739.2,\"height\":512,\"fill\":\"transparent\",\"stroke\":\"rgba(249,115,22,0.9)\",\"strokeWidth\":2,\"strokeDashArray\":[8,6],\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1,\"scaleY\":1,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0},{\"cropX\":0,\"cropY\":0,\"type\":\"Image\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":273.68,\"top\":271.0421,\"width\":1702,\"height\":501,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":0,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":0.1954,\"scaleY\":0.1954,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"src\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/customizations\\/uploads\\/2026\\/05\\/FD7Nd86urofcJyU7AOXD87HmdOLINEJYot2e1MtT.jpg\",\"crossOrigin\":\"anonymous\",\"filters\":[]},{\"fontSize\":32,\"fontWeight\":\"600\",\"fontFamily\":\"Georgia, serif\",\"fontStyle\":\"italic\",\"lineHeight\":1.16,\"text\":\"Your text\",\"charSpacing\":0,\"textAlign\":\"left\",\"styles\":[],\"pathStartOffset\":0,\"pathSide\":\"left\",\"pathAlign\":\"baseline\",\"underline\":true,\"overline\":false,\"linethrough\":false,\"textBackgroundColor\":null,\"direction\":\"ltr\",\"textDecorationThickness\":66.667,\"type\":\"IText\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":94.4,\"top\":88,\"width\":154.0781,\"height\":36.16,\"fill\":\"#fafafa\",\"stroke\":null,\"strokeWidth\":1,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":2.62,\"scaleY\":2.62,\"angle\":3,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0}]},\"canvas_width\":880,\"canvas_height\":640,\"variation_id\":3,\"saved_at\":\"2026-05-08T17:55:30+00:00\"}', 'customizations/previews/2026/05/fvdbju647x2lvrbwu2nghcozth2fgzuokqfbigba.png', '[\"customizations\\/uploads\\/2026\\/05\\/FD7Nd86urofcJyU7AOXD87HmdOLINEJYot2e1MtT.jpg\"]', '2026-05-08 13:03:23', '2026-05-08 13:03:23'),
(8, 4, 9, 5, 'busines card', 'BUSINESCARD-1', '{\"Color\":\"Red\",\"Size\":\"S\"}', 10.00, 1, 10.00, '{\"product_id\":9,\"fabric\":{\"version\":\"7.3.1\",\"objects\":[{\"cropX\":0,\"cropY\":0,\"type\":\"Image\",\"version\":\"7.3.1\",\"originX\":\"center\",\"originY\":\"center\",\"left\":440,\"top\":320,\"width\":691,\"height\":1536,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":0,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1.2735,\"scaleY\":1.2735,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"src\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/products\\/variations\\/uXJMr7TSslAem2mMfadwmhEW2YJ81zzgUUH3nwTo.jpg\",\"crossOrigin\":\"anonymous\",\"filters\":[]},{\"rx\":0,\"ry\":0,\"type\":\"Rect\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":70.4,\"top\":64,\"width\":739.2,\"height\":512,\"fill\":\"transparent\",\"stroke\":\"rgba(249,115,22,0.9)\",\"strokeWidth\":2,\"strokeDashArray\":[8,6],\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1,\"scaleY\":1,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0},{\"cropX\":0,\"cropY\":0,\"type\":\"Image\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":273.68,\"top\":-49.707,\"width\":691,\"height\":1536,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":0,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":0.4814,\"scaleY\":0.4814,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"src\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/customizations\\/uploads\\/2026\\/05\\/lHe8cyojHarAlwsx13TgBiJ5doVgbGnMqVFfNcVC.jpg\",\"crossOrigin\":\"anonymous\",\"filters\":[]}]},\"canvas_width\":880,\"canvas_height\":640,\"variation_id\":5,\"saved_at\":\"2026-05-11T18:03:16+00:00\"}', 'customizations/previews/2026/05/acf3wnhxfewiaqh1a0umryusmosxb888qrvyxndq.png', '[\"customizations\\/uploads\\/2026\\/05\\/lHe8cyojHarAlwsx13TgBiJ5doVgbGnMqVFfNcVC.jpg\"]', '2026-05-11 13:08:56', '2026-05-11 13:08:56'),
(9, 4, 9, 5, 'busines card', 'BUSINESCARD-1', '{\"Color\":\"Red\",\"Size\":\"S\"}', 10.00, 1, 10.00, '{\"product_id\":9,\"fabric\":{\"version\":\"7.3.1\",\"objects\":[{\"cropX\":0,\"cropY\":0,\"type\":\"Image\",\"version\":\"7.3.1\",\"originX\":\"center\",\"originY\":\"center\",\"left\":440,\"top\":320,\"width\":691,\"height\":1536,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":0,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1.2735,\"scaleY\":1.2735,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"src\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/products\\/variations\\/uXJMr7TSslAem2mMfadwmhEW2YJ81zzgUUH3nwTo.jpg\",\"crossOrigin\":\"anonymous\",\"filters\":[]},{\"rx\":0,\"ry\":0,\"type\":\"Rect\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":70.4,\"top\":64,\"width\":739.2,\"height\":512,\"fill\":\"transparent\",\"stroke\":\"rgba(249,115,22,0.9)\",\"strokeWidth\":2,\"strokeDashArray\":[8,6],\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1,\"scaleY\":1,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0},{\"fontSize\":32,\"fontWeight\":\"600\",\"fontFamily\":\"Inter, system-ui, sans-serif\",\"fontStyle\":\"normal\",\"lineHeight\":1.16,\"text\":\"Your text\",\"charSpacing\":0,\"textAlign\":\"left\",\"styles\":[],\"pathStartOffset\":0,\"pathSide\":\"left\",\"pathAlign\":\"baseline\",\"underline\":false,\"overline\":false,\"linethrough\":false,\"textBackgroundColor\":null,\"direction\":\"ltr\",\"textDecorationThickness\":66.667,\"type\":\"IText\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":94.4,\"top\":88,\"width\":138.7656,\"height\":36.16,\"fill\":\"#0f172a\",\"stroke\":null,\"strokeWidth\":1,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1,\"scaleY\":1,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0},{\"cropX\":0,\"cropY\":0,\"type\":\"Image\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":273.68,\"top\":153.68,\"width\":800,\"height\":800,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":0,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":0.4158,\"scaleY\":0.4158,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"src\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/customizations\\/uploads\\/2026\\/05\\/e1qLD1KQz1DCicx7QBNYTm7hMHt7SflGqMq3rjfY.jpg\",\"crossOrigin\":\"anonymous\",\"filters\":[]}]},\"canvas_width\":880,\"canvas_height\":640,\"variation_id\":5,\"saved_at\":\"2026-05-11T18:03:50+00:00\"}', 'customizations/previews/2026/05/4a4pug2t2vjqo6x2zlslpqpea4ncz0t9ubgqgaq1.png', '[\"customizations\\/uploads\\/2026\\/05\\/e1qLD1KQz1DCicx7QBNYTm7hMHt7SflGqMq3rjfY.jpg\"]', '2026-05-11 13:08:56', '2026-05-11 13:08:56'),
(10, 4, 9, 5, 'busines card', 'BUSINESCARD-1', '{\"Color\":\"Red\",\"Size\":\"S\"}', 10.00, 1, 10.00, '{\"product_id\":9,\"fabric\":{\"version\":\"7.3.1\",\"objects\":[{\"cropX\":0,\"cropY\":0,\"type\":\"Image\",\"version\":\"7.3.1\",\"originX\":\"center\",\"originY\":\"center\",\"left\":440,\"top\":320,\"width\":691,\"height\":1536,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":0,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1.2735,\"scaleY\":1.2735,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"src\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/products\\/variations\\/uXJMr7TSslAem2mMfadwmhEW2YJ81zzgUUH3nwTo.jpg\",\"crossOrigin\":\"anonymous\",\"filters\":[]},{\"rx\":0,\"ry\":0,\"type\":\"Rect\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":70.4,\"top\":64,\"width\":739.2,\"height\":512,\"fill\":\"transparent\",\"stroke\":\"rgba(249,115,22,0.9)\",\"strokeWidth\":2,\"strokeDashArray\":[8,6],\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1,\"scaleY\":1,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0},{\"cropX\":0,\"cropY\":0,\"type\":\"Image\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":273.68,\"top\":203.576,\"width\":700,\"height\":490,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":0,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":0.4752,\"scaleY\":0.4752,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"src\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/customizations\\/uploads\\/2026\\/05\\/xuJD6cLeDtf0vWykpok5Cs8hAFaMyCzchLSICxA6.jpg\",\"crossOrigin\":\"anonymous\",\"filters\":[]}]},\"canvas_width\":880,\"canvas_height\":640,\"variation_id\":5,\"saved_at\":\"2026-05-11T18:06:47+00:00\"}', 'customizations/previews/2026/05/gbqzearvoxi86by6vadd2k0neapzhgjp1z6b8zbc.png', '[\"customizations\\/uploads\\/2026\\/05\\/xuJD6cLeDtf0vWykpok5Cs8hAFaMyCzchLSICxA6.jpg\"]', '2026-05-11 13:08:56', '2026-05-11 13:08:56'),
(11, 4, 9, 5, 'busines card', 'BUSINESCARD-1', '{\"Color\":\"Red\",\"Size\":\"S\"}', 10.00, 1, 10.00, '{\"product_id\":9,\"fabric\":{\"version\":\"7.3.1\",\"objects\":[{\"cropX\":0,\"cropY\":0,\"type\":\"Image\",\"version\":\"7.3.1\",\"originX\":\"center\",\"originY\":\"center\",\"left\":440,\"top\":320,\"width\":691,\"height\":1536,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":0,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1.2735,\"scaleY\":1.2735,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"src\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/products\\/variations\\/uXJMr7TSslAem2mMfadwmhEW2YJ81zzgUUH3nwTo.jpg\",\"crossOrigin\":\"anonymous\",\"filters\":[]},{\"rx\":0,\"ry\":0,\"type\":\"Rect\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":70.4,\"top\":64,\"width\":739.2,\"height\":512,\"fill\":\"transparent\",\"stroke\":\"rgba(249,115,22,0.9)\",\"strokeWidth\":2,\"strokeDashArray\":[8,6],\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1,\"scaleY\":1,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0},{\"cropX\":0,\"cropY\":0,\"type\":\"Image\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":81.68,\"top\":89.976,\"width\":700,\"height\":490,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":0,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":0.3954,\"scaleY\":0.3954,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"src\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/customizations\\/uploads\\/2026\\/05\\/drIYTaGGNhSElSKukTjcemBxJQqNS5DJ2vV3Vcol.jpg\",\"crossOrigin\":\"anonymous\",\"filters\":[]},{\"fontSize\":32,\"fontWeight\":\"normal\",\"fontFamily\":\"Inter, system-ui, sans-serif\",\"fontStyle\":\"normal\",\"lineHeight\":1.16,\"text\":\"Raaja AHsan\",\"charSpacing\":1,\"textAlign\":\"center\",\"styles\":[],\"pathStartOffset\":0,\"pathSide\":\"left\",\"pathAlign\":\"baseline\",\"underline\":false,\"overline\":false,\"linethrough\":false,\"textBackgroundColor\":null,\"direction\":\"ltr\",\"textDecorationThickness\":66.667,\"type\":\"IText\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":229.6,\"top\":197.4736,\"width\":191.0388,\"height\":36.16,\"fill\":\"#e524d5\",\"stroke\":null,\"strokeWidth\":1,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1.5631,\"scaleY\":1.5631,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0},{\"fontSize\":32,\"fontWeight\":\"normal\",\"fontFamily\":\"Inter, system-ui, sans-serif\",\"fontStyle\":\"normal\",\"lineHeight\":1.16,\"text\":\"Raaja AHsan\",\"charSpacing\":1,\"textAlign\":\"center\",\"styles\":[],\"pathStartOffset\":0,\"pathSide\":\"left\",\"pathAlign\":\"baseline\",\"underline\":false,\"overline\":false,\"linethrough\":false,\"textBackgroundColor\":null,\"direction\":\"ltr\",\"textDecorationThickness\":66.667,\"type\":\"IText\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":299.6,\"top\":311.4736,\"width\":191.0388,\"height\":36.16,\"fill\":\"#e524d5\",\"stroke\":null,\"strokeWidth\":1,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1.5631,\"scaleY\":1.5631,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0},{\"cropX\":0,\"cropY\":0,\"type\":\"Image\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":530.08,\"top\":269.576,\"width\":700,\"height\":490,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":0,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":0.3954,\"scaleY\":0.3954,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"src\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/customizations\\/uploads\\/2026\\/05\\/drIYTaGGNhSElSKukTjcemBxJQqNS5DJ2vV3Vcol.jpg\",\"crossOrigin\":\"anonymous\",\"filters\":[]}]},\"canvas_width\":880,\"canvas_height\":640,\"variation_id\":5,\"saved_at\":\"2026-05-11T18:08:09+00:00\"}', 'customizations/previews/2026/05/fsev7pb2avh0n4fy7kwbws9aludjq3v50wx39nba.png', '[\"customizations\\/uploads\\/2026\\/05\\/drIYTaGGNhSElSKukTjcemBxJQqNS5DJ2vV3Vcol.jpg\"]', '2026-05-11 13:08:56', '2026-05-11 13:08:56');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `type` varchar(20) NOT NULL DEFAULT 'simple',
  `variation_attribute_defs` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`variation_attribute_defs`)),
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `sku` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `compare_at_price` decimal(10,2) DEFAULT NULL,
  `stock_quantity` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `image` varchar(255) DEFAULT NULL,
  `gallery` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`gallery`)),
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_featured` tinyint(1) NOT NULL DEFAULT 0,
  `is_customizable` tinyint(1) NOT NULL DEFAULT 0,
  `custom_print_area` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`custom_print_area`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `category_id`, `type`, `variation_attribute_defs`, `name`, `slug`, `sku`, `description`, `price`, `compare_at_price`, `stock_quantity`, `image`, `gallery`, `is_active`, `is_featured`, `is_customizable`, `custom_print_area`, `created_at`, `updated_at`) VALUES
(1, 1, 'simple', NULL, 'Premium Matte Business Cards', 'premium-matte-business-cards-ivaq', 'PPC-BC-001', 'High-quality print-on-demand item: Premium Matte Business Cards.', 29.99, NULL, 500, NULL, NULL, 1, 0, 1, NULL, '2026-05-06 13:11:18', '2026-05-06 13:11:18'),
(2, 1, 'simple', NULL, 'Gloss Finish Cards (500)', 'gloss-finish-cards-500-mjpz', 'PPC-BC-002', 'High-quality print-on-demand item: Gloss Finish Cards (500).', 49.99, NULL, 120, NULL, NULL, 1, 0, 1, NULL, '2026-05-06 13:11:18', '2026-05-06 13:11:18'),
(3, 2, 'simple', NULL, 'Outdoor Vinyl Banner 3×6 ft', 'outdoor-vinyl-banner-36-ft-xers', 'PPC-SG-101', 'High-quality print-on-demand item: Outdoor Vinyl Banner 3×6 ft.', 89.99, NULL, 40, NULL, NULL, 1, 0, 1, NULL, '2026-05-06 13:11:19', '2026-05-06 13:11:19'),
(4, 2, 'simple', NULL, 'Rigid Yard Signs (Qty 10)', 'rigid-yard-signs-qty-10-m8vc', 'PPC-SG-102', 'High-quality print-on-demand item: Rigid Yard Signs (Qty 10).', 159.99, NULL, 25, NULL, NULL, 1, 0, 1, NULL, '2026-05-06 13:11:19', '2026-05-06 13:11:19'),
(5, 3, 'simple', NULL, 'Screen Printed Tee', 'screen-printed-tee-cphe', 'PPC-AP-201', 'High-quality print-on-demand item: Screen Printed Tee.', 24.99, NULL, 200, NULL, NULL, 1, 0, 1, NULL, '2026-05-06 13:11:19', '2026-05-06 13:11:19'),
(6, 3, 'simple', NULL, 'Embroidered Polo', 'embroidered-polo-x7hg', 'PPC-AP-202', 'High-quality print-on-demand item: Embroidered Polo.', 34.99, NULL, 150, NULL, NULL, 1, 0, 1, NULL, '2026-05-06 13:11:19', '2026-05-06 13:11:19'),
(7, 2, 'variable', '[{\"key\":\"color\",\"label\":\"Color\",\"values\":[\"Red\",\"Blue\",\"Black\"]},{\"key\":\"s\",\"label\":\"Size\",\"values\":[\"L\",\"M\",\"S\"]}]', 'test', 'test', NULL, NULL, 10.00, NULL, 10, 'products/RflEI4DYSp6idge9YKJQ4jztZez7C2LcbtqKvFRc.jpg', NULL, 1, 0, 1, NULL, '2026-05-06 15:05:28', '2026-05-06 15:05:28'),
(8, 1, 'variable', '[{\"key\":\"packet\",\"label\":\"Packet\",\"values\":[\"500\",\"1000\",\"5000\"]}]', 'Business Card', 'business-card', NULL, 'Testing New Product', 10.00, NULL, 1200000, 'products/p6rrnrz44IszIfa9YIz9MOggO2n6328Soe5e5DTh.jpg', NULL, 1, 0, 1, NULL, '2026-05-07 11:09:12', '2026-05-07 11:09:13'),
(9, 3, 'variable', '[{\"key\":\"color\",\"label\":\"Color\",\"values\":[\"Red\",\"Green\",\"Blue\"]},{\"key\":\"size\",\"label\":\"Size\",\"values\":[\"S\",\"M\",\"L\",\"XL\",\"XXL\"]}]', 'busines card', 'busines-card', 'BUSINESCARD', NULL, 10.00, NULL, 30, NULL, NULL, 1, 1, 1, '{\"left\":0.08,\"top\":0.1,\"width\":0.84,\"height\":0.8}', '2026-05-07 11:34:01', '2026-05-11 12:54:55');

-- --------------------------------------------------------

--
-- Table structure for table `product_variations`
--

CREATE TABLE `product_variations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `sku` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `compare_at_price` decimal(10,2) DEFAULT NULL,
  `stock_quantity` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `attributes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`attributes`)),
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_variations`
--

INSERT INTO `product_variations` (`id`, `product_id`, `sku`, `price`, `compare_at_price`, `stock_quantity`, `attributes`, `image`, `created_at`, `updated_at`) VALUES
(1, 7, '0001', 10.00, NULL, 10, '{\"color\":\"Red\",\"s\":\"L\"}', NULL, '2026-05-06 15:05:28', '2026-05-06 15:05:28'),
(2, 8, '00012', 10.00, NULL, 100000, '{\"packet\":\"500\"}', NULL, '2026-05-07 11:09:12', '2026-05-07 11:09:12'),
(3, 8, '00013', 50.00, NULL, 100000, '{\"packet\":\"1000\"}', NULL, '2026-05-07 11:09:12', '2026-05-07 11:09:12'),
(4, 8, '00014', 100.00, NULL, 1000000, '{\"packet\":\"5000\"}', NULL, '2026-05-07 11:09:12', '2026-05-07 11:09:12'),
(5, 9, 'BUSINESCARD-1', 10.00, NULL, 10, '{\"color\":\"Red\",\"size\":\"S\"}', 'products/variations/uXJMr7TSslAem2mMfadwmhEW2YJ81zzgUUH3nwTo.jpg', '2026-05-07 11:34:02', '2026-05-07 11:34:02'),
(6, 9, 'BUSINESCARD-2', 20.00, NULL, 10, '{\"color\":\"Green\",\"size\":\"S\"}', 'products/variations/KRkdTqnrWlqzPo3IVfWIBGEWuI5JhxGXuZQCxj5M.png', '2026-05-07 11:34:02', '2026-05-07 11:49:57'),
(7, 9, 'BUSINESCARD-3', 30.00, NULL, 10, '{\"color\":\"Blue\",\"size\":\"S\"}', 'products/variations/wRtTJNhmia2B5UhOM2dw52esUVUQjBo1F20BBskc.jpg', '2026-05-07 11:34:02', '2026-05-07 11:49:57');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('zdHhBhjdgOQiSbJC4wuYQS3RPG99sXO3HdYpkgDp', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', 'YTo3OntzOjY6Il90b2tlbiI7czo0MDoiMEpiUHl6c3pVT0lRTTlKMnVBR09YcmJscWxmazNTaDl2WTVXWVhyWCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Njg6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9wcm9kdWN0cy9idXNpbmVzLWNhcmQvY3VzdG9taXplP3ZhcmlhdGlvbl9pZD01IjtzOjU6InJvdXRlIjtzOjE4OiJwcm9kdWN0cy5jdXN0b21pemUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjM6InVybCI7YTowOnt9czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTtzOjE3OiJndWVzdF9jYXJ0X21lcmdlZCI7YjoxO3M6MjU6InBlbmRpbmdfY2hlY2tvdXRfb3JkZXJfaWQiO2k6NDt9', 1778523116);

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `key` varchar(255) NOT NULL,
  `value` longtext DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `key`, `value`, `created_at`, `updated_at`) VALUES
(1, 'general.site_name', 'Pro Print Contractors', '2026-05-06 14:17:43', '2026-05-06 14:17:43'),
(2, 'general.phone', '+1 (555) 123-4567', '2026-05-06 14:17:44', '2026-05-06 14:17:44'),
(3, 'general.email', 'hello@proprintcontractors.test', '2026-05-06 14:17:44', '2026-05-06 14:17:44'),
(4, 'general.address', '123 Print Lane\r\nContractor City, ST 12345', '2026-05-06 14:17:44', '2026-05-06 14:28:01'),
(5, 'shipping.tax_rate', '0', '2026-05-06 14:17:44', '2026-05-06 14:17:44'),
(6, 'shipping.flat_rate', '9.99', '2026-05-06 14:17:44', '2026-05-06 14:17:44'),
(7, 'shipping.free_shipping_minimum', '', '2026-05-06 14:17:44', '2026-05-06 14:17:44'),
(8, 'shop.currency', 'usd', '2026-05-06 14:17:44', '2026-05-06 14:17:44'),
(9, 'seo.meta_title', 'Pro Print Contractors — Print & Branding', '2026-05-06 14:17:44', '2026-05-06 14:17:44'),
(10, 'seo.meta_description', 'Premium print on demand, branding and digital services for contractors.', '2026-05-06 14:17:44', '2026-05-06 14:17:44'),
(11, 'seo.meta_keywords', 'print, contractors, branding, signage', '2026-05-06 14:17:44', '2026-05-06 14:17:44'),
(12, 'email.welcome.subject', 'Welcome to {{site_name}}', '2026-05-06 14:17:44', '2026-05-06 14:17:44'),
(13, 'email.welcome.body_html', '<p>Hi {{user_name}},</p>\n<p>Thanks for creating an account at <strong>{{site_name}}</strong>.</p>\n<p>If you have questions, reply to this email or reach us at {{support_email}}.</p>\n<p>— {{site_name}}</p>', '2026-05-06 14:17:44', '2026-05-06 14:17:44'),
(14, 'email.password_reset.subject', 'Reset your {{site_name}} password', '2026-05-06 14:17:44', '2026-05-06 14:17:44'),
(15, 'email.password_reset.body_html', '<p>Hi {{user_name}},</p>\n<p>We received a request to reset your password. Click the link below to choose a new password:</p>\n<p><a href=\"{{reset_url}}\">Reset password</a></p>\n<p>If you did not request this, you can ignore this email.</p>\n<p>— {{site_name}}</p>', '2026-05-06 14:17:45', '2026-05-06 14:17:45'),
(16, 'email.order_confirmation.subject', 'Order {{order_number}} confirmed — {{site_name}}', '2026-05-06 14:17:45', '2026-05-06 14:17:45'),
(17, 'email.order_confirmation.body_html', '<p>Hi,</p>\n<p>Thank you for your order <strong>{{order_number}}</strong>.</p>\n<p><strong>Total:</strong> ${{order_total}}</p>\n<h3>Items</h3>\n{{order_items_html}}\n<h3>Ship to</h3>\n<p>{{shipping_address}}</p>\n<p>— {{site_name}}</p>', '2026-05-06 14:17:45', '2026-05-06 14:17:45'),
(18, 'email.order_processing.subject', 'We\'re preparing order {{order_number}}', '2026-05-06 14:17:45', '2026-05-06 14:17:45'),
(19, 'email.order_processing.body_html', '<p>Hi,</p>\n<p>Your order <strong>{{order_number}}</strong> is now being processed.</p>\n<p>Total paid: ${{order_total}}</p>\n<p>— {{site_name}}</p>', '2026-05-06 14:17:45', '2026-05-06 14:17:45'),
(20, 'email.order_shipped.subject', 'Order {{order_number}} has shipped', '2026-05-06 14:17:45', '2026-05-06 14:17:45'),
(21, 'email.order_shipped.body_html', '<p>Hi,</p>\n<p>Good news — order <strong>{{order_number}}</strong> has shipped.</p>\n<p>— {{site_name}}</p>', '2026-05-06 14:17:45', '2026-05-06 14:17:45'),
(22, 'general.social_facebook', '', '2026-05-06 14:28:01', '2026-05-06 14:28:01'),
(23, 'general.social_instagram', '', '2026-05-06 14:28:01', '2026-05-06 14:28:01'),
(24, 'general.social_twitter', '', '2026-05-06 14:28:01', '2026-05-06 14:28:01'),
(25, 'general.social_linkedin', '', '2026-05-06 14:28:01', '2026-05-06 14:28:01'),
(26, 'general.social_youtube', '', '2026-05-06 14:28:01', '2026-05-06 14:28:01'),
(27, 'general.header_logo', 'branding/ZWjktvFo7Y7ede1pTfEDmbsjaPQgJfEIDAflx50F.png', '2026-05-06 14:28:01', '2026-05-06 14:33:55'),
(28, 'general.footer_logo', 'branding/rHqzUsJDPZoxQW1MArRZlTJwnG9MYruoJqtlvTwe.png', '2026-05-06 14:33:39', '2026-05-06 14:33:56'),
(29, 'general.loader_logo', 'branding/wC2AhrUPbO3MJyIp1KuFT2PXG6pn6jjGodAGVtoE.png', '2026-05-06 14:33:47', '2026-05-06 14:33:56'),
(30, 'general.favicon', 'branding/YHrp4RQBynfHcbmptvPAbmLpwudUIkgnS7Igjnji.png', '2026-05-06 14:33:56', '2026-05-06 14:35:10'),
(31, 'payment.stripe_publishable_key', 'pk_test_51Msy7yLXqt7gmBJh4vuDL48V2faAe1J9y0Aq3SG1O6kd2WII3GC0RYEceDyp5Y9ojrldJZnWGwprLnY8tVMKyEEq00CteT32Fy', '2026-05-07 12:40:13', '2026-05-07 12:40:13'),
(32, 'payment.stripe_secret', 'eyJpdiI6IjlTbW1pdEtIYTJQbGNvWWJGNTJhTHc9PSIsInZhbHVlIjoiTFVWRlFtNEVEdlhzM3ExTFBzVnQ4NklrdjN3VmtLa3NrR0hVV0ZaYWtQMG5MU1ozN1pTK0dnSWZ6SlBRZHRDVFZCc0VlL3QvYXU4WlV5eDJENTh4S3YrcHB4a0hieEwwUitNUzVsemUzdG85akhEUm5uR0R1a0FheFZEbEIzOGo2MU4zOHVGd2JOdDBNOVE5ekM4YXpnPT0iLCJtYWMiOiI4MmY1YWVmZjZjNTYzZjM1NTg4ZTQ0ODU3N2U3NDBiOTJkNWVjMTM0MjM1MmQ1NjllNjliNzEwNWJjYTc4YzQwIiwidGFnIjoiIn0=', '2026-05-07 12:40:14', '2026-05-07 12:40:14'),
(33, 'payment.paypal_client_id', '', '2026-05-07 12:40:14', '2026-05-07 12:40:14'),
(34, 'payment.paypal_mode', 'sandbox', '2026-05-07 12:40:14', '2026-05-07 12:40:14'),
(35, 'payment.paypal_enabled', '1', '2026-05-07 12:40:14', '2026-05-07 12:40:14');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT 0,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `is_admin`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Administrator', 'admin@proprintcontractors.test', '2026-05-06 13:11:17', '$2y$12$kzPUCFVAEZQ34PGoh5z9T.m4rbEEN43jknNT/kknQmW85YbxmhfmW', 1, 'lA8MRMWNCCGvvtj2YQsBALdVBqRGjUsCF23CoNBOpP9Q8V4nokdjJ2CUjg4c', '2026-05-06 13:11:17', '2026-05-06 13:11:17'),
(2, 'Demo Customer', 'customer@proprintcontractors.test', '2026-05-06 13:11:17', '$2y$12$kzPUCFVAEZQ34PGoh5z9T.m4rbEEN43jknNT/kknQmW85YbxmhfmW', 0, 'UkRxHrxkiAZ1YlK39HDQxqYUkDLOcrC7vvbxDHB8Qf4AZYeOu2JhJiy33nxP', '2026-05-06 13:11:17', '2026-05-06 13:11:17');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cart_items_product_id_foreign` (`product_id`),
  ADD KEY `cart_items_user_id_product_id_index` (`user_id`,`product_id`),
  ADD KEY `cart_items_session_id_product_id_index` (`session_id`,`product_id`),
  ADD KEY `cart_items_session_id_index` (`session_id`),
  ADD KEY `cart_items_product_variation_id_foreign` (`product_variation_id`),
  ADD KEY `cart_items_customization_checksum_index` (`customization_checksum`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `categories_slug_unique` (`slug`);

--
-- Indexes for table `coupons`
--
ALTER TABLE `coupons`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `coupons_code_unique` (`code`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `orders_order_number_unique` (`order_number`),
  ADD KEY `orders_user_id_foreign` (`user_id`),
  ADD KEY `orders_coupon_id_foreign` (`coupon_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_items_order_id_foreign` (`order_id`),
  ADD KEY `order_items_product_id_foreign` (`product_id`),
  ADD KEY `order_items_product_variation_id_foreign` (`product_variation_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `products_slug_unique` (`slug`),
  ADD UNIQUE KEY `products_sku_unique` (`sku`),
  ADD KEY `products_category_id_foreign` (`category_id`);

--
-- Indexes for table `product_variations`
--
ALTER TABLE `product_variations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `product_variations_sku_unique` (`sku`),
  ADD KEY `product_variations_product_id_foreign` (`product_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `settings_key_unique` (`key`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `coupons`
--
ALTER TABLE `coupons`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `product_variations`
--
ALTER TABLE `product_variations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_items_product_variation_id_foreign` FOREIGN KEY (`product_variation_id`) REFERENCES `product_variations` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `cart_items_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_coupon_id_foreign` FOREIGN KEY (`coupon_id`) REFERENCES `coupons` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `order_items_product_variation_id_foreign` FOREIGN KEY (`product_variation_id`) REFERENCES `product_variations` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_variations`
--
ALTER TABLE `product_variations`
  ADD CONSTRAINT `product_variations_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
