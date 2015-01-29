//upload
var fs = require("fs")
var express = require('express');
var router =  express.Router();


var user;

router.get('/', function(req, res,next) {

	if (req.session.username) {
		

		req.getConnection(function(err, connection){
			if(err){ next(err); }

			connection.query("SELECT id FROM users WHERE name=(?)", [req.session.username], function(err, records){
				if(err){ next(err); }

				user =   records[0].id;
			});
		});

		res.render('upload/form',{
			req:req
		});
	}
	else {
		res.redirect("/users/login");
	}
	
});
var filesPath = __dirname + '/../public/uploads/';


router.post('/', function (req, res, next){
	// File path
	var caption = req.body.caption;
	var upload = req.files.imageFile;
	
	var filename = upload.originalname;

	req.getConnection(function(err, connection){
		if(err){ next(err); }

		connection.query("INSERT INTO photos (caption, user_id ,filename) VALUES (?)", [[caption,user,filename]], function(err, records){
			if(err){ next(err); }

			if(records.affectedRows == 1){
			    fs.rename(upload.path, filesPath + upload.originalname, function (err){
					if (err){
						res.send('Something went wrong!');
					} else {
						res.redirect(req.baseUrl + '/showuploads');
					}
				});
     		}

		});
	});

});
router.get('/showuploads', function (req, res){

	
	fs.readdir(filesPath, function (err, files){
		if (err){
			res.send('Cannot access directory');
		}
		res.render('upload/index',{
			files: files,
			req:req
		});
	});
	console.log(req.body.file)
});




router.post("/showuploads",function(req,res){
	


})
module.exports = router;