var express = require('express'); 
var app = express(); 
app.get('/', function (req, res) { 
res.sendfile(__dirname + '/views/index.html'); 
});
app.get('/client', function(request,response){
	var object = {
		"nom" : "derrieux",
		"prenom" : "loic"
	};
	response.setHeader('Content-Type', 'application/json');
    response.send(JSON.stringify(object));
} );
app.listen(process.env.PORT);