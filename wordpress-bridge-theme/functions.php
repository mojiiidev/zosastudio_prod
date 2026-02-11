<?php

/**
 * CONFIGURATION: THE URL OF YOUR FRONTEND (VERCEL)
 * Make sure there is NO trailing slash.
 */
define('FRONTEND_URL', 'https://zosalaw.ph'); 

/**
 * 1. THE BRIDGE REDIRECT
 * Redirects all front-end visitors to the Vercel site.
 */
add_action('template_redirect', function() {
    // Check if it's a GraphQL or REST request - DO NOT redirect these
    $is_graphql = (strpos($_SERVER['REQUEST_URI'], '/graphql') !== false);
    $is_rest = (strpos($_SERVER['REQUEST_URI'], '/wp-json') !== false);
    
    // If not admin and not an API call, redirect to frontend
    if (!is_admin() && !$is_graphql && !$is_rest) {
        $path = $_SERVER['REQUEST_URI'];
        
        // 301 Permanent Redirect to Vercel
        wp_redirect(rtrim(FRONTEND_URL, '/') . $path, 301);
        exit;
    }
});

/**
 * 2. ADMIN BAR CUSTOMIZATION
 */
add_action('admin_bar_menu', function($wp_admin_bar) {
    $node = $wp_admin_bar->get_node('view-site');
    if ($node) {
        $node->title = 'View Live Site (Vercel)';
        $node->href = FRONTEND_URL;
        $wp_admin_bar->add_node($node);
    }
}, 999);

/**
 * 3. SECURITY: ENFORCE PROXY-ONLY ACCESS (Optional but Recommended)
 * If you want to ensure ONLY your Vercel app can talk to this WordPress,
 * you would add CORS headers here. For now, we allow public GraphQL 
 * because the proxy handles the security.
 */

add_action('init', function() {
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('wp_print_styles', 'print_emoji_styles');
    remove_action('wp_head', 'rsd_link');
    remove_action('wp_head', 'wlwmanifest_link');
    remove_action('wp_head', 'wp_generator');
});
