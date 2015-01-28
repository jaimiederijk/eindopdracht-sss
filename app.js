var express = require('express');
var path = require('path');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var bodyParser = require('body-parser');
var multer = require('multer');
var mysql = require('mysql');
var myConnection = require('express-myconnection');
var userRoutes = require('./routers/users');
var uploadRoutes = require('./routers/upload');

//  =================
//  = Setup the app =
//  =================

// The app itself
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//  ============================
//  = Middleware configuration =
//  ============================

// Setup serving static assets
app.use(express.static(path.join(__dirname, 'public')));

// Add session support
app.use(session({
  secret: '...',
  store: new FileStore(),
  saveUninitialized: true,
  resave: false
}));

// Setup bodyparser
app.use(bodyParser.urlencoded({extended: true}));

// Setup Multer
app.use(multer({
  dest: __dirname + '/public/uploads'
}));

// Setup MySQL

// Database configuration
var dbOptions = {
  host: 'localhost',
  user: 'root',
  password: 'sqlhostpass',
  database: 'sss-final'
};

// Add connection middleware
app.use(myConnection(mysql, dbOptions, 'single'));

//  ===========
//  = Routers =
//  ===========
var testRouter = require('./routers/index');


app.use('/home', testRouter);

app.use('/users', userRoutes);

app.use('/upload', uploadRoutes);

// This should be the ONLY route in this file!
app.get('/', function(req, res){
  res.redirect('/home');
});




//  =================
//  = Start the app =
//  =================

app.listen(3000, function(){
  console.log('App listening at http://localhost:3000');
});