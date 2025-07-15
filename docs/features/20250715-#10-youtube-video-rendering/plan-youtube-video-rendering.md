# YouTube Video Rendering Feature Plan

## Introduction / Overview

This feature adds YouTube video embedding capability to the static blog site. When building the static site, the system will parse a custom YouTube syntax in post content and replace it with responsive YouTube iframe embeds. This enhances the blog's multimedia capabilities while maintaining the static site's performance and portability.

## User Stories

> As a **blog author**, I want to **embed YouTube videos in my posts using simple syntax**, so that I can enrich my content with video without writing HTML.

> As a **blog reader**, I want to **watch embedded YouTube videos directly in blog posts**, so that I can consume multimedia content seamlessly.

> As a **blog maintainer**, I want the **YouTube embeds to be responsive and properly formatted**, so that the site looks professional on all devices.

## Tests

- **What:** YouTube syntax parsing in markdown content
- **How:** Unit tests for the parsing function
- **Why:** Ensures correct transformation of syntax to HTML

- **What:** Generated HTML output format and structure
- **How:** Automated testing of output HTML structure
- **Why:** Verifies correct iframe attributes and responsive wrapper

- **What:** Visual rendering of YouTube embeds
- **How:** Manual testing in browser at different screen sizes
- **Why:** Confirms responsive behavior and proper aspect ratio

## Non-Goals (Out of Scope)

- YouTube API integration for video metadata
- Thumbnail generation or preview images
- Video playlist support
- Custom player controls or styling beyond basic responsive layout
- Video analytics or tracking

## Technical Considerations

- The parser must handle malformed syntax gracefully
- YouTube embed URLs must include proper security parameters
- The 16:9 aspect ratio should be maintained using CSS aspect-ratio or padding-top technique
- Performance impact should be minimal as this runs during build time
- The implementation should follow existing patterns in the build system

## Related Files

- **Static site build system**: Currently processes markdown and generates HTML - this feature will extend the markdown processing to handle YouTube syntax
- **Post rendering logic**: Existing system that converts markdown to HTML - will need modification to include YouTube syntax parsing
- **CSS/styling files**: May need updates to ensure YouTube embeds are properly styled and responsive

## Tasks

1. **Analyze existing build system**
   - 1.1 Locate the markdown processing/HTML generation code
   - 1.2 Understand how the static site build works
   - 1.3 Identify where to inject YouTube parsing logic

2. **Implement YouTube syntax parser**
   - 2.1 Create function to detect `:::youtube{id="..." start="..."}` syntax
   - 2.2 Extract video ID and start time parameters
   - 2.3 Generate appropriate iframe HTML with responsive wrapper
   - 2.4 Handle edge cases (missing start parameter, malformed syntax)

3. **Integrate parser into build system**
   - 3.1 Add YouTube parsing to the markdown processing pipeline
   - 3.2 Ensure proper order of operations with other markdown transformations
   - 3.3 Test with sample content

4. **Test and validate**
   - 4.1 Create test posts with YouTube embeds
   - 4.2 Verify HTML output correctness
   - 4.3 Test responsive behavior on different screen sizes
   - 4.4 Validate YouTube video playback functionality

5. **Documentation and cleanup**
   - 5.1 Update any relevant documentation about post formatting
   - 5.2 Run linting and fix any issues
   - 5.3 Clean up temporary test files