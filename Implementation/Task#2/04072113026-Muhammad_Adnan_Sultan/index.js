const http=require('http');
const express=require('express');
const users=require('./database.json');
const fs = require('fs');
const app=express();

//middleware
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.send('Hello World');
});
app.get("/home",(req,res)=>{

    res.send("Welcome to home page  "+req.query.name);
});
app.get("/about",(req,res)=>{

    res.send("Welcome to About  "+req.query.name);
});
app.get("/api/users",(req,res)=>{

    res.send(users);
});
//Users Route
app.get("/api/users/:id", (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = users.find(u => u.id === userId);
    if (user) {
        res.send(user);
    } else {
        res.status(404).send({ error: "User not found" });
    }
});
app.get("/api/users/:name", (req, res) => {
    const userName = req.params.name.toLowerCase();
    const user = users.find(u => u.first_name.toLowerCase() === userName || u.last_name.toLowerCase() === userName);
    if (user) {
        res.send(user);
    } else {
        res.status(404).send({ error: "User not found" });
    }
});
app.post("/api/users", (req, res) => {
    const { first_name, last_name, email, gender, ip_address } = req.body;
    const newUser = {
        id: users.length + 1,
        first_name,
        last_name,
        email,
        gender,
        ip_address
    };
    users.push(newUser);

    // Write the updated users array to the file
    fs.writeFile('./database.json', JSON.stringify(users, null, 2), (err) => {
        if (err) {
            console.error('Error writing to file', err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
        console.log(newUser);
        res.json({ message: "User added successfully", user: newUser });
    });
});
app.get("/IPAddress",(req,res)=>{        
const classifyIP = (ip) => {
    const firstOctet = parseInt(ip.split('.')[0], 10);
    if (firstOctet >= 1 && firstOctet <= 126) return 'Class A';
    if (firstOctet >= 128 && firstOctet <= 191) return 'Class B';
    if (firstOctet >= 192 && firstOctet <= 223) return 'Class C';
    if (firstOctet >= 224 && firstOctet <= 239) return 'Class D';
    if (firstOctet >= 240 && firstOctet <= 255) return 'Class E';
    return 'Unknown';
};

const classifiedUsers = users.map(user => ({
    ...user,
    ip_class: classifyIP(user.ip_address)
}));

const classAUsers = classifiedUsers.filter(user => user.ip_class === 'Class A');
const classBUsers = classifiedUsers.filter(user => user.ip_class === 'Class B');
const classCUsers = classifiedUsers.filter(user => user.ip_class === 'Class C');
const classDUsers = classifiedUsers.filter(user => user.ip_class === 'Class D');
const classEUsers = classifiedUsers.filter(user => user.ip_class === 'Class E');

fs.writeFile('A.json', JSON.stringify(classAUsers, null, 2), (err) => {
    if (err) {
        console.error('Error writing to A.json', err);
    } else {
        console.log('A.json written successfully');
    }
});

fs.writeFile('B.json', JSON.stringify(classBUsers, null, 2), (err) => {
    if (err) {
        console.error('Error writing to B.json', err);
    } else {
        console.log('B.json written successfully');
    }
});

fs.writeFile('C.json', JSON.stringify(classCUsers, null, 2), (err) => {
    if (err) {
        console.error('Error writing to C.json', err);
    } else {
        console.log('C.json written successfully');
    }
});
fs.writeFile('D.json', JSON.stringify(classDUsers, null, 2), (err) => {
    if (err) {
        console.error('Error writing to D.json', err);
    } else {
        console.log('D.json written successfully');
    }
});

fs.writeFile('E.json', JSON.stringify(classEUsers, null, 2), (err) => {
    if (err) {
        console.error('Error writing to E.json', err);
    } else {
        console.log('E.json written successfully');
    }
});

res.send({ message: "IP addresses have been classified and written to files." });
});
//route to get ips by Ip class from .txt files amd append them in tables format
const classFiles = ['A.json', 'B.json', 'C.json', 'D.json', 'E.json'];

const readFileAsync = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
};
// routes for Ip clases
app.get("/api/users/class/:Class", async (req, res) => {
    const className = req.params.Class.toUpperCase();
    const fileName = `${className}.json`;

    if (!classFiles.includes(fileName)) {
        return res.status(400).send({ error: "Invalid IP class" });
    }

    try {
        const users = await readFileAsync(fileName);
        const html = `
            <style>
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th, td {
                    padding: 8px;
                    text-align: left;
                    border-bottom: 1px solid #ddd;
                }
                th {
                    background-color: #f2f2f2;
                }
                tr:hover {
                    background-color: #f5f5f5;
                }
            </style>
            <table>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>IPAddress</th>
                    <th>IP Class</th>
                </tr>
                ${users.map(user => `
                    <tr>
                        <td>${user.first_name}</td>
                        <td>${user.last_name}</td>
                        <td>${user.email}</td>
                        <td>${user.gender}</td>
                        <td>${user.ip_address}</td>
                        <td>${user.ip_class}</td>
                    </tr>
                `).join('')}
            </table>
        `;
        res.send(html);
    } catch (err) {
        console.error('Error reading file', err);
        res.status(500).send({ error: "Internal Server Error" });
    }
});
//Route to patch the user email by id
app.patch("/api/users/:id", (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        const { email } = req.body;
        if (email) {
            users[userIndex].email = email;

            fs.writeFile('./database.json', JSON.stringify(users, null, 2), (err) => {
                if (err) {
                    console.error('Error writing to file', err);
                    return res.status(500).json({ message: "Internal Server Error" });
                }
                res.json({ message: "User email updated successfully", user: users[userIndex] });
            });
        } else {
            res.status(400).send({ error: "Email is required" });
        }
    } else {
        res.status(404).send({ error: "User not found" });
    }
});
//Route to delete the user by id
app.delete("/api/users/:id", (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex !== -1) {
        const deletedUser = users.splice(userIndex, 1)[0];

        fs.writeFile('./database.json', JSON.stringify(users, null, 2), (err) => {
            if (err) {
                console.error('Error writing to file', err);
                return res.status(500).json({ message: "Internal Server Error" });
            }
            res.json({ message: "User deleted successfully", user: deletedUser });
        });
    } else {
        res.status(404).send({ error: "User not found" });
    }
});
app.get("/api/users/:id", (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = users.find(u => u.id === userId);
    if (user) {
        res.send(user);
    } else {
        res.status(404).send({ error: "User not found" });
    }
});
// Route to get users with .org email in table format
app.get("/org/users",(req,res)=>{
    const filteredUsers = users.filter(user => user.email.includes('.org'));
    const html = `
        <style>
            table {
                width: 100%;
                border-collapse: collapse;
            }
            th, td {
                padding: 8px;
                text-align: left;
                border-bottom: 1px solid #ddd;
            }
            th {
                background-color: #f2f2f2;
            }
            tr:hover {
                background-color: #f5f5f5;
            }
        </style>
        <table>
            <tr>
             <th>Serial</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
            </tr>
            ${filteredUsers.map(user => `
                <tr>
                <td>${user.id}</td>
                    <td>${user.first_name}</td>
                    <td>${user.last_name}</td>
                    <td>${user.email}</td>
                </tr>
            `).join('')}
        </table>
    `;
    res.send(html);
});
// Route to get users with .com email in table format
app.get("/com/users",(req,res)=>{
    const filteredUsers = users.filter(user => user.email.includes('.com'));
    const html = `
        <style>
            table {
                width: 100%;
                border-collapse: collapse;
            }
            th, td {
                padding: 8px;
                text-align: left;
                border-bottom: 1px solid #ddd;
            }
            th {
                background-color: #f2f2f2;
            }
            tr:hover {
                background-color: #f5f5f5;
            }
        </style>
        <table>
            <tr>
             <th>Serial</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
            </tr>
            ${filteredUsers.map(user => `
                <tr>
                <td>${user.id}</td>
                    <td>${user.first_name}</td>
                    <td>${user.last_name}</td>
                    <td>${user.email}</td>
                </tr>
            `).join('')}
        </table>
    `;
    res.send(html);
});
// Route to get users with .org email in json Format
app.get("/api/org/users",(req,res)=>{
    const filteredUsers = users.filter(user => user.email.includes('.org'));
    res.send(filteredUsers);
});
// Route to get users with .com email in json Format
app.get("/api/com/users",(req,res)=>{
    const filteredUsers = users.filter(user => user.email.includes('.com'));
    res.send(filteredUsers);
});
//Route to render the users by id in table format
app.get("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = users.find(u => u.id === userId);
    if (user) {
        const html = `
            <style>
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th, td {
                    padding: 8px;
                    text-align: left;
                    border-bottom: 1px solid #ddd;
                }
                th {
                    background-color: #f2f2f2;
                }
                tr:hover {
                    background-color: #f5f5f5;
                }
            </style>
            <table>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>IPAddress</th>
                </tr>
                <tr>
                    <td>${user.first_name}</td>
                    <td>${user.last_name}</td>
                    <td>${user.email}</td>
                    <td>${user.gender}</td>
                    <td>${user.ip_address}</td>
                </tr>
            </table>
        `;
        res.send(html);
    } else {
        res.status(404).send({ error: "User not found" });
    }
});
app.get("/users", (req, res) => {
    const html = `
        <style>
            table {
                width: 100%;
                border-collapse: collapse;
            }
            th, td {
                padding: 8px;
                text-align: left;
                border-bottom: 1px solid #ddd;
            }
            th {
                background-color: #f2f2f2;
            }
            tr:hover {
                background-color: #f5f5f5;
            }
        </style>
        <table>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>IPAddress</th>
            </tr>
            ${users.map(user => `
                <tr>
                    <td>${user.first_name}</td>
                    <td>${user.last_name}</td>
                    <td>${user.email}</td>
                    <td>${user.gender}</td>
                    <td>${user.ip_address}</td>
                </tr>
            `).join('')}
        </table>
    `;
    res.send(html);
});
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});