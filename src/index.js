import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { TextControl, PanelBody, ToggleControl } from '@wordpress/components';

registerBlockType('mtdev/privacy-youtube-block', {
    title: __('Privacy YouTube Block', 'mtdev-privacy-block-for-youtube'),
    icon: 'video-alt3',
    category: 'embed',
    attributes: {
        videoUrl: {
            type: 'string',
            default: ''
        },
        showPlaceholder: {
            type: 'boolean',
            default: true
        }
    },

    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps();

        return (
            <div {...blockProps}>
                <InspectorControls>
                    <PanelBody title={__('Settings', 'mtdev-privacy-block-for-youtube')}>
                        <ToggleControl
                            label={__('Show placeholder', 'mtdev-privacy-block-for-youtube')}
                            checked={attributes.showPlaceholder}
                            onChange={(value) => setAttributes({ showPlaceholder: value })}
                        />
                    </PanelBody>
                </InspectorControls>

                <TextControl
                    label={__('YouTube Video URL', 'mtdev-privacy-block-for-youtube')}
                    value={attributes.videoUrl}
                    onChange={(url) => setAttributes({ videoUrl: url })}
                    placeholder={__('Enter YouTube video URL', 'mtdev-privacy-block-for-youtube')}
                />
            </div>
        );
    },

    save: ({ attributes }) => {
        const blockProps = useBlockProps.save();

        // Show error message if no URL is provided
        if (!attributes.videoUrl) {
            return <div {...blockProps}>{__('No video URL provided.', 'mtdev-privacy-block-for-youtube')}</div>;
        }

        // Extract the video ID from the URL
        const videoIdMatch = attributes.videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
        const videoId = videoIdMatch ? videoIdMatch[1] : null;

        // Show error message if the URL is invalid
        if (!videoId) {
            return <div {...blockProps}>{__('Invalid YouTube URL.', 'mtdev-privacy-block-for-youtube')}</div>;
        }

        // Generate the no-cookie URL
        const nocookieUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;

        return (
            <div {...blockProps}>
                <iframe
                    width="560"
                    height="315"
                    src={nocookieUrl}
                    title="YouTube video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        );
    }
});