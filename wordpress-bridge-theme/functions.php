<?php
/**
 * Zosa Law Bridge Theme - functions.php
 *
 * This theme turns WordPress into a headless CMS.
 * All front-end traffic is redirected to the Vercel-hosted Next.js site.
 * Data is served exclusively via WPGraphQL.
 *
 * REQUIRED FREE PLUGINS:
 *   1. WPGraphQL
 *   2. Custom Post Type UI (CPT UI)
 *   3. Advanced Custom Fields (ACF)
 *   4. WPGraphQL for ACF
 */

// ──────────────────────────────────────────────
// 0. CONFIGURATION
// ──────────────────────────────────────────────
define('FRONTEND_URL', 'https://zosalaw.ph');


// ──────────────────────────────────────────────
// 1. REDIRECT: Send all non-API visitors to Vercel
// ──────────────────────────────────────────────
add_action('template_redirect', function () {
    $uri = $_SERVER['REQUEST_URI'];

    // Never redirect API endpoints or admin pages
    $is_api = (
        strpos($uri, '/graphql') !== false ||
        strpos($uri, '/wp-json') !== false ||
        strpos($uri, '/wp-admin') !== false ||
        strpos($uri, '/wp-login') !== false ||
        strpos($uri, '/wp-cron') !== false
    );

    if (!is_admin() && !$is_api && !wp_doing_ajax()) {
        wp_redirect(rtrim(FRONTEND_URL, '/') . $uri, 301);
        exit;
    }
});


// ──────────────────────────────────────────────
// 2. CORS: Allow the Vercel frontend to call /graphql
// ──────────────────────────────────────────────
add_action('init', function () {
    $allowed = [
        'https://zosalaw.ph',
        'https://www.zosalaw.ph',
        'http://localhost:3000',
    ];

    $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

    if (in_array($origin, $allowed, true)) {
        header("Access-Control-Allow-Origin: {$origin}");
        header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        header('Access-Control-Allow-Credentials: true');
    }

    // Immediately respond to preflight OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        status_header(200);
        exit;
    }
});


// ──────────────────────────────────────────────
// 3. REGISTER "Partners" Custom Post Type via code
// ──────────────────────────────────────────────
add_action('init', function () {
    register_post_type('partners', [
        'labels' => [
            'name'               => 'Partners',
            'singular_name'      => 'Partner',
            'add_new'            => 'Add Partner',
            'add_new_item'       => 'Add New Partner',
            'edit_item'          => 'Edit Partner',
            'all_items'          => 'All Partners',
            'search_items'       => 'Search Partners',
            'not_found'          => 'No partners found',
            'not_found_in_trash' => 'No partners in trash',
        ],
        'public'              => true,
        'has_archive'         => false,
        'show_in_rest'        => true,    // Gutenberg support
        'show_in_graphql'     => true,    // WPGraphQL support
        'graphql_single_name' => 'partner',
        'graphql_plural_name' => 'partners',
        'supports'            => ['title', 'editor', 'thumbnail', 'excerpt', 'page-attributes'],
        'menu_icon'           => 'dashicons-groups',
        'menu_position'       => 5,
    ]);
});


// ──────────────────────────────────────────────
// 4. REGISTER ACF Field Group for Partners (via code)
// ──────────────────────────────────────────────
add_action('acf/init', function () {
    if (!function_exists('acf_add_local_field_group')) {
        return;
    }

    acf_add_local_field_group([
        'key'      => 'group_partner_fields',
        'title'    => 'Partner Details',
        'fields'   => [
            [
                'key'   => 'field_partner_title',
                'label' => 'Title / Position',
                'name'  => 'title',
                'type'  => 'text',
                'instructions' => 'e.g. "Founding Partner", "Senior Partner"',
                'show_in_graphql' => true,
            ],
            [
                'key'   => 'field_partner_role',
                'label' => 'Role',
                'name'  => 'role',
                'type'  => 'text',
                'instructions' => 'e.g. "Partner", "Associate"',
                'show_in_graphql' => true,
            ],
            [
                'key'   => 'field_partner_bio',
                'label' => 'Bio',
                'name'  => 'bio',
                'type'  => 'textarea',
                'rows'  => 4,
                'show_in_graphql' => true,
            ],
            [
                'key'   => 'field_partner_email',
                'label' => 'Email',
                'name'  => 'email',
                'type'  => 'email',
                'show_in_graphql' => true,
            ],
            [
                'key'   => 'field_partner_phone',
                'label' => 'Phone',
                'name'  => 'phone',
                'type'  => 'text',
                'show_in_graphql' => true,
            ],
            [
                'key'   => 'field_partner_photo',
                'label' => 'Photo',
                'name'  => 'photo',
                'type'  => 'image',
                'return_format' => 'array',
                'preview_size'  => 'medium',
                'show_in_graphql' => true,
            ],
            [
                'key'   => 'field_partner_education',
                'label' => 'Education',
                'name'  => 'education',
                'type'  => 'text',
                'instructions' => 'Enter education details (e.g. Harvard Law, 2010).',
                'show_in_graphql' => true,
            ],
            [
                'key'   => 'field_partner_specializations',
                'label' => 'Specializations',
                'name'  => 'specializations',
                'type'  => 'text',
                'instructions' => 'Enter specializations separated by commas.',
                'show_in_graphql' => true,
            ],
        ],
        'location' => [
            [
                [
                    'param'    => 'post_type',
                    'operator' => '==',
                    'value'    => 'partners',
                ],
            ],
        ],
        'show_in_graphql'     => true,
        'graphql_field_name'  => 'partnerFields',
        'position'            => 'normal',
        'style'               => 'default',
        'active'              => true,
    ]);
});


// ──────────────────────────────────────────────
// 5. CLEANUP: Remove unnecessary front-end bloat
// ──────────────────────────────────────────────
add_action('init', function () {
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('wp_print_styles', 'print_emoji_styles');
    remove_action('wp_head', 'rsd_link');
    remove_action('wp_head', 'wlwmanifest_link');
    remove_action('wp_head', 'wp_generator');
});


// ──────────────────────────────────────────────
// 6. ADMIN BAR: Quick link to the live Vercel site
// ──────────────────────────────────────────────
add_action('admin_bar_menu', function ($wp_admin_bar) {
    $node = $wp_admin_bar->get_node('view-site');
    if ($node) {
        $node->title = 'View Live Site';
        $node->href  = FRONTEND_URL;
        $wp_admin_bar->add_node($node);
    }
}, 999);


// ──────────────────────────────────────────────
// 7. IMAGE SIZES: Optimized for the frontend
// ──────────────────────────────────────────────
add_action('after_setup_theme', function () {
    add_theme_support('post-thumbnails');
    add_image_size('partner-portrait', 400, 500, true);
    add_image_size('partner-large', 800, 1000, true);
});
?>