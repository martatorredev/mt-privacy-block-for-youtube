<?php
/**
 * Plugin Name: MTDev Privacy Block for YouTube
 * Description: A Gutenberg block for embedding YouTube videos without tracking cookies, enhancing privacy and GDPR compliance.
 * Version: 1.0.0
 * Author: Marta Torre
 * Author URI: https://martatorre.dev
 * License: GPL-2.0-or-later
 * Text Domain: mtdev-privacy-block-for-youtube
 *
 * @package MTDev_Privacy_Block_For_YouTube
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

// Autoload classes.
require_once plugin_dir_path(__FILE__) . 'includes/class-mtdev-privacy-youtube.php';

// Initialize the plugin.
function mtdev_privacy_youtube_init() {
    MTDev_Privacy_YouTube::get_instance();
}
add_action('plugins_loaded', 'mtdev_privacy_youtube_init');
