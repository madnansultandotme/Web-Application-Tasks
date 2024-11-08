const http = require('http');
const fs = require('fs');
const url = require('url');

// Ensure text files are created if they don’t exist
const files = ['log.txt', 'users.txt', 'products.txt', 'books.txt'];
files.forEach(file => {
    if (!fs.existsSync(file)) {
        fs.writeFileSync(file, '', 'utf8');
    }
});

let requestCount = 0;

function logRequest(reqUrl) {
    requestCount++;
    const currentTime = new Date();
    const logEntry = `${requestCount} | ${currentTime.toLocaleString()} | ${reqUrl.pathname} | ${Object.keys(reqUrl.query).length} query parameters\n`;
    
    // Append to log.txt
    fs.appendFileSync('log.txt', logEntry, 'utf8');
}

function saveDataToFile(filename, data) {
    fs.appendFileSync(filename, `${data}\n`, 'utf8');
}

const server = http.createServer((req, res) => {
    const reqUrl = url.parse(req.url, true);
    logRequest(reqUrl);

    // Routing logic
    if (reqUrl.pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end("Welcome to the Homepage!");

    } else if (reqUrl.pathname === '/users') {
        const { id, name, age, city, uni } = reqUrl.query;
        const userData = `ID: ${id}, Name: ${name}, Age: ${age}, City: ${city}, University: ${uni}`;
        saveDataToFile('users.txt', userData);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end("User data saved successfully!");

    } else if (reqUrl.pathname === '/products') {
        const { id, title, price } = reqUrl.query;
        const productData = `ID: ${id}, Title: ${title}, Price: ${price}`;
        saveDataToFile('products.txt', productData);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end("Product data saved successfully!");

    } else if (reqUrl.pathname === '/books') {
        const { id, title, edition, year, press } = reqUrl.query;
        const bookData = `ID: ${id}, Title: ${title}, Edition: ${edition}, Year: ${year}, Press: ${press}`;
        saveDataToFile('books.txt', bookData);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end("Book data saved successfully!");

    } else if (reqUrl.pathname === '/display') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        const logContent = fs.readFileSync('log.txt', 'utf8');
        res.end(`Log file content:\n${logContent}`);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end("404 Not Found");
    }
});

// Server listening on port 3000
server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
