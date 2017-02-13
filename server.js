const express = require("express");
const path = require("path");
const useragent = require('express-useragent');
const app = express();

app.use(useragent.express());
app.set('port', process.env.PORT || 3300);

app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api', function(request, response) {
    response.send('You do not belong here');
});

app.get('/api/whoami', function(request, response) {
    var ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress || request.socket.remoteAddress || request.connection.socket.remoteAddress;
    var language = request.headers['accept-language'].substring(0,5);
    var software = request.useragent.os;
    
    var obj = {
      "ipaddress": ip,
      "language": language,
      "software": software
    };
    
    response.json(obj);
});

app.listen(app.get('port'));