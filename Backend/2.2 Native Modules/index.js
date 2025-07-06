const fs = require('node:fs');

fs.writeFile('test.txt', 'Hello, World!', (err) => {
  if (err) {
    console.error('Error writing file:', err);
  } else {
    console.log('File written successfully');
  }
});

fs.readFile('test.txt', 'utf8', (err, data) => {
  if (err) {console.error('Error reading file:', err);}
  else{console.log(data);}
});