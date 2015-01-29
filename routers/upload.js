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

		res.render('upload/form');
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
			files: files
		});
	});
	console.log(req.body.file)
});
router.post("/showuploads",function(req,res){
	photoId;
	date=new date();
	req.getConnection(function(err, connection){
		if(err){ next(err); }

		connection.query("SELECT id FROM photos WHERE id=(?)", [req.session.username], function(err, records){
			if(err){ next(err); }

			photoId =   records[0].id;
		});
	});

	req.getConnection(function(err, connection){
		if(err){ next(err); }

		connection.query("INSERT INTO comments (photo_id, created_at ,comment) VALUES (?)", [[photoId,date,req.body.comment]], function(err, records){
		if(err){ next(err); }



	});
})
module.exports = router;