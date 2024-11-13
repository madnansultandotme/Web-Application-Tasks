const http = require('http');
const url = require('url');
const fs = require('fs');

const port = 8080;


function startServer() {
  const server = http.createServer((req, res) => {
    
    const parsedUrl = url.parse(req.url, true);
    const message = parsedUrl.query.message;

    if (message) {
      console.log(`Received message: ${message}`);

 
      fs.appendFile('chat_history.txt', `Message: ${message}\n`, (err) => {
        if (err) {
          console.error('Error writing to file', err);
        }
      });

      // Send response back to the sender
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Message received and saved.');
    } else {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('No message provided.');
    }
  });

  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

// Function to send a message to another node
function sendMessage(ip, message) {
  const options = {
    hostname: ip,
    port: 8080,
    path: `/path?message=${encodeURIComponent(message)}`,
    method: 'GET'
  };

  const req = http.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      console.log(`Response from ${ip}: ${data}`);
    });
  });

  req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
  });

  req.end();
}

// Start the server
startServer();

// Example usage of sendMessage
// Replace '192.168.2.2' with the IP address of the node you want to message
// sendMessage('172.16.19.191', 'Hello from Node A!');
