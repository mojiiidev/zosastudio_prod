<?php
/**
 * Zosa Law Bridge Theme - functions.php
 *
 * This theme turns WordPress into a headless CMS.
 */

define('FRONTEND_URL', 'https://zosalaw.ph');

// 1. REDIRECT: Send all non-API visitors to Vercel
add_action('template_redirect', function () {
    $uri = $_SERVER['REQUEST_URI'];
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

// 2. CORS: API & GraphQL Headers
// Expanded to handle preflight OPTIONS requests more aggressively to prevent 405 errors.
add_action('init', function () {
    $allowed_origins = [
        'https://zosalaw.ph',
        'https://www.zosalaw.ph',
        'http://localhost:3000'
    ];
    
    $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

    if (in_array($origin, $allowed_origins, true)) {
        header("Access-Control-Allow-Origin: $origin");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
        header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization, X-WP-Nonce");
        header("Access-Control-Allow-Credentials: true");
    }

    // Immediately stop and return 200 for OPTIONS preflight requests
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        status_header(200);
        exit;
    }
});

// 3. REGISTER "Partners" Custom Post Type
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
        ],
        'public'              => true,
        'show_in_rest'        => true,
        'show_in_graphql'     => true,
        'graphql_single_name' => 'partner',
        'graphql_plural_name' => 'partners',
        'supports'            => ['title', 'editor', 'thumbnail', 'excerpt', 'page-attributes'],
        'menu_icon'           => 'dashicons-groups',
        'menu_position'       => 5,
    ]);
});

// 4. REGISTER ACF Field Group
// 'new_lines' => '' prevents ACF from wrapping input in <p> tags.
add_action('acf/init', function () {
    if (!function_exists('acf_add_local_field_group')) return;

    acf_add_local_field_group([
        'key'      => 'group_partner_fields_v5',
        'title'    => 'Partner Fields',
        'fields'   => [
            [
                'key'   => 'field_partner_title',
                'label' => 'Title / Position',
                'name'  => 'title',
                'type'  => 'text',
                'show_in_graphql' => true,
            ],
            [
                'key'   => 'field_partner_role',
                'label' => 'Role',
                'name'  => 'role',
                'type'  => 'text',
                'show_in_graphql' => true,
            ],
            [
                'key'   => 'field_partner_bio',
                'label' => 'Bio',
                'name'  => 'bio',
                'type'  => 'textarea',
                'new_lines' => '', 
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
                'show_in_graphql' => true,
            ],
            [
                'key'   => 'field_partner_education',
                'label' => 'Education',
                'name'  => 'education',
                'type'  => 'textarea',
                'new_lines' => '',
                'instructions' => 'Enter one degree per line.',
                'rows'  => 4,
                'show_in_graphql' => true,
            ],
            [
                'key'   => 'field_partner_specializations',
                'label' => 'Specializations',
                'name'  => 'specializations',
                'type'  => 'text',
                'instructions' => 'Separate with commas.',
                'show_in_graphql' => true,
            ],
        ],
        'location' => [
            [['param' => 'post_type', 'operator' => '==', 'value' => 'partners']]
        ],
        'show_in_graphql'     => true,
        'graphql_field_name'  => 'partnerFields',
        'position'            => 'normal',
        'style'               => 'default',
        'active'              => true,
    ]);
});

add_action('after_setup_theme', function () {
    add_theme_support('post-thumbnails');
});
