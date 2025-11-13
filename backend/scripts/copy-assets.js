const fs = require('fs');
const path = require('path');

const copyRecursiveSync = (src, dest) => {
  try {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();

    if (isDirectory) {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }
      fs.readdirSync(src).forEach((childItemName) => {
        copyRecursiveSync(
          path.join(src, childItemName),
          path.join(dest, childItemName)
        );
      });
    } else if (exists) {
      fs.copyFileSync(src, dest);
    }
  } catch (error) {
    console.warn(`Warning: Could not copy ${src} to ${dest}:`, error.message);
  }
};

// Create dist directory if it doesn't exist
const distDir = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy required directories
const directoriesToCopy = ['prisma', 'uploads', 'temp_uploads'];

directoriesToCopy.forEach((dir) => {
  const src = path.join(__dirname, '..', dir);
  const dest = path.join(distDir, dir);
  
  if (fs.existsSync(src)) {
    console.log(`Copying ${dir} to dist directory...`);
    copyRecursiveSync(src, dest);
  } else {
    console.warn(`Warning: ${dir} directory does not exist, skipping...`);
  }
});

console.log('Asset copy complete.');
