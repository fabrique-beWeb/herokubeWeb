var express = require('express'); 
var sqlite3 = require('sqlite3').verbose(); 

//Database
var db = new sqlite3.Database('database/database');


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

app.get('/sqlite3',function(req,res){
	db.all("SELECT rowid AS id, info FROM lorem;",function(err,rows){
		res.setHeader('Content-Type', 'application/json');
		res.json(rows); 
	});
});


app.post('/init',function(req,res){
	db.serialize(function() {
		db.run("DROP TABLE IF EXISTS lorem");
		db.run("CREATE TABLE IF NOT EXISTS lorem (info TEXT)");

		var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
		for (var i = 0; i < 10; i++) {
			stmt.run("hello !!!!!" + i);
		}
		stmt.finalize();
		

	}); 
	res.redirect('/sqlite3');
	//res.status(200).send();
});





app.listen(process.env.PORT || 12107);