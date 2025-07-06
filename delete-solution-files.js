const fs = require('fs');
const path = require('path');

// Directory to search
const baseDir = path.resolve(__dirname, '../../'); // points to WebDevelopement_Projects

function deleteSolutionFiles(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      deleteSolutionFiles(fullPath);
    } else if (entry.isFile() && entry.name.startsWith('solution')) {
      fs.unlinkSync(fullPath);
      console.log(`Deleted: ${fullPath}`);
    }
  });
}
console.log('Starting to delete solution files...');
console.log(`Searching in directory: ${baseDir}`);
deleteSolutionFiles(baseDir);
console.log('Done deleting solution files.');