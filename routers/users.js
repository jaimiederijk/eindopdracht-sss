// users.js

var express = require('express');
var router =  express.Router();


router.get("/", function(req, res) {
	req:req
	if(req.session.username){
		res.redirect("../upload/showuploads");
		
		// res.send("welcome, " + req.session.username);
	} else {
		res.redirect("/users/login");
	}
});

router.get('/login', function(req, res) {
	res.render('users/login',{req:req});
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
		res.render('users/profiel',{
			req:req
		});
	}
	else {
		res.redirect(req.baseUrl + '/');
	}	
});
router.get("/logout",function(req,res){
	delete req.session.username;
	res.render('users/logout',{
		req:req
	});
});
router.get("/signup",function(req,res){
	res.render("users/signup",{
		req:req
	});
});

router.post("/signup", function(req, res, next){
	req.getConnection(function(err, connection){
		if(err){ next(err); }

		connection.query("INSERT INTO users (name, password) VALUES (?)", [[req.body.name, req.body.password]], function(err, records){
			if(err){ next(err); }

			if(records.affectedRows == 1){
				res.redirect("/users");
			} else {
				res.render("users/signup", {req: req});
			}
		});
	})
});

	
module.exports = router;