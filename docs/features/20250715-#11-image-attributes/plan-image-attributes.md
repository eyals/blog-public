# Plan: Image Attribute Rendering

## Introduction / Overview

This feature implements support for custom image attributes in markdown posts, allowing authors to specify image scaling and captions using a custom syntax. Instead of standard markdown image syntax, authors can use `[scale](filename "title")` format where the scale value controls image size and the title becomes both alt text and a visible caption below the image.

This builds on the existing markdown processing pipeline by adding custom post-processing similar to the current YouTube embed handling, ensuring consistent integration with the existing content management workflow.

## User Stories

> As a **blog author**, I want to specify image scaling in my markdown, so that I can control how large images appear without external image editing.

> As a **blog author**, I want to add captions to my images using the title attribute, so that readers can understand the context of each image.

> As a **blog reader**, I want to see properly sized images with descriptive captions, so that I can better understand the visual content.

> As a **content maintainer**, I want the image syntax to be processed during build time, so that the static site generation remains fast and efficient.

## Tests

- **What:** Custom image syntax parsing and HTML generation
- **How:** Unit tests for regex matching and HTML output generation
- **Why:** Ensures correct parsing of scale values and proper HTML structure

- **What:** Image scaling CSS application
- **How:** Visual testing of rendered images at different scale values
- **Why:** Verifies that scaling actually affects image display size correctly

- **What:** Caption rendering and accessibility
- **How:** Manual testing of alt text and caption display
- **Why:** Ensures images remain accessible and captions are visible

- **What:** Integration with existing markdown processing
- **How:** Test posts with mixed content (standard images, custom images, other elements)
- **Why:** Prevents breaking existing functionality while adding new features

## Non-Goals (Out of Scope)

- Advanced image optimization or compression
- Responsive image generation with multiple sizes
- Image lazy loading or performance enhancements
- Interactive image features (zoom, lightbox, etc.)
- Support for other image attributes beyond scale and caption
- Migration of existing standard markdown images to new syntax

## Technical Considerations

The implementation follows the existing pattern used for YouTube embed processing in `posts.ts`. Custom image syntax will be processed after standard markdown rendering using regex replacement, maintaining compatibility with the current build pipeline.

Scale values will be applied using CSS `width` percentage, maintaining aspect ratio. Caption styling needs to integrate with the existing prose styling without conflicting with other content elements.

## Related Files

**`/src/lib/posts.ts`** (lines 114-136)
- Currently handles markdown to HTML conversion using remark
- Contains YouTube embed custom processing that serves as template
- Will be extended with custom image processing logic

**`/src/styles/globals.css`** (lines 185-188)
- Currently styles images with border-radius and shadow
- Will be extended with caption styling and responsive scaling

**`/scripts/copy-images.js`**
- Handles image file copying during build process
- No changes needed but must remain compatible with new syntax

**`/pages/[slug].tsx`** (line 145)
- Renders processed HTML content with prose styling
- No direct changes needed but must handle new HTML structure

## Tasks

1. **Implement custom image syntax processing**
   - 1.1 Add regex pattern to match `[scale](filename "title")` syntax in posts.ts
   - 1.2 Create function to generate HTML with scale styling and caption
   - 1.3 Integrate processing after standard markdown conversion
   - 1.4 Test regex matching with various input formats

2. **Add CSS styling for scaled images and captions**
   - 2.1 Add CSS rules for image scaling based on percentage width
   - 2.2 Create caption styling that integrates with prose theme
   - 2.3 Ensure responsive behavior and mobile compatibility
   - 2.4 Test visual appearance across different devices

3. **Test and validate implementation**
   - 3.1 Create test content with various scale values and captions
   - 3.2 Verify accessibility with screen readers
   - 3.3 Test integration with existing content formats
   - 3.4 Validate build process and static generation