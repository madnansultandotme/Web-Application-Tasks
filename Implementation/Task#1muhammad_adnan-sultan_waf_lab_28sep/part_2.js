const fs = require('fs');
const path = require('path');

const inputFilePath = path.join(__dirname, 'IPs.txt');
const aFilePath = path.join(__dirname, 'A.txt');
const bFilePath = path.join(__dirname, 'B.txt');
const cFilePath = path.join(__dirname, 'C.txt');


fs.writeFileSync(aFilePath, '', 'utf8');
fs.writeFileSync(bFilePath, '', 'utf8');
fs.writeFileSync(cFilePath, '', 'utf8');


function getClass(ip) {
    const firstOctet = parseInt(ip.split('.')[0], 10);

    if (firstOctet >= 1 && firstOctet <= 126) {
        return 'A';
    } else if (firstOctet >= 128 && firstOctet <= 191) {
        return 'B';
    } else if (firstOctet >= 192 && firstOctet <= 223) {
        return 'C';
    } else {
        return null; 
    }
}

const ipAddresses = fs.readFileSync(inputFilePath, 'utf8').split('\n').map(ip => ip.trim()).filter(ip => ip);


ipAddresses.forEach(ip => {
    const ipClass = getClass(ip);

    if (ipClass === 'A') {
        fs.appendFileSync(aFilePath, `${ip}\n`, 'utf8');
    } else if (ipClass === 'B') {
        fs.appendFileSync(bFilePath, `${ip}\n`, 'utf8');
    } else if (ipClass === 'C') {
        fs.appendFileSync(cFilePath, `${ip}\n`, 'utf8');
    } else {
        console.log(`IP address ${ip} does not fall under Class A, B, or C.`);
    }
});

console.log('IP addresses have been sorted into A.txt, B.txt, and C.txt based on their class.');
