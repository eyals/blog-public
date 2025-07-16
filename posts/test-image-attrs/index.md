---
id: "test-image-attrs"
title: "Test Image Attributes"
slug: "test-image-attributes"
seo_title: "Testing Custom Image Attributes"
excerpt: "Testing the new custom image attribute syntax"
publish_date: "2025-07-15"
featured: false
published: true
---

# Testing Custom Image Attributes

This post tests the new custom image attribute syntax that allows scaling and captions.

## Basic Scale Test

Small image at 50% scale:
[0.5](zadok.jpg "Small version")

Normal image at 100% scale:
[1.0](zadok.jpg "Normal size")

Large image at 150% scale:  
[1.5](zadok.jpg "Large version")

## Without Captions

Image without caption:
[0.75](zadok.jpg)

## Mixed Content Test

Here's some regular text before an image.

[0.8](zadok.jpg "This should appear as a caption below the image")

And here's some text after the image to verify layout.

## Standard Markdown Images (Should Still Work)

![Standard markdown image](zadok.jpg "Traditional markdown syntax")

## End Test

This concludes the image attribute testing.