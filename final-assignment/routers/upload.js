//upload
var fs = require("fs")
var express = require('express');
var router =  express.Router();


router.get('/', function(req, res) {
	if (req.session.username) {
		res.render('upload/form');
	}
	else {
		res.redirect("/users/login");
	}
	
});
var filesPath = __dirname + '/../public/uploads/';
router.post('/', function (req, res){
	// File path
	
	var upload = req.files.imageFile;

	fs.rename(upload.path, filesPath + upload.originalname, function (err){
		if (err){
			res.send('Something went wrong!');
		} else {
			res.redirect(req.baseUrl + '/showuploads');
		}
	});
});
router.get('/showuploads', function (req, res){
	
	fs.readdir(filesPath, function (err, files){
		if (err){
			res.send('Cannot access directory');
		}
		res.render('upload/index',{
			files: files
		});
	});
	


});
module.exports = router;