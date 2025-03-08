import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, BlockControls, AlignmentToolbar } from '@wordpress/block-editor';
import { TextControl, PanelBody, RangeControl } from '@wordpress/components';

registerBlockType('mtdev/privacy-youtube-block', {
    title: __('Privacy YouTube Block', 'mtdev-privacy-block-for-youtube'),
    icon: 'video-alt3',
    category: 'embed',
    supports: {
        align: ['left', 'center', 'right']
    },
    attributes: {
        align: { type: 'string', default: 'center' },
        videoUrl: { type: 'string', default: '' },
        title: { type: 'string', default: '' },
        width: { type: 'number', default: 560 },
        height: { type: 'number', default: 315 },
        caption: { type: 'string', default: '' }
    },

    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps({
            className: attributes.align,
            'aria-label': __('YouTube video block', 'mtdev-privacy-block-for-youtube')
        });

        const videoIdMatch = attributes.videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
        const videoId = videoIdMatch ? videoIdMatch[1] : null;

        const nocookieUrl = videoId
            ? `https://www.youtube-nocookie.com/embed/${videoId}`
            : '';

        return (
            <div {...blockProps}>
                <BlockControls>
                    <AlignmentToolbar
                        value={attributes.align}
                        onChange={(newAlign) => setAttributes({ align: newAlign })}
                    />
                </BlockControls>

                <InspectorControls>
                    <PanelBody title={__('Settings', 'mtdev-privacy-block-for-youtube')}>
                        <TextControl
                            label={__('YouTube Video URL', 'mtdev-privacy-block-for-youtube')}
                            value={attributes.videoUrl}
                            onChange={(url) => setAttributes({ videoUrl: url })}
                            placeholder={__('Enter YouTube video URL', 'mtdev-privacy-block-for-youtube')}
                        />
                        <TextControl
                            label={__('Video Title (recommended for accessibility)', 'mtdev-privacy-block-for-youtube')}
                            value={attributes.title}
                            onChange={(title) => setAttributes({ title })}
                            placeholder={__('Describe the video content', 'mtdev-privacy-block-for-youtube')}
                        />
                        <TextControl
                            label={__('Caption (optional)', 'mtdev-privacy-block-for-youtube')}
                            value={attributes.caption}
                            onChange={(caption) => setAttributes({ caption })}
                            placeholder={__('Add a description for accessibility', 'mtdev-privacy-block-for-youtube')}
                        />
                        <RangeControl
                            label={__('Width (px)', 'mtdev-privacy-block-for-youtube')}
                            value={attributes.width}
                            onChange={(value) => setAttributes({ width: value })}
                            min={200}
                            max={1200}
                        />
                        <RangeControl
                            label={__('Height (px)', 'mtdev-privacy-block-for-youtube')}
                            value={attributes.height}
                            onChange={(value) => setAttributes({ height: value })}
                            min={100}
                            max={800}
                        />
                    </PanelBody>
                </InspectorControls>

                {videoId ? (
                    <figure>
                        <iframe
                            width={attributes.width}
                            height={attributes.height}
                            src={nocookieUrl}
                            title={attributes.title || __('YouTube video', 'mtdev-privacy-block-for-youtube')}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                        {attributes.caption && (
                            <figcaption>
                                {attributes.caption}
                            </figcaption>
                        )}
                    </figure>
                ) : (
                    <div className="youtube-placeholder">
                        {__('Add a valid YouTube URL to preview the video.', 'mtdev-privacy-block-for-youtube')}
                    </div>
                )}
            </div>
        );
    },

    save: ({ attributes }) => {
        const blockProps = useBlockProps.save({
            className: attributes.align,
            'aria-label': __('YouTube video block', 'mtdev-privacy-block-for-youtube')
        });

        const videoIdMatch = attributes.videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
        const videoId = videoIdMatch ? videoIdMatch[1] : null;

        const nocookieUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;

        return (
            <figure {...blockProps}>
                <iframe
                    width={attributes.width}
                    height={attributes.height}
                    src={nocookieUrl}
                    title={attributes.title || __('YouTube video', 'mtdev-privacy-block-for-youtube')}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
                {attributes.caption && (
                    <figcaption>
                        {attributes.caption}
                    </figcaption>
                )}
            </figure>
        );
    }
});