const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDirectory = path.join(process.cwd(), 'posts');
const outDirectory = path.join(process.cwd(), 'out');

// Image file extensions to copy
const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'];

function isImageFile(filename) {
  const ext = path.extname(filename).toLowerCase();
  return imageExtensions.includes(ext);
}

function shouldSkipFile(filename) {
  // Skip files with '.original.' in filename
  return filename.includes('.original.');
}

function getPostSlugMapping() {
  const mapping = {};
  
  if (!fs.existsSync(postsDirectory)) {
    console.log('Posts directory does not exist');
    return mapping;
  }

  const postFolders = fs.readdirSync(postsDirectory);
  
  for (const folder of postFolders) {
    // Skip _trash folder and non-directories
    if (folder === '_trash' || folder === 'index.json') {
      continue;
    }
    
    const folderPath = path.join(postsDirectory, folder);
    const indexFile = path.join(folderPath, 'index.md');
    
    if (!fs.statSync(folderPath).isDirectory() || !fs.existsSync(indexFile)) {
      continue;
    }

    try {
      const fileContents = fs.readFileSync(indexFile, 'utf8');
      const { data } = matter(fileContents);
      
      // Only process published posts with slugs
      if (data.published && data.slug) {
        mapping[folder] = data.slug;
      }
    } catch (error) {
      console.error(`Error reading post ${folder}:`, error);
    }
  }
  
  return mapping;
}

function copyImages() {
  console.log('Starting image copying process...');
  
  const postSlugMapping = getPostSlugMapping();
  const copiedImages = [];
  
  for (const [postId, slug] of Object.entries(postSlugMapping)) {
    const postDir = path.join(postsDirectory, postId);
    const outDir = path.join(outDirectory, slug);
    
    // Create output directory if it doesn't exist
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }
    
    // Read all files in the post directory
    const files = fs.readdirSync(postDir);
    
    for (const file of files) {
      // Skip non-image files
      if (!isImageFile(file)) {
        continue;
      }
      
      // Skip files with '.original.' in filename
      if (shouldSkipFile(file)) {
        console.log(`Skipping ${file} (contains '.original.')`);
        continue;
      }
      
      const srcPath = path.join(postDir, file);
      const destPath = path.join(outDir, file);
      
      try {
        // Copy the image file
        fs.copyFileSync(srcPath, destPath);
        copiedImages.push(`${slug}/${file}`);
        console.log(`Copied: ${postId}/${file} -> ${slug}/${file}`);
      } catch (error) {
        console.error(`Error copying ${srcPath} to ${destPath}:`, error);
      }
    }
  }
  
  console.log(`\nImage copying completed. Total images copied: ${copiedImages.length}`);
  
  if (copiedImages.length > 0) {
    console.log('\nCopied images:');
    copiedImages.forEach(image => console.log(`  - ${image}`));
  }
}

// Run the script
copyImages();