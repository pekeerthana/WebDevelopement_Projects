/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from 'inquirer';
import fs from 'fs';
import qr from 'qr-image';

const questions = [
  {
    type: 'input',
    name: 'url',
    message: "What's the URL you want to convert to a QR code?",
  }];
  inquirer.prompt(questions).then((answers) => {

    var qr_svg = qr.image(answers.url, { type: 'png' });
    qr_svg.pipe(fs.createWriteStream('qr.png'));
    fs.writeFile('URL.txt',answers.url, (err) => {
      if (err) {
        console.error('Error writing file:', err);
      } else {
        console.log('File written successfully');
      }
    }
    );
    console.log(JSON.stringify(answers, null, '  '));
  });


