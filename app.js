//'use strict';

var a127 = require('a127-magic');
var express = require('express');
var ejs = require('ejs');
var app = express();


// uncomment the following if you need to parse incoming form data
//app.use(express.bodyParser());


a127.init(function(config) {

  app.use(a127.middleware(config));


  // web stuff
  require('./router/main')(app)
  app.set('views', __dirname + '/views')
  app.set('view engine', 'ejs')
  app.engine('html', require('ejs').renderFile)


  app.listen(process.env.PORT || 10010);
  console.log('try this:\ncurl http://127.0.0.1:10010/hello?name=Scott');
});
