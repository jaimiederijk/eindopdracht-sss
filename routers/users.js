// users.js

var express = require('express');
var router =  express.Router();

router.get("/", function(req, res) {
	if(req.session.username){
		res.redirect("/users/profiel");
		
		// res.send("welcome, " + req.session.username);
	} else {
		res.redirect("/users/login");
	}
});

router.get('/login', function(req, res) {
	res.render('users/login');
});

router.post('/login', function(req, res){
	var username = req.body.username;
	var password = req.body.password;
	req.getConnection(function(err, connection){
    	if(err){ return next(err); }

    	connection.query('SELECT * FROM users WHERE name = ? AND password = ?',[username, password],function(err, records){	
    		if(err){ next(err); }

			if(records.length > 0){ 	//wanneer hij iets heeft kunnen ophalen is het groter dan nul				
				
				req.session.username =   records[0].name;
				res.redirect(req.baseUrl + '/');
			} 
			else {
				res.send('Wachtwoord of gebruikersnaam is onjuist!')
			}
		});
	});
});
router.get("/profiel",function(req,res){
	if (req.session.username) {
		user=req.session.username;
		res.render('users/profiel');
	}
	else {
		res.redirect(req.baseUrl + '/');
	}	
});
router.get("/logout",function(req,res){
	delete req.session.username;
	res.render('users/logout');
});
module.exports = router;