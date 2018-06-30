let app = require('./app').app,
    http = require('http');

let server = http.createServer(app);

server.listen(app.get('port'));