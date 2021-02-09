//modulos de nucleo
const http = require('http');
var fs  = require('fs');
var path = require('path');
const phone = require('phone');
const url = require('url');

const PORT = 5000;

//modulos locales e importaciones totales
// var operations = require('./utils/operations');

//modulos locales e importaciones parciales
const {multiplication, addition} = require('./utils/operations');

const server = http.createServer((req, res) => {
    console.log(req.url);
    
    const urlData = url.parse(req.url, true);
    const path = urlData.pathname;
    const query = urlData.query;
    console.log("query", query);

    switch (path) {
        case '/':
            res.writeHead(200, {"Content-type":"text/html"});
            res.write("<html><head><meta charset=\"utf-8\" /></head><body>Home</body</html>");
            break;
        case '/info':
            res.writeHead(200, {"Content-type":"application/json"});
            res.write(JSON.stringify({"version": "1.0.0", "appName": "Curso Node.js"}));
            break;
        case '/detail':
            res.writeHead(200, {"Content-type":"text/html"});
            res.write("<html><head><meta charset=\"utf-8\" /></head><body>Detail 😁</body</html>");
            break;
        case '/phone':
            try {
                const result = phone(query.value, query.country.toUpperCase());
                // console.log(query.value);
                res.writeHead(200, {"Content-Type":"application/json"});
                res.write(JSON.stringify(result));
            } catch (e) {
                res.writeHead(500, {"Content-Type":"text/html"});
                res.write("Bad response\n");
                res.write(e.message);

            }
            break;
        default:
            res.writeHead(404, {"Content-type":"text/html"});
            res.write("<html><head><meta charset=\"utf-8\" /></head><body>Not found</body</html>");
    }
    // res.writeHead(200, {"Content-type":"text-html"});
    // res.write("<html><head><meta charset=\"utf-8\" /></head><body>Hello world 😊</body</html>");
    res.end();
});

console.log("✔ adittion", addition(3, 5));
console.log("✔ multiplication", multiplication(3, 5));

server.listen(PORT);