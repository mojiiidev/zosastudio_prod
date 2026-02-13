<?php
/**
 * Zosa Law Bridge Theme - functions.php
 *
 * This theme turns WordPress into a headless CMS.
 * All front-end traffic is redirected to the Vercel-hosted Next.js site.
 * Data is served exclusively via WPGraphQL.
 *
 * REQUIRED FREE PLUGINS:
 *   1. WPGraphQL                          (install from wp-admin > Plugins > Add New)
 *   2. Custom Post Type UI (CPT UI)       (install from wp-admin > Plugins > Add New)
 *   3. Carbon Fields                      (install from wp-admin > Plugins > Add New)
 *   4. WPGraphQL for Carbon Fields        (download from github.com/wp-graphql/wp-graphql-for-carbon-fields)
 *
 * INSTALLATION INSTRUCTIONS:
 *   - Plugins 1-3: Go to wp-admin > Plugins > Add New and search for each
 *   - Plugin 4: Download ZIP from GitHub, then upload via wp-admin > Plugins > Add New > Upload Plugin
 *
 * ALL PLUGINS ARE 100% FREE. Carbon Fields includes repeater fields at no cost.
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
//    (Alternative to CPT UI -- use ONE approach, not both)
//    If you prefer CPT UI, DELETE this entire section 3.
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
// 4. LOAD CARBON FIELDS
//    Carbon Fields provides free repeater/complex fields.
//    Auto-loads composer dependencies if installed via plugin.
// ──────────────────────────────────────────────
add_action('after_setup_theme', function () {
    // If Carbon Fields is installed as a plugin, it auto-loads itself.
    // This check ensures it's available before we use it.
    if (!class_exists('\Carbon_Fields\Container')) {
        return;
    }
    \Carbon_Fields\Carbon_Fields::boot();
});


// ──────────────────────────────────────────────
// 5. REGISTER CARBON FIELDS for Partners
//    This creates the same field structure as ACF but with free repeaters.
// ──────────────────────────────────────────────
use Carbon_Fields\Container;
use Carbon_Fields\Field;

add_action('carbon_fields_register_fields', function () {
    if (!class_exists('\Carbon_Fields\Container')) {
        return;
    }

    Container::make('post_meta', 'partner_fields', 'Partner Details')
        ->where('post_type', '=', 'partners')
        ->add_fields([
            Field::make('text', 'title', 'Title / Position')
                ->set_help_text('e.g. "Founding Partner", "Senior Partner"'),

            Field::make('text', 'role', 'Role')
                ->set_help_text('e.g. "Partner", "Associate"'),

            Field::make('textarea', 'bio', 'Bio')
                ->set_rows(4),

            Field::make('text', 'email', 'Email')
                ->set_attribute('type', 'email'),

            Field::make('text', 'phone', 'Phone'),

            Field::make('image', 'photo', 'Photo')
                ->set_value_type('url'),

            Field::make('complex', 'education', 'Education')
                ->set_layout('tabbed-horizontal')
                ->add_fields([
                    Field::make('text', 'degree', 'Degree'),
                ]),

            Field::make('complex', 'specializations', 'Specializations')
                ->set_layout('tabbed-horizontal')
                ->add_fields([
                    Field::make('text', 'name', 'Specialization Name'),
                ]),
        ]);
});


// ──────────────────────────────────────────────
// 6. CLEANUP: Remove unnecessary front-end bloat
// ──────────────────────────────────────────────
add_action('init', function () {
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('wp_print_styles', 'print_emoji_styles');
    remove_action('wp_head', 'rsd_link');
    remove_action('wp_head', 'wlwmanifest_link');
    remove_action('wp_head', 'wp_generator');
});


// ──────────────────────────────────────────────
// 7. ADMIN BAR: Quick link to the live Vercel site
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
// 8. IMAGE SIZES: Optimized for the frontend
// ──────────────────────────────────────────────
add_action('after_setup_theme', function () {
    add_theme_support('post-thumbnails');
    add_image_size('partner-portrait', 400, 500, true);
    add_image_size('partner-large', 800, 1000, true);
});
