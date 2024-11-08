
const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'part_1');
const filePath = path.join(__dirname, 'test.txt');

if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
    console.log('Folder "part_1" created successfully.');
}

fs.writeFileSync(filePath, '', 'utf8');
console.log('File "test.txt" created successfully.');

const registrationNumber = '04072113026'; 
fs.writeFileSync(filePath, registrationNumber, 'utf8');
console.log(`Registration number "${registrationNumber}" written to "test.txt".`);

let data = fs.readFileSync(filePath, 'utf8');
console.log('Data read from "test.txt":', data);

const lastFourDigits = registrationNumber.slice(-4);
fs.writeFileSync(filePath, lastFourDigits, 'utf8');
console.log(`File "test.txt" overwritten with last four digits: ${lastFourDigits}`);

data = fs.readFileSync(filePath, 'utf8');
console.log('Data read after overwrite from "test.txt":', data);


fs.writeFileSync(filePath, '', 'utf8');
console.log('Data erased from "test.txt".');

fs.writeFileSync(filePath, registrationNumber, 'utf8');
console.log(`Registration number "${registrationNumber}" re-written to "test.txt".`);
