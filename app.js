//'use strict';

var a127 = require('a127-magic');
var request = require('request');
var express = require('express');
var ejs = require('ejs');
var app = express();


var allSessions

function loadSessions() {
  allSessions = []
  request.get('http://api.usergrid.com/devnexus/2015/sessions?ql=select%20uuid,name,title,date,time&limit=500',
    function(err, resp, body) {
      if( !err && resp.statusCode === 200 ) {
        var res = JSON.parse(body)
        res.list.forEach(function(sess) {
          // lazy hack to remove quotes rather than figure out how to do an escaped JSON payload
          // fixing this is left as an exercise for the student  ;-)
          var cleanTitle = sess[2].replace(/\"/g, '').replace(/\'/g, "")
          allSessions.push({value:sess[0], label:sess[3]+' '+sess[4]+' - '+cleanTitle})
        })
      }
    }
  )
}

// uncomment the following if you need to parse incoming form data
//app.use(express.bodyParser());

app.use(express.static(__dirname + '/public'))

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

loadSessions()

module.exports = {
  allSessions : allSessions
}
