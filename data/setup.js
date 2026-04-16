// Run this script to set up the project:
// node data/setup.js

const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'Personal Portfolio Website Template _ Mobile & Desktop (Community)', 'Home', 'Desktop');
const destDir = path.join(__dirname, '..', 'public', 'icons');
const imgDir = path.join(__dirname, '..', 'public', 'images');
const uploadsDir = path.join(__dirname, '..', 'public', 'uploads');

// Create directories
[destDir, imgDir, uploadsDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created: ${dir}`);
  }
});

// Copy SVG icon files (non -1 variants)
if (fs.existsSync(srcDir)) {
  const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.svg') && !f.includes('-1'));
  files.forEach(file => {
    fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
    console.log(`Copied: ${file}`);
  });
  console.log(`\n✅ Copied ${files.length} icon files to public/icons/`);
} else {
  console.log('⚠️  Figma assets folder not found. Icons will use fallback placeholders.');
}

// Copy resume PDF
const resumeSrc = path.join(__dirname, '..', 'Ahmad_Raza_d.pdf');
const resumeDest = path.join(__dirname, '..', 'public', 'resume.pdf');
if (fs.existsSync(resumeSrc)) {
  fs.copyFileSync(resumeSrc, resumeDest);
  console.log('✅ Copied resume.pdf to public/');
}

// Create .gitkeep for uploads
const gitkeep = path.join(uploadsDir, '.gitkeep');
if (!fs.existsSync(gitkeep)) {
  fs.writeFileSync(gitkeep, '');
}

console.log('\n🎉 Setup complete! Run: npm run dev');
