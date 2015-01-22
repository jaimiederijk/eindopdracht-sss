// users.js

var express = require('express');
var router =  express.Router();

router.get("/", function(req, res) {
	if(req.session.username){
		res.send("welcome, " + req.session.username);
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
	if(username === 'admin' &&
		password === 'admin'){
		req.session.username =  username;
		res.redirect('/users');
	} else {
		res.send('Wachtwoord of gebruikersnaam is onjuist!')
	}
});

module.exports = router;