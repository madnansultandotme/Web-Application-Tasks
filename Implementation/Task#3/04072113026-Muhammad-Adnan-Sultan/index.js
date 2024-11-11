const express=require('express');
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const prompt = require('prompt');
const app=express();
const port=3000;
app.get('/',(req,res)=>{
    res.send('Task 3');
});
// Create a chat room on the local network of the lab. 
// (i) To send a message, you will use the IP address of the receiver node instead 
// of the local host (192.168.2.1:8080?message=”your_message”) 
// (ii) To receive a message, you will create a server on your node listening on 
// port 8080. Use URL module to parse the request url and extract the 
// message. 
// (iii) Using the file system module, keep the history of the chats. 
// Function to send a message
// Function to send a message

// Create a server to receive messages
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const message = parsedUrl.query.message;

    if (req.method === 'GET' && !message) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <html>
                <body>
                    <form action="/" method="get">
                        <label for="message">Enter your message:</label>
                        <input type="text" id="message" name="message">
                        <button type="submit">Send</button>
                    </form>
                </body>
            </html>
        `);
    } else if (message) {
        const logFile = path.join(__dirname, 'chat_history.txt');
        fs.appendFile(logFile, `Received message: ${message}\n`, err => {
            if (err) {
                console.error(`Error writing to log file: ${err.message}`);
            }
        });

        res.writeHead(302, { 'Location': '/' });
        res.end();
    } else {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('No message received');
    }
});

server.listen(8080, () => {
    console.log('Chat server listening on port 8080');
});
app.listen(port,()=>{
    console.log(`Server running on port ${"http:localhost:"+port}`);
});