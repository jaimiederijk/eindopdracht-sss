var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next){

	user=req.session.username;

  req.getConnection(function(err, connection){
    if(err){ return next(err); }

    connection.query('SELECT * FROM users', function(err, users){
      if(err){ return next(err); }
      res.render('home/index', {users: users,req:req});
      console.log(users);
    });
  });

});

module.exports = router;