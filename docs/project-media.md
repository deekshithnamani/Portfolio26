# Project images, GIFs, and videos

Edit sections in `src/data/work.json` under `caseStudy` or `univPlatform`.
Put local assets in `public/images/` or `public/videos/`; paths in JSON start
with `/images/` or `/videos/`, without `public`.

For a still image or animated GIF, add an image field to the section:

```json
"image": { "src": "/images/project-screen.webp", "alt": "Document review screen showing flagged issues" },
"caption": "Issues grouped by document section."
```

Use a `.gif` source in the same field for an animated GIF. It remains animated
inline and in the viewer. Large animations are usually better delivered as video.

For video, add:

```json
"video": {
  "src": "/videos/document-review.mp4",
  "alt": "Walkthrough of the document review flow",
  "poster": "/images/document-review-poster.webp",
  "tracks": [
    { "src": "/videos/document-review.en.vtt", "srcLang": "en", "label": "English" }
  ]
},
"caption": "From upload to reviewing flagged issues."
```

Poster and caption tracks are optional. Use WebVTT tracks for spoken content.
MP4 and WebM files can be used when their codecs are supported by the visitor’s
browser. A YouTube or Vimeo page URL is not a direct video source.

Each section has one media slot. Supply an image or a video; if both are present,
video takes precedence. A nonempty section body is required by the existing
template. Sections without a media source keep their gray placeholder and the
same expand control. The expanded preview is labeled “Image placeholder” until
an image or video is supplied.

The expand control appears at the top-right on hover or keyboard focus and stays
visible on touch devices. It opens a viewport-sized modal with uncropped media.
Close with the close button, Escape, or the area outside the media. Closing
restores focus to the expand control. Videos never autoplay; expanding pauses
the inline player and opens a separate player at the start.
