var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
	if (req.session.username){
		user = "Welcome "+req.session.username;//stuurt username door naar template
		userLog ="Logout" ;
	}
	else {
		user=null;
		userLog="Login";
	};

  req.getConnection(function(err, connection){
    if(err){ return next(err); }

    connection.query('SELECT * FROM users', function(err, users){
      if(err){ return next(err); }
      res.render('test/index', {users: users});
      console.log(users);
    });
  });

});

module.exports = router;