var express = require('express'); 
var sqlite3 = require('sqlite3').verbose(); 

//Database
var setRet = function (err,row){
	retour.push("hello");
};
 
var retour = {};
//serveur web
var app = express(); 
app.get('/', function (req, res) { 
	res.sendFile(__dirname + '/views/index.html'); 
});
app.get('/client', function(request,response){
	var object = {
		"nom" : "derrieux",
		"prenom" : "loic"
	};
	response.setHeader('Content-Type', 'application/json');
    response.json(object);
} );
app.get('/sqlite',function(req,res){
	
	var test = "";
	var i = 0;
	var db = new sqlite3.Database(':memory:');

db.serialize(function() {
  db.run("CREATE TABLE lorem (info TEXT)");

  var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  for (var i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
  }
  stmt.finalize();

  db.each("SELECT rowid AS id, info FROM lorem;",setRet);
});

db.close();

	res.setHeader('Content-Type', 'application/json');
	res.json(retour);
});
app.listen(process.env.PORT || 12107);