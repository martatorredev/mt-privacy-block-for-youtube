<?php
/**
 * Plugin Name: MT Privacy Block for YouTube
 * Description: A Gutenberg block for embedding YouTube videos without tracking cookies, enhancing privacy and GDPR compliance.
 * Version: 1.0.0
 * Plugin URI: https://github.com/martatorredev/mtdev-privacy-block-for-youtube
 * Author: Marta Torre
 * Author URI: https://martatorre.dev
 * License: GPLv3
 * Text Domain: mt-privacy-block-for-youtube
 */

if (!defined('ABSPATH')) {
    exit;
}

require_once plugin_dir_path(__FILE__) . 'includes/class-mt-privacy-youtube.php';

function mtdev_privacy_youtube_register_block() {
    register_block_type(__DIR__ . '/build');

    wp_enqueue_style(
        'mt-privacy-youtube-editor-style',
        plugins_url('assets/css/editor.css', __FILE__),
        array('wp-edit-blocks')
    );
}
add_action('enqueue_block_editor_assets', 'mtdev_privacy_youtube_register_block');

function mtdev_privacy_youtube_enqueue_styles() {
    wp_enqueue_style(
        'mtdev-privacy-youtube-style',
        plugins_url('assets/css/style.css', __FILE__)
    );
}
add_action('wp_enqueue_scripts', 'mtdev_privacy_youtube_enqueue_styles');

function mtdev_privacy_youtube_init() {
    MTDev_Privacy_YouTube::get_instance();
}
add_action('plugins_loaded', 'mtdev_privacy_youtube_init');

function mtdev_clear_oembed_cache() {
    global $wpdb;
    $wpdb->query("DELETE FROM $wpdb->postmeta WHERE meta_key LIKE '_oembed_%'");
    $wpdb->query("DELETE FROM $wpdb->options WHERE option_name LIKE '_transient_%_oembed_%'");
}
register_activation_hook(__FILE__, 'mtdev_clear_oembed_cache');
