-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 02, 2026 at 06:08 PM
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
('pro-print-contractors-cache-356a192b7913b04c54574d18c28d46e6395428ab', 'i:1;', 1780415866),
('pro-print-contractors-cache-356a192b7913b04c54574d18c28d46e6395428ab:timer', 'i:1780415866;', 1780415866),
('pro-print-contractors-cache-5c785c036466adea360111aa28563bfd556b5fba', 'i:2;', 1778690444),
('pro-print-contractors-cache-5c785c036466adea360111aa28563bfd556b5fba:timer', 'i:1778690444;', 1778690444),
('pro-print-contractors-cache-admin@exs.test|127.0.0.1', 'i:1;', 1780072896),
('pro-print-contractors-cache-admin@exs.test|127.0.0.1:timer', 'i:1780072896;', 1780072896);

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
(9, NULL, 'luSeSf92wLs9rYfLfibI2zdLoubEPTGLanjoIwre', 7, 1, 1, '{\"product_id\":7,\"fabric\":{\"version\":\"7.3.1\",\"objects\":[{\"cropX\":0,\"cropY\":0,\"type\":\"Image\",\"version\":\"7.3.1\",\"originX\":\"center\",\"originY\":\"center\",\"left\":440,\"top\":320,\"width\":1702,\"height\":501,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":0,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1.2774,\"scaleY\":1.2774,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"src\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/products\\/RflEI4DYSp6idge9YKJQ4jztZez7C2LcbtqKvFRc.jpg\",\"crossOrigin\":\"anonymous\",\"filters\":[]},{\"rx\":0,\"ry\":0,\"type\":\"Rect\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":70.4,\"top\":64,\"width\":739.2,\"height\":512,\"fill\":\"transparent\",\"stroke\":\"rgba(249,115,22,0.9)\",\"strokeWidth\":2,\"strokeDashArray\":[8,6],\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1,\"scaleY\":1,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0},{\"fontSize\":32,\"fontWeight\":\"600\",\"fontFamily\":\"Inter, system-ui, sans-serif\",\"fontStyle\":\"italic\",\"lineHeight\":1.16,\"text\":\"Your text\",\"charSpacing\":0,\"textAlign\":\"left\",\"styles\":[],\"pathStartOffset\":0,\"pathSide\":\"left\",\"pathAlign\":\"baseline\",\"underline\":false,\"overline\":false,\"linethrough\":false,\"textBackgroundColor\":null,\"direction\":\"ltr\",\"textDecorationThickness\":66.667,\"type\":\"IText\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":234,\"top\":204.2111,\"width\":138.7656,\"height\":36.16,\"fill\":\"#ffffff\",\"stroke\":null,\"strokeWidth\":1,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":2.6536,\"scaleY\":4.8651,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":{\"color\":\"rgba(0,0,0,.35)\",\"blur\":6,\"offsetX\":2,\"offsetY\":3,\"affectStroke\":false,\"nonScaling\":false,\"type\":\"shadow\"},\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0},{\"cropX\":0,\"cropY\":0,\"type\":\"Image\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":199.2799,\"top\":382.8146,\"width\":1702,\"height\":501,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":0,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":0.2518,\"scaleY\":0.2518,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"src\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/customizations\\/uploads\\/2026\\/05\\/bbSwG0jFzKBWkHJO05uJNWbTuqqIHBi0SyntNfZ7.jpg\",\"crossOrigin\":\"anonymous\",\"filters\":[]}]},\"canvas_width\":880,\"canvas_height\":640,\"variation_id\":1,\"saved_at\":\"2026-05-11T16:51:26+00:00\"}', 'customizations/previews/2026/05/j9hig41bfqjzqeu4ziidlquhzuiurgeycsy7afcj.png', 'd82f217041c52abce1687fa091e9be63940803637962cb98a7ff73d58b9fbf57', '2026-05-11 11:51:26', '2026-05-11 11:51:26'),
(16, NULL, 'U38hJC0Q2jzVO8dGgFhi6ie8LytFnIkKOBsUNmWb', 7, 1, 1, '{\"product_id\":7,\"fabric\":{\"version\":\"7.3.1\",\"objects\":[{\"cropX\":0,\"cropY\":0,\"type\":\"Image\",\"version\":\"7.3.1\",\"originX\":\"center\",\"originY\":\"center\",\"left\":440,\"top\":320,\"width\":1702,\"height\":501,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":0,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1.2774,\"scaleY\":1.2774,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"src\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/products\\/RflEI4DYSp6idge9YKJQ4jztZez7C2LcbtqKvFRc.jpg\",\"crossOrigin\":\"anonymous\",\"filters\":[]},{\"rx\":0,\"ry\":0,\"type\":\"Rect\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":70.4,\"top\":64,\"width\":739.2,\"height\":512,\"fill\":\"transparent\",\"stroke\":\"rgba(249,115,22,0.9)\",\"strokeWidth\":2,\"strokeDashArray\":[8,6],\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1,\"scaleY\":1,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0},{\"cropX\":0,\"cropY\":0,\"type\":\"Image\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":273.68,\"top\":203.576,\"width\":700,\"height\":490,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":0,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":0.4752,\"scaleY\":0.4752,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"src\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/customizations\\/uploads\\/2026\\/05\\/vf2rgNNZ1ufRgGFALyd8NesffMf95bJnZyTAXHpI.jpg\",\"crossOrigin\":\"anonymous\",\"filters\":[]}]},\"canvas_width\":880,\"canvas_height\":640,\"variation_id\":1,\"saved_at\":\"2026-05-13T00:01:30+00:00\"}', 'customizations/previews/2026/05/pczigo5kmeuknvs8vq9jcpx8ngctgst8mmyp2old.png', '34b228469750ff074f7f30939ba6235f266fef6de5999382d6a7fe4cfdd09714', '2026-05-12 19:01:30', '2026-05-12 19:01:30'),
(17, NULL, 'U38hJC0Q2jzVO8dGgFhi6ie8LytFnIkKOBsUNmWb', 7, 1, 1, '{\"product_id\":7,\"fabric\":{\"version\":\"7.3.1\",\"objects\":[{\"cropX\":0,\"cropY\":0,\"type\":\"Image\",\"version\":\"7.3.1\",\"originX\":\"center\",\"originY\":\"center\",\"left\":440,\"top\":320,\"width\":1702,\"height\":501,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":0,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1.2774,\"scaleY\":1.2774,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"src\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/products\\/RflEI4DYSp6idge9YKJQ4jztZez7C2LcbtqKvFRc.jpg\",\"crossOrigin\":\"anonymous\",\"filters\":[]},{\"rx\":0,\"ry\":0,\"type\":\"Rect\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":70.4,\"top\":64,\"width\":739.2,\"height\":512,\"fill\":\"transparent\",\"stroke\":\"rgba(249,115,22,0.9)\",\"strokeWidth\":2,\"strokeDashArray\":[8,6],\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1,\"scaleY\":1,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0},{\"cropX\":0,\"cropY\":0,\"type\":\"Image\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":273.68,\"top\":203.576,\"width\":700,\"height\":490,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":0,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":0.4752,\"scaleY\":0.4752,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"src\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/customizations\\/uploads\\/2026\\/05\\/2pqMfLqHRM2cWwRlYTHcBm8FyYX5m11GgXItoveP.jpg\",\"crossOrigin\":\"anonymous\",\"filters\":[]}]},\"canvas_width\":880,\"canvas_height\":640,\"variation_id\":1,\"saved_at\":\"2026-05-13T00:05:15+00:00\"}', 'customizations/previews/2026/05/puumbr2rcfqydgnmlzlzltvxml0tklifq44stpkb.png', '247597d7c40c2cbd92a45b2d0a52f489f37599196f8c03bd751e072f7cbea1fa', '2026-05-12 19:05:15', '2026-05-12 19:05:15'),
(18, NULL, 'U38hJC0Q2jzVO8dGgFhi6ie8LytFnIkKOBsUNmWb', 7, 1, 1, '{\"product_id\":7,\"fabric\":{\"version\":\"7.3.1\",\"objects\":[{\"cropX\":0,\"cropY\":0,\"type\":\"Image\",\"version\":\"7.3.1\",\"originX\":\"center\",\"originY\":\"center\",\"left\":440,\"top\":320,\"width\":1702,\"height\":501,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":0,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1.2774,\"scaleY\":1.2774,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"src\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/products\\/RflEI4DYSp6idge9YKJQ4jztZez7C2LcbtqKvFRc.jpg\",\"crossOrigin\":\"anonymous\",\"filters\":[]},{\"rx\":0,\"ry\":0,\"type\":\"Rect\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":70.4,\"top\":64,\"width\":739.2,\"height\":512,\"fill\":\"transparent\",\"stroke\":\"rgba(249,115,22,0.9)\",\"strokeWidth\":2,\"strokeDashArray\":[8,6],\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1,\"scaleY\":1,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0},{\"cropX\":0,\"cropY\":0,\"type\":\"Image\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":273.68,\"top\":271.0421,\"width\":1702,\"height\":501,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":0,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":0.1954,\"scaleY\":0.1954,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"src\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/customizations\\/uploads\\/2026\\/05\\/d3eEwkk8FaVn6a6Ta4zoi7q9NkX0TW11mfhsJ0Ok.jpg\",\"crossOrigin\":\"anonymous\",\"filters\":[]}]},\"canvas_width\":880,\"canvas_height\":640,\"variation_id\":1,\"saved_at\":\"2026-05-13T00:07:30+00:00\"}', 'customizations/previews/2026/05/tdypmtw7atu1q0htvrjqtjmlhs9bujt0ztc4761o.png', 'fcc50cba36070005195f0ab04ab5de01ffb29e444c200ce59de11adca353b307', '2026-05-12 19:07:30', '2026-05-12 19:07:30'),
(19, NULL, 'U38hJC0Q2jzVO8dGgFhi6ie8LytFnIkKOBsUNmWb', 7, 1, 1, '{\"product_id\":7,\"fabric\":{\"version\":\"7.3.1\",\"objects\":[{\"cropX\":0,\"cropY\":0,\"type\":\"Image\",\"version\":\"7.3.1\",\"originX\":\"center\",\"originY\":\"center\",\"left\":440,\"top\":320,\"width\":1702,\"height\":501,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":0,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1.2774,\"scaleY\":1.2774,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"src\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/products\\/RflEI4DYSp6idge9YKJQ4jztZez7C2LcbtqKvFRc.jpg\",\"crossOrigin\":\"anonymous\",\"filters\":[]},{\"rx\":0,\"ry\":0,\"type\":\"Rect\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":70.4,\"top\":64,\"width\":739.2,\"height\":512,\"fill\":\"transparent\",\"stroke\":\"rgba(249,115,22,0.9)\",\"strokeWidth\":2,\"strokeDashArray\":[8,6],\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1,\"scaleY\":1,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0},{\"cropX\":0,\"cropY\":0,\"type\":\"Image\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":273.68,\"top\":203.576,\"width\":700,\"height\":490,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":0,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":0.4752,\"scaleY\":0.4752,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"src\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/customizations\\/uploads\\/2026\\/05\\/kCZ26lTbMFm7IGbREcZax6QRTqIELM0nf4cEsZ3P.jpg\",\"crossOrigin\":\"anonymous\",\"filters\":[]}]},\"canvas_width\":880,\"canvas_height\":640,\"variation_id\":1,\"saved_at\":\"2026-05-13T00:09:24+00:00\"}', 'customizations/previews/2026/05/uxlp8r8ewscrviom4sbyamoz03hobnawpxlcppi2.png', '9c0115f0d84dde8cc7778dcdac2e1be43d4b50098e2e3d3bdd53c01330fda659', '2026-05-12 19:09:24', '2026-05-12 19:09:24'),
(20, NULL, 'U38hJC0Q2jzVO8dGgFhi6ie8LytFnIkKOBsUNmWb', 7, 1, 1, '{\"product_id\":7,\"fabric\":{\"version\":\"7.3.1\",\"objects\":[{\"cropX\":0,\"cropY\":0,\"type\":\"Image\",\"version\":\"7.3.1\",\"originX\":\"center\",\"originY\":\"center\",\"left\":440,\"top\":320,\"width\":1702,\"height\":501,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":0,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1.2774,\"scaleY\":1.2774,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"src\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/products\\/RflEI4DYSp6idge9YKJQ4jztZez7C2LcbtqKvFRc.jpg\",\"crossOrigin\":\"anonymous\",\"filters\":[]},{\"rx\":0,\"ry\":0,\"type\":\"Rect\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":70.4,\"top\":64,\"width\":739.2,\"height\":512,\"fill\":\"transparent\",\"stroke\":\"rgba(249,115,22,0.9)\",\"strokeWidth\":2,\"strokeDashArray\":[8,6],\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1,\"scaleY\":1,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0},{\"cropX\":0,\"cropY\":0,\"type\":\"Image\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":273.68,\"top\":203.576,\"width\":700,\"height\":490,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":0,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":0.4752,\"scaleY\":0.4752,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"src\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/customizations\\/uploads\\/2026\\/05\\/7ZKoc2R3WVdW5XcjONgUI5jRsnIHhRGwfzPE4MM0.jpg\",\"crossOrigin\":\"anonymous\",\"filters\":[]}]},\"canvas_width\":880,\"canvas_height\":640,\"variation_id\":1,\"saved_at\":\"2026-05-13T00:10:49+00:00\"}', 'customizations/previews/2026/05/jb46jd7dzyxkfltgzm6ebuakjay3v0znozbfh8ym.png', 'ed817465d80e418eaa27b3b4c434d80d07a9ac1aa599ddf88267d2c88872c5e7', '2026-05-12 19:10:49', '2026-05-12 19:10:49'),
(21, NULL, 'U38hJC0Q2jzVO8dGgFhi6ie8LytFnIkKOBsUNmWb', 7, 1, 1, '{\"product_id\":7,\"fabric\":{\"version\":\"7.3.1\",\"objects\":[{\"cropX\":0,\"cropY\":0,\"type\":\"Image\",\"version\":\"7.3.1\",\"originX\":\"center\",\"originY\":\"center\",\"left\":440,\"top\":320,\"width\":1702,\"height\":501,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":0,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1.2774,\"scaleY\":1.2774,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"src\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/products\\/RflEI4DYSp6idge9YKJQ4jztZez7C2LcbtqKvFRc.jpg\",\"crossOrigin\":\"anonymous\",\"filters\":[]},{\"rx\":0,\"ry\":0,\"type\":\"Rect\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":70.4,\"top\":64,\"width\":739.2,\"height\":512,\"fill\":\"transparent\",\"stroke\":\"rgba(249,115,22,0.9)\",\"strokeWidth\":2,\"strokeDashArray\":[8,6],\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1,\"scaleY\":1,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0},{\"cropX\":0,\"cropY\":0,\"type\":\"Image\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":273.68,\"top\":203.576,\"width\":700,\"height\":490,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":0,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":0.4752,\"scaleY\":0.4752,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"src\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/customizations\\/uploads\\/2026\\/05\\/bl4008mr3CfmVAA8qrGIBRf69SYbqQavlYInaFE7.jpg\",\"crossOrigin\":\"anonymous\",\"filters\":[]}]},\"canvas_width\":880,\"canvas_height\":640,\"variation_id\":1,\"saved_at\":\"2026-05-13T00:12:04+00:00\"}', 'customizations/previews/2026/05/pktpqhumpr85ce9fon4gqxbvtnsxpa1ts39e3yze.png', '472cbb204e999046ab2623e3e6a093aeb878505c1c347f2b3d2d27fd95e8b8bd', '2026-05-12 19:12:04', '2026-05-12 19:12:04'),
(22, NULL, 'U38hJC0Q2jzVO8dGgFhi6ie8LytFnIkKOBsUNmWb', 7, 1, 1, '{\"product_id\":7,\"fabric\":{\"version\":\"7.3.1\",\"objects\":[{\"cropX\":0,\"cropY\":0,\"type\":\"Image\",\"version\":\"7.3.1\",\"originX\":\"center\",\"originY\":\"center\",\"left\":440,\"top\":320,\"width\":1702,\"height\":501,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":0,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1.2774,\"scaleY\":1.2774,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"src\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/products\\/RflEI4DYSp6idge9YKJQ4jztZez7C2LcbtqKvFRc.jpg\",\"crossOrigin\":\"anonymous\",\"filters\":[]},{\"rx\":0,\"ry\":0,\"type\":\"Rect\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":70.4,\"top\":64,\"width\":739.2,\"height\":512,\"fill\":\"transparent\",\"stroke\":\"rgba(249,115,22,0.9)\",\"strokeWidth\":2,\"strokeDashArray\":[8,6],\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1,\"scaleY\":1,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0},{\"cropX\":0,\"cropY\":0,\"type\":\"Image\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":273.68,\"top\":-49.707,\"width\":691,\"height\":1536,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":0,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":0.4814,\"scaleY\":0.4814,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"src\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/customizations\\/uploads\\/2026\\/05\\/RsB6PvTE2ybFI7qHGy4R5jbqGwb091OyHCXsLtXE.jpg\",\"crossOrigin\":\"anonymous\",\"filters\":[]}]},\"canvas_width\":880,\"canvas_height\":640,\"variation_id\":1,\"saved_at\":\"2026-05-13T00:13:57+00:00\"}', 'customizations/previews/2026/05/827titzbjzwwzpjbuvn5ogptm50rgjoeykllaivr.png', 'd512c47b6684fa6d14b30e38d3e18c5c651cdc927017280cc070cf09dd12e27c', '2026-05-12 19:13:57', '2026-05-12 19:13:57'),
(23, NULL, 'U38hJC0Q2jzVO8dGgFhi6ie8LytFnIkKOBsUNmWb', 7, 1, 1, '{\"product_id\":7,\"fabric\":{\"version\":\"7.3.1\",\"objects\":[{\"cropX\":0,\"cropY\":0,\"type\":\"Image\",\"version\":\"7.3.1\",\"originX\":\"center\",\"originY\":\"center\",\"left\":440,\"top\":320,\"width\":1702,\"height\":501,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":0,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1.2774,\"scaleY\":1.2774,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"src\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/products\\/RflEI4DYSp6idge9YKJQ4jztZez7C2LcbtqKvFRc.jpg\",\"crossOrigin\":\"anonymous\",\"filters\":[]},{\"rx\":0,\"ry\":0,\"type\":\"Rect\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":70.4,\"top\":64,\"width\":739.2,\"height\":512,\"fill\":\"transparent\",\"stroke\":\"rgba(249,115,22,0.9)\",\"strokeWidth\":2,\"strokeDashArray\":[8,6],\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1,\"scaleY\":1,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0},{\"cropX\":0,\"cropY\":0,\"type\":\"Image\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":273.68,\"top\":203.576,\"width\":700,\"height\":490,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":0,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":0.4752,\"scaleY\":0.4752,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"src\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/customizations\\/uploads\\/2026\\/05\\/CSAVn6QZ7CIrxpOdx1A1ZqYvo4Bhc7z2mP4gRpBC.jpg\",\"crossOrigin\":\"anonymous\",\"filters\":[]}]},\"canvas_width\":880,\"canvas_height\":640,\"variation_id\":1,\"saved_at\":\"2026-05-13T00:15:43+00:00\"}', 'customizations/previews/2026/05/ig0bhhliclkgotqmua7w34gn4imovgoh5n0gbfsz.png', '7c1c1ecd46286bc267b8c51608ead034cd3d8539c71d1c87321c4d44598c5e9b', '2026-05-12 19:15:43', '2026-05-12 19:15:43'),
(30, NULL, 'CSOTD0w8wSnsBFaiQ5QRlWj1tnvQ5CPnki5l343i', 7, 1, 1, NULL, NULL, NULL, '2026-05-29 11:36:11', '2026-05-29 11:36:11');

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
(1, 'Business Cards', 'business-cards', NULL, NULL, 0, 1, '2026-05-06 13:11:17', '2026-05-19 11:47:02'),
(2, 'Signage', 'signage', NULL, NULL, 1, 2, '2026-05-06 13:11:18', '2026-05-06 13:11:18'),
(3, 'Apparel', 'apparel', NULL, 'categories/CFCKGQOSUKLrnROfI8SLSe99bh1EgSxlc75HXUJr.jpg', 1, 3, '2026-05-06 13:11:18', '2026-05-11 12:44:14'),
(4, 'Stationery', 'stationery', NULL, 'categories/7xc2su9WbARZv41sDb8hN71je9cF7mDO2j4P38to.png', 1, 0, '2026-05-11 12:35:41', '2026-05-11 12:35:41');

-- --------------------------------------------------------

--
-- Table structure for table `contact_messages`
--

CREATE TABLE `contact_messages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contact_messages`
--

INSERT INTO `contact_messages` (`id`, `name`, `email`, `subject`, `message`, `is_read`, `created_at`, `updated_at`) VALUES
(1, 'Production Head', 'production8430@gmail.com', 'test', 'Testing', 1, '2026-06-02 10:56:46', '2026-06-02 10:57:28');

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
(21, '2026_05_11_140000_add_is_featured_to_products_table', 12),
(22, '2026_05_29_120000_create_service_tables', 13),
(23, '2026_05_29_140000_add_back_image_to_products_table', 14),
(24, '2026_05_29_150000_add_back_image_to_product_variations_table', 15),
(25, '2026_05_29_160000_add_brief_json_to_service_bookings_table', 16),
(26, '2026_06_02_120000_create_contact_messages_table', 17);

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
(4, 'ORD-18774D4C-180855', 1, NULL, 'pending', 40.00, 0.00, 9.99, 49.99, 0.00, 'unpaid', 'cs_test_a1EW9xNzMIgMJi1q44tPBXCCwCRszYlleqqBYwcUZxsyJeKGtQdCBi4DWE', 'Xanthus Griffith', 'zusuto@mailinator.com', '+1 (988) 349-4185', '737 Cowley Road', 'Quibusdam ut pariatu', 'Excepturi voluptates', 'Consequatur ipsa v', '46187', 'FR', 'Xanthus Griffith', '+1 (988) 349-4185', '737 Cowley Road', 'Quibusdam ut pariatu', 'Excepturi voluptates', 'Consequatur ipsa v', '46187', 'FR', 'Consequatur enim und', '2026-05-11 13:08:55', NULL, '2026-05-11 13:08:55', '2026-05-11 13:10:12'),
(5, 'ORD-9F585D32-164147', NULL, NULL, 'awaiting_payment', 110.00, 0.00, 9.99, 119.99, 0.00, 'unpaid', 'cs_test_a1gIOdRXhIYQ17mBWz0jIR5AMdztca3zwMvDhopow9De0SFl35K3I191UB', 'Quail Clemons', 'hohuqepih@mailinator.com', '+1 (118) 225-9668', '54 Hague Lane', 'Accusamus sint digni', 'Magnam laboriosam m', 'Est culpa in maiore', '13107', 'CH', 'Quail Clemons', '+1 (118) 225-9668', '54 Hague Lane', 'Accusamus sint digni', 'Magnam laboriosam m', 'Est culpa in maiore', '13107', 'CH', 'Qui vel illo possimu', '2026-05-13 11:41:47', NULL, '2026-05-13 11:41:47', '2026-05-13 11:41:54'),
(6, 'ORD-203C25DB-172527', 1, NULL, 'awaiting_payment', 10.00, 0.00, 9.99, 19.99, 0.00, 'unpaid', 'cs_test_a1QvtImy7v5NoKkgEkGdCInHIsxxDeCPm7pxgbMfY8idsCHQbyWH5S4M1F', 'Cooper Kline', 'waqahyq@mailinator.com', '+1 (756) 139-7764', '231 Oak Avenue', 'Ad mollit aut labore', 'Corrupti sit tempor', 'Atque voluptatem Qu', '24492', 'PL', 'Cooper Kline', '+1 (756) 139-7764', '231 Oak Avenue', 'Ad mollit aut labore', 'Corrupti sit tempor', 'Atque voluptatem Qu', '24492', 'PL', 'Incididunt non ex du', '2026-05-13 12:25:27', NULL, '2026-05-13 12:25:27', '2026-05-13 12:25:32'),
(7, 'ORD-71C0759F-173320', 1, NULL, 'pending', 10.00, 0.00, 9.99, 19.99, 0.00, 'paid', 'cs_test_a1kPzhG7mPwrGbwf02q3R4L0pUzeaTlX4U4Zk9IAQOerwVp3jXH4WgB6JI', 'Beatrice Cash', 'hatewaw@mailinator.com', '+1 (536) 576-8705', '322 Nobel Boulevard', 'Est ipsam expedita', 'Excepteur quaerat nu', 'Ullamco nostrum dolo', '49153', 'IE', 'Production Head', NULL, 'Dha street no 35b', NULL, 'karachi', NULL, '123313', 'NL', 'Voluptatum officia m', '2026-05-13 12:33:20', '2026-05-13 12:34:07', '2026-05-13 12:33:20', '2026-05-13 12:34:07'),
(8, 'ORD-5798DF02-165933', 1, NULL, 'pending', 10.00, 0.00, 9.99, 19.99, 0.00, 'not_required', NULL, 'Melinda Sharpe', 'manikotup@mailinator.com', '+1 (548) 451-9118', '115 Green New Lane', 'Tempora reiciendis o', 'Deserunt maiores in', 'Accusamus tempora qu', '67869', 'AU', 'Melinda Sharpe', '+1 (548) 451-9118', '115 Green New Lane', 'Tempora reiciendis o', 'Deserunt maiores in', 'Accusamus tempora qu', '67869', 'AU', 'Soluta ab labore dis', '2026-05-29 11:59:33', NULL, '2026-05-29 11:59:33', '2026-05-29 11:59:33'),
(9, 'ORD-EBCD9504-202047', 1, NULL, 'pending', 10.00, 0.00, 9.99, 19.99, 0.00, 'not_required', NULL, 'Russell Vinson', 'rykatagi@mailinator.com', '+1 (244) 623-4694', '847 Oak Street', 'Reprehenderit dolor', 'Alias temporibus con', 'In cillum voluptates', '95459', 'GB', 'Russell Vinson', '+1 (244) 623-4694', '847 Oak Street', 'Reprehenderit dolor', 'Alias temporibus con', 'In cillum voluptates', '95459', 'GB', 'Consectetur aut temp', '2026-05-29 15:20:47', NULL, '2026-05-29 15:20:47', '2026-05-29 15:20:47');

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
(11, 4, 9, 5, 'busines card', 'BUSINESCARD-1', '{\"Color\":\"Red\",\"Size\":\"S\"}', 10.00, 1, 10.00, '{\"product_id\":9,\"fabric\":{\"version\":\"7.3.1\",\"objects\":[{\"cropX\":0,\"cropY\":0,\"type\":\"Image\",\"version\":\"7.3.1\",\"originX\":\"center\",\"originY\":\"center\",\"left\":440,\"top\":320,\"width\":691,\"height\":1536,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":0,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1.2735,\"scaleY\":1.2735,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"src\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/products\\/variations\\/uXJMr7TSslAem2mMfadwmhEW2YJ81zzgUUH3nwTo.jpg\",\"crossOrigin\":\"anonymous\",\"filters\":[]},{\"rx\":0,\"ry\":0,\"type\":\"Rect\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":70.4,\"top\":64,\"width\":739.2,\"height\":512,\"fill\":\"transparent\",\"stroke\":\"rgba(249,115,22,0.9)\",\"strokeWidth\":2,\"strokeDashArray\":[8,6],\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1,\"scaleY\":1,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0},{\"cropX\":0,\"cropY\":0,\"type\":\"Image\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":81.68,\"top\":89.976,\"width\":700,\"height\":490,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":0,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":0.3954,\"scaleY\":0.3954,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"src\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/customizations\\/uploads\\/2026\\/05\\/drIYTaGGNhSElSKukTjcemBxJQqNS5DJ2vV3Vcol.jpg\",\"crossOrigin\":\"anonymous\",\"filters\":[]},{\"fontSize\":32,\"fontWeight\":\"normal\",\"fontFamily\":\"Inter, system-ui, sans-serif\",\"fontStyle\":\"normal\",\"lineHeight\":1.16,\"text\":\"Raaja AHsan\",\"charSpacing\":1,\"textAlign\":\"center\",\"styles\":[],\"pathStartOffset\":0,\"pathSide\":\"left\",\"pathAlign\":\"baseline\",\"underline\":false,\"overline\":false,\"linethrough\":false,\"textBackgroundColor\":null,\"direction\":\"ltr\",\"textDecorationThickness\":66.667,\"type\":\"IText\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":229.6,\"top\":197.4736,\"width\":191.0388,\"height\":36.16,\"fill\":\"#e524d5\",\"stroke\":null,\"strokeWidth\":1,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1.5631,\"scaleY\":1.5631,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0},{\"fontSize\":32,\"fontWeight\":\"normal\",\"fontFamily\":\"Inter, system-ui, sans-serif\",\"fontStyle\":\"normal\",\"lineHeight\":1.16,\"text\":\"Raaja AHsan\",\"charSpacing\":1,\"textAlign\":\"center\",\"styles\":[],\"pathStartOffset\":0,\"pathSide\":\"left\",\"pathAlign\":\"baseline\",\"underline\":false,\"overline\":false,\"linethrough\":false,\"textBackgroundColor\":null,\"direction\":\"ltr\",\"textDecorationThickness\":66.667,\"type\":\"IText\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":299.6,\"top\":311.4736,\"width\":191.0388,\"height\":36.16,\"fill\":\"#e524d5\",\"stroke\":null,\"strokeWidth\":1,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1.5631,\"scaleY\":1.5631,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0},{\"cropX\":0,\"cropY\":0,\"type\":\"Image\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":530.08,\"top\":269.576,\"width\":700,\"height\":490,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":0,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":0.3954,\"scaleY\":0.3954,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"src\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/customizations\\/uploads\\/2026\\/05\\/drIYTaGGNhSElSKukTjcemBxJQqNS5DJ2vV3Vcol.jpg\",\"crossOrigin\":\"anonymous\",\"filters\":[]}]},\"canvas_width\":880,\"canvas_height\":640,\"variation_id\":5,\"saved_at\":\"2026-05-11T18:08:09+00:00\"}', 'customizations/previews/2026/05/fsev7pb2avh0n4fy7kwbws9aludjq3v50wx39nba.png', '[\"customizations\\/uploads\\/2026\\/05\\/drIYTaGGNhSElSKukTjcemBxJQqNS5DJ2vV3Vcol.jpg\"]', '2026-05-11 13:08:56', '2026-05-11 13:08:56'),
(12, 5, 7, 1, 'test', '0001', '{\"Color\":\"Red\",\"Size\":\"L\"}', 10.00, 1, 10.00, '{\"product_id\":7,\"fabric\":{\"version\":\"7.3.1\",\"objects\":[{\"cropX\":0,\"cropY\":0,\"type\":\"Image\",\"version\":\"7.3.1\",\"originX\":\"center\",\"originY\":\"center\",\"left\":440,\"top\":320,\"width\":1702,\"height\":501,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":0,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1.2774,\"scaleY\":1.2774,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"src\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/products\\/RflEI4DYSp6idge9YKJQ4jztZez7C2LcbtqKvFRc.jpg\",\"crossOrigin\":\"anonymous\",\"filters\":[]},{\"rx\":0,\"ry\":0,\"type\":\"Rect\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":70.4,\"top\":64,\"width\":739.2,\"height\":512,\"fill\":\"transparent\",\"stroke\":\"rgba(249,115,22,0.9)\",\"strokeWidth\":2,\"strokeDashArray\":[8,6],\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1,\"scaleY\":1,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0},{\"cropX\":0,\"cropY\":0,\"type\":\"Image\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":292.88,\"top\":271.1001,\"width\":512,\"height\":512,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":0,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":0.3829,\"scaleY\":0.3829,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"src\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/customizations\\/uploads\\/2026\\/05\\/tGpim3kNvUZNbVLx1DHUwrfbM7pPZ2YUuoRteBKp.png\",\"crossOrigin\":\"anonymous\",\"filters\":[]}]},\"canvas_width\":880,\"canvas_height\":640,\"variation_id\":1,\"saved_at\":\"2026-05-13T16:40:51+00:00\"}', 'customizations/previews/2026/05/unktwv45j5tsseex7mi9dmcrdvr6obemiitnjyap.png', '[\"customizations\\/uploads\\/2026\\/05\\/tGpim3kNvUZNbVLx1DHUwrfbM7pPZ2YUuoRteBKp.png\"]', '2026-05-13 11:41:47', '2026-05-13 11:41:47'),
(13, 5, 8, 3, 'Business Card', '00013', '{\"Packet\":\"1000\"}', 50.00, 2, 100.00, NULL, NULL, NULL, '2026-05-13 11:41:47', '2026-05-13 11:41:47'),
(14, 6, 7, 1, 'test', '0001', '{\"Color\":\"Red\",\"Size\":\"L\"}', 10.00, 1, 10.00, NULL, NULL, NULL, '2026-05-13 12:25:28', '2026-05-13 12:25:28'),
(15, 7, 7, 1, 'test', '0001', '{\"Color\":\"Red\",\"Size\":\"L\"}', 10.00, 1, 10.00, NULL, NULL, NULL, '2026-05-13 12:33:21', '2026-05-13 12:33:21'),
(16, 8, 9, 5, 'busines card', 'BUSINESCARD-1', '{\"Color\":\"Red\",\"Size\":\"S\"}', 10.00, 1, 10.00, NULL, NULL, NULL, '2026-05-29 11:59:33', '2026-05-29 11:59:33'),
(17, 9, 9, 5, 'busines card', 'BUSINESCARD-1', '{\"Color\":\"Red\",\"Size\":\"S\"}', 10.00, 1, 10.00, '{\"product_id\":9,\"fabric\":{\"version\":\"7.3.1\",\"objects\":[{\"cropX\":0,\"cropY\":0,\"type\":\"Image\",\"version\":\"7.3.1\",\"originX\":\"center\",\"originY\":\"center\",\"left\":440,\"top\":320,\"width\":691,\"height\":1536,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":0,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1.2735,\"scaleY\":1.2735,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"src\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/products\\/variations\\/uXJMr7TSslAem2mMfadwmhEW2YJ81zzgUUH3nwTo.jpg\",\"crossOrigin\":\"anonymous\",\"filters\":[]},{\"rx\":0,\"ry\":0,\"type\":\"Rect\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":70.4,\"top\":64,\"width\":739.2,\"height\":512,\"fill\":\"transparent\",\"stroke\":\"rgba(249,115,22,0.9)\",\"strokeWidth\":2,\"strokeDashArray\":[8,6],\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1,\"scaleY\":1,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0},{\"cropX\":0,\"cropY\":0,\"type\":\"Image\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":273.68,\"top\":89.0162,\"width\":571,\"height\":793,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":0,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":0.5826,\"scaleY\":0.5826,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"src\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/customizations\\/uploads\\/2026\\/05\\/XNRkQcYktTxF2mFVECqSS7hd0wDNPV3pHQ1cA80W.png\",\"crossOrigin\":\"anonymous\",\"filters\":[]}]},\"views\":{\"front\":{\"fabric\":{\"version\":\"7.3.1\",\"objects\":[{\"cropX\":0,\"cropY\":0,\"type\":\"Image\",\"version\":\"7.3.1\",\"originX\":\"center\",\"originY\":\"center\",\"left\":440,\"top\":320,\"width\":691,\"height\":1536,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":0,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1.2735,\"scaleY\":1.2735,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"src\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/products\\/variations\\/uXJMr7TSslAem2mMfadwmhEW2YJ81zzgUUH3nwTo.jpg\",\"crossOrigin\":\"anonymous\",\"filters\":[]},{\"rx\":0,\"ry\":0,\"type\":\"Rect\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":70.4,\"top\":64,\"width\":739.2,\"height\":512,\"fill\":\"transparent\",\"stroke\":\"rgba(249,115,22,0.9)\",\"strokeWidth\":2,\"strokeDashArray\":[8,6],\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1,\"scaleY\":1,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0},{\"cropX\":0,\"cropY\":0,\"type\":\"Image\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":273.68,\"top\":89.0162,\"width\":571,\"height\":793,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":0,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":0.5826,\"scaleY\":0.5826,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"src\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/customizations\\/uploads\\/2026\\/05\\/XNRkQcYktTxF2mFVECqSS7hd0wDNPV3pHQ1cA80W.png\",\"crossOrigin\":\"anonymous\",\"filters\":[]}]},\"canvas_width\":null,\"canvas_height\":null},\"back\":{\"fabric\":{\"version\":\"7.3.1\",\"objects\":[{\"cropX\":0,\"cropY\":0,\"type\":\"Image\",\"version\":\"7.3.1\",\"originX\":\"center\",\"originY\":\"center\",\"left\":440,\"top\":320,\"width\":571,\"height\":793,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":0,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1.5412,\"scaleY\":1.5412,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"src\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/products\\/variations\\/l2EvL4GKEGNJjoge8Z7IB8lbyuyfBIl4MU4WMgS2.png\",\"crossOrigin\":\"anonymous\",\"filters\":[]},{\"rx\":0,\"ry\":0,\"type\":\"Rect\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":70.4,\"top\":64,\"width\":739.2,\"height\":512,\"fill\":\"transparent\",\"stroke\":\"rgba(249,115,22,0.9)\",\"strokeWidth\":2,\"strokeDashArray\":[8,6],\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1,\"scaleY\":1,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0},{\"cropX\":0,\"cropY\":0,\"type\":\"Image\",\"version\":\"7.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":116.88,\"top\":125.8162,\"width\":571,\"height\":793,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":0,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":0.2073,\"scaleY\":0.2073,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":null,\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"src\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/customizations\\/uploads\\/2026\\/05\\/nnlCShtrSFbFHKJQ3dZQQGRdyAVIMQFrZ2qJIhvj.png\",\"crossOrigin\":\"anonymous\",\"filters\":[]}]},\"canvas_width\":null,\"canvas_height\":null}},\"canvas_width\":880,\"canvas_height\":640,\"variation_id\":5,\"saved_at\":\"2026-05-29T20:20:27+00:00\"}', 'customizations/previews/2026/05/fa7bh7fkml8td2n0un4lwmtti4czs0lckuidkf3m.png', '[\"customizations\\/uploads\\/2026\\/05\\/XNRkQcYktTxF2mFVECqSS7hd0wDNPV3pHQ1cA80W.png\",\"customizations\\/uploads\\/2026\\/05\\/nnlCShtrSFbFHKJQ3dZQQGRdyAVIMQFrZ2qJIhvj.png\"]', '2026-05-29 15:20:48', '2026-05-29 15:20:48');

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
  `back_image` varchar(255) DEFAULT NULL,
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

INSERT INTO `products` (`id`, `category_id`, `type`, `variation_attribute_defs`, `name`, `slug`, `sku`, `description`, `price`, `compare_at_price`, `stock_quantity`, `image`, `back_image`, `gallery`, `is_active`, `is_featured`, `is_customizable`, `custom_print_area`, `created_at`, `updated_at`) VALUES
(1, 4, 'simple', NULL, 'Premium Matte Business Cards', 'premium-matte-business-cards-ivaq', 'PPC-BC-001', 'High-quality print-on-demand item: Premium Matte Business Cards.', 29.99, NULL, 500, NULL, NULL, NULL, 1, 0, 1, '{\"left\":0.08,\"top\":0.1,\"width\":0.84,\"height\":0.8}', '2026-05-06 13:11:18', '2026-05-19 11:45:28'),
(2, 1, 'simple', NULL, 'Gloss Finish Cards (500)', 'gloss-finish-cards-500-mjpz', 'PPC-BC-002', 'High-quality print-on-demand item: Gloss Finish Cards (500).', 49.99, NULL, 120, NULL, NULL, NULL, 1, 0, 1, NULL, '2026-05-06 13:11:18', '2026-05-06 13:11:18'),
(3, 2, 'simple', NULL, 'Outdoor Vinyl Banner 3×6 ft', 'outdoor-vinyl-banner-36-ft-xers', 'PPC-SG-101', 'High-quality print-on-demand item: Outdoor Vinyl Banner 3×6 ft.', 89.99, NULL, 40, NULL, NULL, NULL, 1, 0, 1, NULL, '2026-05-06 13:11:19', '2026-05-06 13:11:19'),
(4, 2, 'simple', NULL, 'Rigid Yard Signs (Qty 10)', 'rigid-yard-signs-qty-10-m8vc', 'PPC-SG-102', 'High-quality print-on-demand item: Rigid Yard Signs (Qty 10).', 159.99, NULL, 25, NULL, NULL, NULL, 1, 0, 1, NULL, '2026-05-06 13:11:19', '2026-05-06 13:11:19'),
(5, 3, 'simple', NULL, 'Screen Printed Tee', 'screen-printed-tee-cphe', 'PPC-AP-201', 'High-quality print-on-demand item: Screen Printed Tee.', 24.99, NULL, 200, NULL, NULL, NULL, 1, 0, 1, NULL, '2026-05-06 13:11:19', '2026-05-06 13:11:19'),
(6, 3, 'simple', NULL, 'Embroidered Polo', 'embroidered-polo-x7hg', 'PPC-AP-202', 'High-quality print-on-demand item: Embroidered Polo.', 34.99, NULL, 150, NULL, NULL, NULL, 1, 0, 1, NULL, '2026-05-06 13:11:19', '2026-05-06 13:11:19'),
(7, 2, 'variable', '[{\"key\":\"color\",\"label\":\"Color\",\"values\":[\"Red\",\"Blue\",\"Black\"]},{\"key\":\"s\",\"label\":\"Size\",\"values\":[\"L\",\"M\",\"S\"]}]', 'test', 'test', NULL, NULL, 10.00, NULL, 9, 'products/RflEI4DYSp6idge9YKJQ4jztZez7C2LcbtqKvFRc.jpg', 'products/AQBT6gaD5CSyFX72AzerZG28F5tgUT7p8qWuGYz5.jpg', NULL, 1, 0, 1, '{\"left\":0.08,\"top\":0.1,\"width\":0.84,\"height\":0.8}', '2026-05-06 15:05:28', '2026-05-29 15:11:15'),
(8, 1, 'variable', '[{\"key\":\"packet\",\"label\":\"Packet\",\"values\":[\"500\",\"1000\",\"5000\"]}]', 'Business Card', 'business-card', NULL, 'Testing New Product', 10.00, NULL, 1200000, 'products/p6rrnrz44IszIfa9YIz9MOggO2n6328Soe5e5DTh.jpg', NULL, NULL, 1, 0, 1, NULL, '2026-05-07 11:09:12', '2026-05-07 11:09:13'),
(9, 3, 'variable', '[{\"key\":\"color\",\"label\":\"Color\",\"values\":[\"Red\",\"Green\",\"Blue\"]},{\"key\":\"size\",\"label\":\"Size\",\"values\":[\"S\",\"M\",\"L\",\"XL\",\"XXL\"]}]', 'busines card', 'busines-card', 'BUSINESCARD', NULL, 10.00, NULL, 30, NULL, 'products/NcdQ9DUOWHgFE24MVy7CkHGGm8YJP8LqqGubcTPc.jpg', NULL, 1, 1, 1, '{\"left\":0.08,\"top\":0.1,\"width\":0.84,\"height\":0.8}', '2026-05-07 11:34:01', '2026-05-29 15:10:56');

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
  `back_image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_variations`
--

INSERT INTO `product_variations` (`id`, `product_id`, `sku`, `price`, `compare_at_price`, `stock_quantity`, `attributes`, `image`, `back_image`, `created_at`, `updated_at`) VALUES
(1, 7, '0001', 10.00, NULL, 9, '{\"color\":\"Red\",\"s\":\"L\"}', NULL, NULL, '2026-05-06 15:05:28', '2026-05-13 12:34:07'),
(2, 8, '00012', 10.00, NULL, 100000, '{\"packet\":\"500\"}', NULL, NULL, '2026-05-07 11:09:12', '2026-05-07 11:09:12'),
(3, 8, '00013', 50.00, NULL, 100000, '{\"packet\":\"1000\"}', NULL, NULL, '2026-05-07 11:09:12', '2026-05-07 11:09:12'),
(4, 8, '00014', 100.00, NULL, 1000000, '{\"packet\":\"5000\"}', NULL, NULL, '2026-05-07 11:09:12', '2026-05-07 11:09:12'),
(5, 9, 'BUSINESCARD-1', 10.00, NULL, 10, '{\"color\":\"Red\",\"size\":\"S\"}', 'products/variations/uXJMr7TSslAem2mMfadwmhEW2YJ81zzgUUH3nwTo.jpg', 'products/variations/l2EvL4GKEGNJjoge8Z7IB8lbyuyfBIl4MU4WMgS2.png', '2026-05-07 11:34:02', '2026-05-29 15:19:24'),
(6, 9, 'BUSINESCARD-2', 20.00, NULL, 10, '{\"color\":\"Green\",\"size\":\"S\"}', 'products/variations/KRkdTqnrWlqzPo3IVfWIBGEWuI5JhxGXuZQCxj5M.png', NULL, '2026-05-07 11:34:02', '2026-05-07 11:49:57'),
(7, 9, 'BUSINESCARD-3', 30.00, NULL, 10, '{\"color\":\"Blue\",\"size\":\"S\"}', 'products/variations/wRtTJNhmia2B5UhOM2dw52esUVUQjBo1F20BBskc.jpg', NULL, '2026-05-07 11:34:02', '2026-05-07 11:49:57');

-- --------------------------------------------------------

--
-- Table structure for table `service_bookings`
--

CREATE TABLE `service_bookings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `booking_number` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `service_package_id` bigint(20) UNSIGNED DEFAULT NULL,
  `category_name` varchar(255) NOT NULL,
  `service_name` varchar(255) NOT NULL,
  `service_price` decimal(10,2) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `customer_email` varchar(255) NOT NULL,
  `customer_phone` varchar(255) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `brief_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`brief_json`)),
  `status` varchar(255) NOT NULL DEFAULT 'awaiting_payment',
  `payment_status` varchar(255) NOT NULL DEFAULT 'unpaid',
  `total` decimal(10,2) NOT NULL,
  `stripe_checkout_session_id` varchar(255) DEFAULT NULL,
  `paid_at` timestamp NULL DEFAULT NULL,
  `placed_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `service_bookings`
--

INSERT INTO `service_bookings` (`id`, `booking_number`, `user_id`, `service_package_id`, `category_name`, `service_name`, `service_price`, `customer_name`, `customer_email`, `customer_phone`, `notes`, `brief_json`, `status`, `payment_status`, `total`, `stripe_checkout_session_id`, `paid_at`, `placed_at`, `created_at`, `updated_at`) VALUES
(1, 'SRV-DFFB0E26-172743', 1, 1, 'Logo Design', 'Starter', 99.00, 'Administrator', 'admin@proprintcontractors.test', '8082663052', 'test', NULL, 'awaiting_payment', 'unpaid', 99.00, 'cs_test_a1vaeURauqF32ORQQcYiT52A0LIvdV8aVRucXbD7aePXuM6o3KnRKuHqMq', NULL, '2026-05-29 12:27:43', '2026-05-29 12:27:43', '2026-05-29 12:27:51'),
(2, 'SRV-F445D940-172808', 1, 1, 'Logo Design', 'Starter', 99.00, 'Administrator', 'admin@proprintcontractors.test', NULL, NULL, NULL, 'pending', 'paid', 99.00, 'cs_test_a1PnsHV61zZrr1kjzMwLthlLijxo2h5olo1KWelybQ1HDg0gmVg01GlkL6', '2026-05-29 12:28:26', '2026-05-29 12:28:08', '2026-05-29 12:28:08', '2026-05-29 12:28:26'),
(3, 'SRV-6D549684-225852', 1, 8, 'Digital Marketing', 'Growth', 899.00, 'Fleur Farrell', 'pecetiweno@mailinator.com', '+1 (233) 604-1877', NULL, '{\"type\":\"digital_marketing\",\"social_media_purpose\":\"Nostrum et voluptas\",\"brand_objective\":\"Ducimus et sit odio\",\"social_media_goals\":\"Aliquip quasi sit in\",\"biggest_barrier\":\"Ad ea inventore eum\",\"growth_plan_fit\":\"Dicta in ullamco odi\",\"target_audience\":\"Quia aliquam aliqua\",\"audience_engagement\":\"Placeat non dolor c\",\"brand_voice\":\"Occaecat omnis dolor\",\"update_tone\":\"Vitae odit similique\",\"main_message\":\"Enim dolor cupidatat\",\"brand_differentiator\":\"Ipsam dolores amet\",\"why_choose_you\":\"Fuga Sit aliqua Do\",\"brand_vision\":\"Id est lorem harum\",\"content_resources\":\"At qui velit praesen\",\"publish_frequency\":\"Aspernatur consectet\",\"offline_campaigns\":\"Deleniti nihil dolor\",\"audience_content_response\":\"Totam ut in quae vel\",\"content_types_to_create\":\"Dolore fuga Expedit\",\"content_message\":\"Voluptatum qui ad no\",\"user_generated_content\":\"Voluptatem porro dol\",\"holidays_to_observe\":\"Quos culpa deserunt\",\"existing_profiles\":\"Qui tempor et itaque\",\"expand_networks\":\"Ad eum voluptate nih\",\"narrow_networks\":\"Fugiat fugiat dolo\",\"social_customer_service\":\"Officia voluptatem d\",\"measure_roi\":\"Repudiandae odit rep\",\"working_and_not_working\":\"Quibusdam nulla dolo\",\"sales_funnel_fit\":\"Non eiusmod et liber\",\"past_attempts\":\"Sint id perferendis\",\"tracking_pixels\":\"Corporis eos est est\"}', 'pending', 'paid', 899.00, 'cs_test_a1pNZsZxEwXKOhKzO7TSmQwndzUVQ1sQ752XBmdoD8bB3YdWD2Kssn2mL9', '2026-05-29 17:59:17', '2026-05-29 17:58:52', '2026-05-29 17:58:52', '2026-05-29 17:59:17'),
(4, 'SRV-2BFAE074-230005', 1, 2, 'Logo Design', 'Professional', 249.00, 'Keiko Savage', 'qovof@mailinator.com', '+1 (385) 303-1707', NULL, '{\"type\":\"logo\",\"logo_name\":\"Odysseus Page\",\"slogan\":\"Ut odio et ut dolor\",\"business_description\":\"Nisi iure voluptatem\",\"business_industry\":\"Velit fuga Blanditi\",\"competitors\":\"Debitis voluptatibus\",\"business_website\":\"https:\\/\\/www.tydotoc.info\",\"requirements\":\"Cillum nemo quaerat\",\"logo_elements\":\"Et tempor sit illum\",\"logo_styles\":[\"Abstract\",\"Font In Shape\",\"Fonts + Meaning\",\"Geometric Symbol\",\"Silhouette Symbol\"],\"look_and_feel\":[\"Feminine\",\"Fun\",\"Masculine\",\"Royal Sophisticated\",\"Web 2.0\"],\"usage\":[\"Print (Business cards, letterhead, stationery)\"],\"colors\":[\"Yellow\",\"White\",\"Grey\"],\"color_other\":null,\"font_styles\":[\"Brush\",\"Decorative\",\"Grunge\",\"Handwritten\",\"Medieval\",\"Retro\",\"Serif\",\"Techno\",\"Typed\"],\"additional_comments\":\"Officiis qui maxime\"}', 'pending', 'paid', 249.00, 'cs_test_a1SNEd8QlwdWlgzdAAIWsLtxV80e6viMLvNSJhIlaNWGEcY8ol3BdUh382', '2026-05-29 18:00:24', '2026-05-29 18:00:05', '2026-05-29 18:00:05', '2026-05-29 18:00:24'),
(5, 'SRV-29FC4478-230117', 1, 5, 'Web Design', 'Business Site', 1499.00, 'Hedda Finley', 'rywuca@mailinator.com', '+1 (579) 261-8715', NULL, '{\"type\":\"web\",\"business_name\":\"Eliana Ferrell\",\"brand_name\":\"Maisie Ramsey\",\"industry\":\"Error veniam ullamc\",\"business_description\":\"Ipsam fugit alias v\",\"target_audience\":\"Ipsam labore sint a\",\"competitors_inspiration\":\"Voluptate qui quibus\",\"color_preferences\":\"Mollitia asperiores\",\"site_feeling\":\"https:\\/\\/www.nagyki.us\",\"content_needs\":\"I need both content writing and images\\/graphics\",\"content_notes\":\"Dolorum nesciunt mi\",\"content_files\":[{\"path\":\"service-bookings\\/5\\/content\\/PMr29TVT3iRtLooJRa6QgRuCetE5mSeFBIcmSiXJ.png\",\"original_name\":\"Screenshot 2026-04-21 232700.png\",\"url\":\"http:\\/\\/127.0.0.1:8000\\/storage\\/service-bookings\\/5\\/content\\/PMr29TVT3iRtLooJRa6QgRuCetE5mSeFBIcmSiXJ.png\"}],\"existing_website_or_domain\":\"Philip Clayton\",\"desired_pages\":\"Est unde architecto\",\"social_media_links\":\"Molestias molestias\",\"designer_notes\":\"Veniam aperiam magn\",\"hosting_needs\":\"Not sure \\u2014 please advise\",\"hosting_details\":\"Voluptatem assumenda\"}', 'pending', 'paid', 1499.00, 'cs_test_a1PXjK59NIuWjxre0InWxMh3d683TUN1aZl3MlW1iKnowcsUVLvwHCs2vm', '2026-05-29 18:01:36', '2026-05-29 18:01:17', '2026-05-29 18:01:17', '2026-05-29 18:01:36'),
(6, 'SRV-41C6C5CB-160540', 1, 1, 'Logo Design', 'Starter', 99.00, 'Paki Mclean', 'gazi@mailinator.com', '+1 (437) 338-6012', NULL, '{\"type\":\"logo\",\"logo_name\":\"Chandler Albert\",\"slogan\":\"Doloribus reprehende\",\"business_description\":\"Ab molestias rem est\",\"business_industry\":\"Eu est adipisicing\",\"competitors\":\"Sed dolore odio nesc\",\"business_website\":\"https:\\/\\/www.nujo.info\",\"requirements\":\"Vel est culpa volupt\",\"logo_elements\":\"Sint commodo ex nat\",\"logo_styles\":[\"Abstract\",\"Geometric Symbol\"],\"look_and_feel\":[\"Feminine\",\"Masculine\",\"Royal Sophisticated\"],\"usage\":[\"Web (Website, banner ads, email marketing)\",\"Print (Business cards, letterhead, stationery)\",\"Clothing (T-Shirts, hats, embroidery)\"],\"colors\":[\"Blue\",\"Black\",\"Brown\",\"Turquoise\",\"Other\"],\"color_other\":null,\"font_styles\":[\"Script\",\"Serif\",\"Western\"],\"additional_comments\":\"Molestiae quam ullam\"}', 'pending', 'paid', 99.00, 'cs_test_a1bFlAAouhmuUpMv6zIQwL3T6D13faeK8n2JokcGmCqPbUEqLfR65lHylN', '2026-06-02 11:06:18', '2026-06-02 11:05:40', '2026-06-02 11:05:40', '2026-06-02 11:06:18');

-- --------------------------------------------------------

--
-- Table structure for table `service_categories`
--

CREATE TABLE `service_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `sort_order` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `service_categories`
--

INSERT INTO `service_categories` (`id`, `name`, `slug`, `sort_order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Logo Design', 'logo-design', 1, 1, '2026-05-29 12:22:40', '2026-05-29 12:22:40'),
(2, 'Web Design', 'web-design', 2, 1, '2026-05-29 12:22:41', '2026-05-29 12:22:41'),
(3, 'Digital Marketing', 'digital-marketing', 3, 1, '2026-05-29 12:22:42', '2026-05-29 12:22:42');

-- --------------------------------------------------------

--
-- Table structure for table `service_packages`
--

CREATE TABLE `service_packages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `service_category_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `popular` tinyint(1) NOT NULL DEFAULT 0,
  `features` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`features`)),
  `sort_order` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `service_packages`
--

INSERT INTO `service_packages` (`id`, `service_category_id`, `name`, `slug`, `price`, `popular`, `features`, `sort_order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 1, 'Starter', 'logo-design-starter', 99.00, 0, '[\"2 logo concepts\",\"2 revisions\",\"PNG + JPG files\",\"3-day delivery\"]', 1, 1, '2026-05-29 12:22:41', '2026-05-29 12:22:41'),
(2, 1, 'Professional', 'logo-design-professional', 249.00, 1, '[\"5 logo concepts\",\"Unlimited revisions\",\"Vector + Print files\",\"Brand color palette\",\"2-day delivery\"]', 2, 1, '2026-05-29 12:22:41', '2026-05-29 12:22:41'),
(3, 1, 'Brand Identity', 'logo-design-brand-identity', 599.00, 0, '[\"10 logo concepts\",\"Full brand guide\",\"Business card design\",\"Letterhead design\",\"Social media kit\",\"1-day delivery\"]', 3, 1, '2026-05-29 12:22:41', '2026-05-29 12:22:41'),
(4, 2, 'Landing Page', 'web-design-landing-page', 499.00, 0, '[\"1-page responsive\",\"Contact form\",\"SEO basics\",\"5-day delivery\"]', 1, 1, '2026-05-29 12:22:41', '2026-05-29 12:22:41'),
(5, 2, 'Business Site', 'web-design-business-site', 1499.00, 1, '[\"Up to 8 pages\",\"CMS included\",\"Mobile optimized\",\"On-page SEO\",\"10-day delivery\"]', 2, 1, '2026-05-29 12:22:41', '2026-05-29 12:22:41'),
(6, 2, 'E-Commerce', 'web-design-e-commerce', 2999.00, 0, '[\"Full online store\",\"Payment integration\",\"Inventory mgmt\",\"Product import\",\"Training included\"]', 3, 1, '2026-05-29 12:22:41', '2026-05-29 12:22:41'),
(7, 3, 'Social Starter', 'digital-marketing-social-starter', 399.00, 0, '[\"12 posts\\/month\",\"2 platforms\",\"Monthly report\",\"Content calendar\"]', 1, 1, '2026-05-29 12:22:42', '2026-05-29 12:22:42'),
(8, 3, 'Growth', 'digital-marketing-growth', 899.00, 1, '[\"24 posts\\/month\",\"4 platforms\",\"Paid ads setup\",\"Bi-weekly reports\",\"Strategy calls\"]', 2, 1, '2026-05-29 12:22:42', '2026-05-29 12:22:42'),
(9, 3, 'Enterprise', 'digital-marketing-enterprise', 1999.00, 0, '[\"Daily content\",\"All platforms\",\"Ad management\",\"SEO + PPC\",\"Dedicated manager\"]', 3, 1, '2026-05-29 12:22:42', '2026-05-29 12:22:42');

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
('IOwuBfdljsKdlTzUbDoDBES9UBWJFJWJ8Uj08TvN', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', 'YTo2OntzOjY6Il90b2tlbiI7czo0MDoiMUNpVk9jR3hYdnZJVEpHM052U29SMlJBbTd3NjhXYkRtVEw0RkZBMSI7czozOiJ1cmwiO2E6MDp7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6OToiX3ByZXZpb3VzIjthOjI6e3M6MzoidXJsIjtzOjEyNDoiaHR0cDovLzEyNy4wLjAuMTo4MDAwL3NlcnZpY2VzL2Jvb2tpbmcvc3VjY2Vzcz9zZXNzaW9uX2lkPWNzX3Rlc3RfYTFiRmxBQW91aG11VXBNdjZ6SVF3TDNUNkQxM2ZhZUs4bjJKb2tjR21DcVBiVUVxTGZSNjVsSHlsTiI7czo1OiJyb3V0ZSI7czoyNDoic2VydmljZXMuYm9va2luZy5zdWNjZXNzIjt9czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTtzOjE3OiJndWVzdF9jYXJ0X21lcmdlZCI7YjoxO30=', 1780416414);

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
(2, 'general.phone', '+1 (555) 123-111', '2026-05-06 14:17:44', '2026-06-02 10:48:31'),
(3, 'general.email', 'info@proprintcontractors.com', '2026-05-06 14:17:44', '2026-06-02 10:55:43'),
(4, 'general.address', '', '2026-05-06 14:17:44', '2026-06-02 10:48:31'),
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
(35, 'payment.paypal_enabled', '1', '2026-05-07 12:40:14', '2026-05-07 12:40:14'),
(36, 'general.show_product_prices', '0', '2026-05-29 11:58:37', '2026-05-29 11:58:37'),
(37, 'email.order_confirmation_quote.subject', 'Order {{order_number}} received — {{site_name}}', '2026-05-29 15:20:48', '2026-05-29 15:20:48'),
(38, 'email.order_confirmation_quote.body_html', '<p>Hi,</p>\n<p>Thank you for submitting order <strong>{{order_number}}</strong>.</p>\n{{order_pricing_html}}\n<h3>Items</h3>\n{{order_items_html}}\n<h3>Ship to</h3>\n<p>{{shipping_address}}</p>\n<p>— {{site_name}}</p>', '2026-05-29 15:20:48', '2026-05-29 15:20:48'),
(39, 'email.order_processing_quote.body_html', '<p>Hi,</p>\n<p>Your order <strong>{{order_number}}</strong> is now being processed.</p>\n<p>We will contact you with pricing details if we have not already.</p>\n<p>— {{site_name}}</p>', '2026-05-29 15:20:48', '2026-05-29 15:20:48'),
(40, 'email.order_processing_quote.subject', 'We\'re preparing order {{order_number}}', '2026-06-02 11:04:13', '2026-06-02 11:04:13'),
(41, 'email.contact_notification.subject', 'New contact message: {{contact_subject}} — {{site_name}}', '2026-06-02 11:04:13', '2026-06-02 11:04:13'),
(42, 'email.contact_notification.body_html', '<p>You have received a new message from your contact form.</p>\n<table cellpadding=\"6\" cellspacing=\"0\" style=\"border-collapse:collapse;\">\n<tr><td><strong>Name</strong></td><td>{{contact_name}}</td></tr>\n<tr><td><strong>Email</strong></td><td>{{contact_email}}</td></tr>\n<tr><td><strong>Subject</strong></td><td>{{contact_subject}}</td></tr>\n</table>\n<h3>Message</h3>\n<p style=\"white-space:pre-wrap;\">{{contact_message}}</p>\n<p>— {{site_name}}</p>', '2026-06-02 11:04:13', '2026-06-02 11:04:13'),
(43, 'email.order_admin.subject', 'New order {{order_number}} — {{site_name}}', '2026-06-02 11:04:14', '2026-06-02 11:04:14'),
(44, 'email.order_admin.body_html', '<p>A new order has been placed.</p>\n<p><strong>Order:</strong> {{order_number}}<br>\n<strong>Status:</strong> {{order_status}}</p>\n{{order_pricing_html}}\n<h3>Items</h3>\n{{order_items_html}}\n<h3>Ship to</h3>\n<p>{{shipping_address}}</p>\n<p>— {{site_name}}</p>', '2026-06-02 11:04:14', '2026-06-02 11:04:14'),
(45, 'email.service_booking_admin.subject', 'New service booking {{booking_number}} — {{site_name}}', '2026-06-02 11:04:14', '2026-06-02 11:04:14'),
(46, 'email.service_booking_admin.body_html', '<p>A new service booking has been received.</p>\n<table cellpadding=\"6\" cellspacing=\"0\" style=\"border-collapse:collapse;\">\n<tr><td><strong>Booking</strong></td><td>{{booking_number}}</td></tr>\n<tr><td><strong>Service</strong></td><td>{{category_name}} — {{service_name}}</td></tr>\n<tr><td><strong>Customer</strong></td><td>{{customer_name}}</td></tr>\n<tr><td><strong>Email</strong></td><td>{{customer_email}}</td></tr>\n<tr><td><strong>Phone</strong></td><td>{{customer_phone}}</td></tr>\n<tr><td><strong>Total</strong></td><td>${{booking_total}}</td></tr>\n</table>\n{{booking_notes_block}}\n<h3>Project brief</h3>\n{{booking_brief_html}}\n<p>— {{site_name}}</p>', '2026-06-02 11:04:14', '2026-06-02 11:04:14'),
(47, 'email.service_booking_confirmation.subject', 'Booking {{booking_number}} confirmed — {{site_name}}', '2026-06-02 11:04:14', '2026-06-02 11:04:14'),
(48, 'email.service_booking_confirmation.body_html', '<p>Hi {{customer_name}},</p>\n<p>Thank you for booking <strong>{{service_name}}</strong> ({{category_name}}).</p>\n<p>Your booking reference is <strong>{{booking_number}}</strong>.</p>\n<p>Total paid: ${{booking_total}}</p>\n{{booking_notes_block}}\n<h3>Your brief</h3>\n{{booking_brief_html}}\n<p>We will be in touch soon. Questions? Email us at {{support_email}}.</p>\n<p>— {{site_name}}</p>', '2026-06-02 11:04:14', '2026-06-02 11:04:14');

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
(1, 'Administrator', 'admin@proprintcontractors.test', '2026-05-06 13:11:17', '$2y$12$kzPUCFVAEZQ34PGoh5z9T.m4rbEEN43jknNT/kknQmW85YbxmhfmW', 1, 'h5nvBIhAth3jKxUZU7vCGTyO8FpQVcwbse6ADLPx21yKTCroLgKNUCsne58m', '2026-05-06 13:11:17', '2026-05-06 13:11:17'),
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
-- Indexes for table `contact_messages`
--
ALTER TABLE `contact_messages`
  ADD PRIMARY KEY (`id`);

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
-- Indexes for table `service_bookings`
--
ALTER TABLE `service_bookings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `service_bookings_booking_number_unique` (`booking_number`),
  ADD KEY `service_bookings_user_id_foreign` (`user_id`),
  ADD KEY `service_bookings_service_package_id_foreign` (`service_package_id`);

--
-- Indexes for table `service_categories`
--
ALTER TABLE `service_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `service_categories_slug_unique` (`slug`);

--
-- Indexes for table `service_packages`
--
ALTER TABLE `service_packages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `service_packages_slug_unique` (`slug`),
  ADD KEY `service_packages_service_category_id_foreign` (`service_category_id`);

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `contact_messages`
--
ALTER TABLE `contact_messages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

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
-- AUTO_INCREMENT for table `service_bookings`
--
ALTER TABLE `service_bookings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `service_categories`
--
ALTER TABLE `service_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `service_packages`
--
ALTER TABLE `service_packages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

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

--
-- Constraints for table `service_bookings`
--
ALTER TABLE `service_bookings`
  ADD CONSTRAINT `service_bookings_service_package_id_foreign` FOREIGN KEY (`service_package_id`) REFERENCES `service_packages` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `service_bookings_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `service_packages`
--
ALTER TABLE `service_packages`
  ADD CONSTRAINT `service_packages_service_category_id_foreign` FOREIGN KEY (`service_category_id`) REFERENCES `service_categories` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
