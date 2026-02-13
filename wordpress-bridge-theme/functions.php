<?php
/**
 * Zosa Law Bridge Theme - functions.php
 *
 * This theme turns WordPress into a headless CMS.
 * 
 * IMPORTANT: For image CORS errors, you MUST add Access-Control headers 
 * directly to your Nginx config for static files (jpg, png, etc).
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

// 2. CORS: Comprehensive PHP-level CORS for GraphQL and REST API
add_action('init', function () {
    $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
    $allowed_origins = [
        'https://zosalaw.ph',
        'https://www.zosalaw.ph',
        'http://localhost:3000',
    ];

    if (in_array($origin, $allowed_origins)) {
        header("Access-Control-Allow-Origin: $origin");
        header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
        header("Access-Control-Allow-Credentials: true");
        header("Access-Control-Allow-Headers: Authorization, Content-Type, X-WP-Nonce");
    }

    // Respond to preflight requests immediately
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
        ],
        'public'              => true,
        'show_in_rest'        => true,
        'show_in_graphql'     => true,
        'graphql_single_name' => 'partner',
        'graphql_plural_name' => 'partners',
        'supports'            => ['title', 'thumbnail'], // No 'editor' to avoid doubling
        'menu_icon'           => 'dashicons-groups',
        'menu_position'       => 5,
    ]);
});

// 4. REGISTER ACF Field Group for Partners
add_action('acf/init', function () {
    if (!function_exists('acf_add_local_field_group')) return;

    acf_add_local_field_group([
        'key'      => 'group_zosa_partner_details_v3',
        'title'    => 'Partner Details',
        'fields'   => [
            [
                'key'   => 'field_partner_title',
                'label' => 'Title / Position',
                'name'  => 'title',
                'type'  => 'text',
                'instructions' => 'e.g. "Founding Partner"',
                'show_in_graphql' => true,
            ],
            [
                'key'   => 'field_partner_role',
                'label' => 'Role',
                'name'  => 'role',
                'type'  => 'text',
                'instructions' => 'e.g. "Partner"',
                'show_in_graphql' => true,
            ],
            [
                'key'   => 'field_partner_bio',
                'label' => 'Biography',
                'name'  => 'bio',
                'type'  => 'textarea',
                'rows'  => 6,
                'show_in_graphql' => true,
            ],
            [
                'key'   => 'field_partner_email',
                'label' => 'Email Address',
                'name'  => 'email',
                'type'  => 'email',
                'wrapper' => ['width' => '50'],
                'show_in_graphql' => true,
            ],
            [
                'key'   => 'field_partner_phone',
                'label' => 'Phone Number',
                'name'  => 'phone',
                'type'  => 'text',
                'wrapper' => ['width' => '50'],
                'show_in_graphql' => true,
            ],
            [
                'key'   => 'field_partner_photo',
                'label' => 'Profile Photo',
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
                'type'  => 'textarea',
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
        'position'            => 'acf_after_title',
        'style'               => 'seamless',
        'hide_on_screen'      => [
            'the_content',
            'excerpt',
            'discussion',
            'comments',
            'revisions',
            'author',
            'format',
            'page_attributes',
            'categories',
            'tags',
        ],
    ]);
});

add_action('after_setup_theme', function () {
    add_theme_support('post-thumbnails');
});
?>