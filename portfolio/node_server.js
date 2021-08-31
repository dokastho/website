var http = require('http');
var getLinks = require('./script_file.js');

http.createServer(function (req,res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.send(getLinks.links.forEach(elt => {
        `
        <h1>${elt}</h1>
        `
    }));
}).listen(8088,'192.168.0.170');
console.log('Server running at http://192.168.0.170:8088');