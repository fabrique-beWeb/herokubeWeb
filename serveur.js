var http = require('http'); 
var serveur = http.createServer(function(req, res) { 
    res.writeHead(200, {"Content-Type": "text/html"}); 
    res.write
('<!doctype html>' 
+'<html lang="fr">' 
+'<head>' 
+'<meta Charest="utf-8">' 
+'<title>nodeJS</title>' 
+'</head>' 
+'<body>' 
+'<h1>Hello World! Ceci est un titre</h1>' 
+'<p>Ceci est un <strong>paragraphe</strong>.</p>' 
+'</body>' 
+'</html>');
res.end();
}); 
serveur.listen(80);