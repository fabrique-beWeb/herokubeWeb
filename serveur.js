var express = require('express'); 
var sqlite = require('sqlite3').verbose(); 

//Database
var db = new sqlite.Database(':memory:');
 
db.serialize(function() {
  db.run("CREATE TABLE lorem (info TEXT)");
 
  var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  for (var i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
  }
  stmt.finalize();
 

});
 

//serveur web
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
app.get('/sqlite',function(req,res){
	var retour = {};
	db.serialize(function() {
		db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
		  var ligne = row.id + ": " + row.info;
		  retour.push(ligne);
		db.close();  
	});
	  
  });
  
  response.setHeader('Content-Type', 'application/json');
    response.send(JSON.stringify(retour));
});
app.listen(process.env.PORT);