//'use strict';

var a127 = require('a127-magic');
var express = require('express');
var app = express();


////////////////////////////////////////////////////////////////////////////////
// api stuff

// uncomment the following if you need to parse incoming form data
app.use(express.bodyParser());

a127.init(function(config) {

  app.use(a127.middleware(config));

  app.listen(process.env.PORT || 10010);

  console.log('try this:\ncurl http://127.0.0.1:10010/hello?name=Scott');
});

////////////////////////////////////////////////////////////////////////////////
// web stuff

require('./router/main')(app)
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile)


var server = app.listen(3000, function() {
  console.log('Express is listening on 3000')
})
