const os = require('os');
const path = require('path');
const uptime = os.uptime();
const hours = Math.floor(uptime / 3600);
const minutes = Math.floor((uptime % 3600) / 60);
const seconds = uptime % 60;

console.log(`System Uptime: ${hours} hours, ${minutes} minutes, ${seconds} seconds`);

const filePath = __filename; 
const pathInfo = path.parse(filePath);

console.log("File Path Information:");
console.log(`Root: ${pathInfo.root}`);
console.log(`Directory: ${pathInfo.dir}`);
console.log(`Base: ${pathInfo.base}`);
console.log(`Name: ${pathInfo.name}`);
console.log(`Extension: ${pathInfo.ext}`);
