<?php

/**
 * CONFIGURATION: CHANGE THIS TO YOUR PRODUCTION FRONTEND URL
 */
define('FRONTEND_URL', 'https://zosalaw.ph'); // Replace with your actual DigitalOcean App URL

/**
 * 1. THE BRIDGE REDIRECT
 * Redirects all front-end visitors to the Next.js site.
 */
add_action('template_redirect', function() {
    // Determine if we should redirect
    $is_graphql = (strpos($_SERVER['REQUEST_URI'], '/graphql') !== false);
    $is_rest = (strpos($_SERVER['REQUEST_URI'], '/wp-json') !== false);
    
    if (!is_admin() && !$is_graphql && !$is_rest) {
        $path = $_SERVER['REQUEST_URI'];
        // Use a 301 redirect for SEO if the structure matches, 
        // otherwise just go to the homepage of the frontend.
        wp_redirect(FRONTEND_URL . $path, 301);
        exit;
    }
});

/**
 * 2. ADMIN BAR CUSTOMIZATION
 * Changes "Visit Site" to point to your live frontend instead of the API server.
 */
add_action('admin_bar_menu', function($wp_admin_bar) {
    $node = $wp_admin_bar->get_node('view-site');
    if ($node) {
        $node->title = 'View Live Frontend';
        $node->href = FRONTEND_URL;
        $wp_admin_bar->add_node($node);
    }
}, 999);

/**
 * 3. HEADLESS CLEANUP
 * Removes unnecessary front-end features that aren't needed for an API.
 */
add_action('init', function() {
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('wp_print_styles', 'print_emoji_styles');
    remove_action('wp_head', 'rsd_link');
    remove_action('wp_head', 'wlwmanifest_link');
    remove_action('wp_head', 'wp_generator');
    remove_action('wp_head', 'rest_output_link_wp_head');
    remove_action('wp_head', 'wp_oembed_add_discovery_links');
    remove_action('wp_head', 'wp_shortlink_wp_head');
});

/**
 * 4. OPTIONAL: ENABLE ACF IN GRAPHQL
 * Ensures ACF data is always visible to your queries.
 */
add_filter('acf/settings/show_admin', '__return_true');
