//modulos de nucleo
// const http = require('http');
// const url = require('url');
const express = require('express');
const bodyParser = require('body-parser');
var fs  = require('fs');
var path = require('path');
const phone = require('phone');

//Por defecto trae el index.js
const apiV1 = require('./routes/V1');

const PORT = 5000;
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

apiV1(app);

app.get('/', (req, res) => {
    res.status(200).send("<html><head><meta charset=\"utf-8\" /></head><body>Home 😁</body</html>");
    // res.writeHead(200, {"Content-type":"text/html"});
    // res.end();
});

app.get('/info', (req, res) => {
    // res.status(200).send("INFO");
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify({"version": "1.0.0", "appName": "Curso Node.js"}));
    // res.writeHead(200, {"Content-type":"text/html"});
    // res.end();
});

app.get('/detail', (req, res) => {
    res.status(200).send("<html><head><meta charset=\"utf-8\" /></head><body>Detail 😁</body</html>");
    // res.writeHead(200, {"Content-type":"text/html"});
    // res.end();
});

app.post('/login',(req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    if (username === "darwin" && password === "123456") {
        res.send({status:"OK"});
    } else {
        res.status(401).send("ACCESS DENIED");
    }
    res.send("OK");
});

app.get('/phone', (req, res) => {
    try {
        const query = req.query;
        let {value, country} = query;

        // const urlData = url.parse(req.url, true);
        // const path = urlData.pathname;
        // const query = urlData.query;
        console.log("query", query);
        const result = phone(value, country.toUpperCase());
        console.log(query.value);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(result));
    } catch (e) {
        res.status(400).send(e.message);
    }
});

//solo con get, el app.use() sirve con los demas metodos http put, delete, post, get
app.use((req, res) => {
    res.status(400).send("NOT FOUND");
});

//solo con get, el app.use() sirve con los demas metodos http put, delete, post, get
// app.get('*', (req, res) => {
//     res.status(400).send("NOT FOUND");
// });

app.listen(PORT, () => {
    console.log("Running on ", PORT);
});

//modulos locales e importaciones totales
// var operations = require('./utils/operations');

//modulos locales e importaciones parciales
const {multiplication, addition} = require('./utils/operations');

// const server = http.createServer((req, res) => {
//     console.log(req.url);
    
//     const urlData = url.parse(req.url, true);
//     const path = urlData.pathname;
//     const query = urlData.query;
//     console.log("query", query);

//     switch (path) {
//         case '/':
//             res.writeHead(200, {"Content-type":"text/html"});
//             res.write("<html><head><meta charset=\"utf-8\" /></head><body>Home</body</html>");
//             break;
//         case '/info':
//             res.writeHead(200, {"Content-type":"application/json"});
//             res.write(JSON.stringify({"version": "1.0.0", "appName": "Curso Node.js"}));
//             break;
//         case '/detail':
//             res.writeHead(200, {"Content-type":"text/html"});
//             res.write("<html><head><meta charset=\"utf-8\" /></head><body>Detail 😁</body</html>");
//             break;
//         case '/phone':
//             try {
//                 const result = phone(query.value, query.country.toUpperCase());
//                 // console.log(query.value);
//                 res.writeHead(200, {"Content-Type":"application/json"});
//                 res.write(JSON.stringify(result));
//             } catch (e) {
//                 res.writeHead(500, {"Content-Type":"text/html"});
//                 res.write("Bad response\n");
//                 res.write(e.message);

//             }
//             break;
//         default:
//             res.writeHead(404, {"Content-type":"text/html"});
//             res.write("<html><head><meta charset=\"utf-8\" /></head><body>Not found</body</html>");
//     }
//     // res.writeHead(200, {"Content-type":"text-html"});
//     // res.write("<html><head><meta charset=\"utf-8\" /></head><body>Hello world 😊</body</html>");
//     res.end();
// });

console.log("✔ adittion", addition(3, 5));
console.log("✔ multiplication", multiplication(3, 5));

// server.listen(PORT);