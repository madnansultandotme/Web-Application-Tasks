import fs from 'fs';
import readline from 'readline';
import validator from 'validator';
import chalk from 'chalk';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function validateEmail(email) {
    return validator.isEmail(email);
}

function validateIPv4(ip) {
    return validator.isIP(ip, 4);
}

function readFile(filePath) {
    return fs.readFileSync(filePath, 'utf-8').split(',').map(ip => ip.trim()).filter(Boolean);
}

function getNetworkAddress(ip) {
    const parts = ip.split('.');
    parts[3] = '0';
    return parts.join('.');
}

rl.question('Enter your email address: ', (email) => {
    if (!validateEmail(email)) {
        console.log(chalk.red('Invalid email format.'));
        rl.close();
        return;
    }

    rl.question('Enter your IPv4 address: ', (ip) => {
        if (!validateIPv4(ip)) {
            console.log(chalk.red('Invalid IPv4 format.'));
            rl.close();
            return;
        }

        const whiteList = readFile('White.txt');
        const blackList = readFile('Black.txt');

        if (blackList.includes(ip)) {
            console.log(chalk.red('Error: The IP address is blocked.'));
        } else if (whiteList.includes(ip)) {
            console.log(chalk.green('Authentication successful.'));
        } else {
            const userNetwork = getNetworkAddress(ip);
            const networkMatch = whiteList.some(whiteIp => getNetworkAddress(whiteIp) === userNetwork);

            if (networkMatch) {
                console.log(chalk.hex('#FFA500')('Warning: Your IP address belongs to a network whose IP has been authorized. Please contact the administrator.'));
            } else {
                fs.appendFileSync('Pending.txt', `${ip}\n`);
                console.log(chalk.red('Error: Unable to authenticate the IP address.'));
            }
        }

        rl.close();
    });
});
