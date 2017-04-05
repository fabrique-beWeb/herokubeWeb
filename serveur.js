var express = require('express'); 
var app = express(); 
app.get('/', function (req, res) { 
res.sendfile(__dirname + '/views/index.html'); 
}); 
app.listen(process.env.PORT);