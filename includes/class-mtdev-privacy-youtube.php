<?php

if (!defined('ABSPATH')) {
    exit;
}

class MTDev_Privacy_YouTube {

    private static $instance = null;

    public static function get_instance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_action('init', [$this, 'register_privacy_youtube_block']);
    }

    public function register_privacy_youtube_block() {
        register_block_type(__DIR__ . '/../build');
    }
}
<?php

if (!defined('ABSPATH')) {
    exit;
}

class MTDev_Privacy_YouTube {

    private static $instance = null;

    public static function get_instance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_action('init', [$this, 'register_privacy_youtube_block']);
    }

    public function register_privacy_youtube_block() {
        register_block_type(__DIR__ . '/../build');
    }
}
