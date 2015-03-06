'use strict'

var util = require('util')
var usergrid = require('usergrid')

var client = new usergrid.client({
  orgName: 'devnexus',
  appName: '2015',
  authType: usergrid.AUTH_CLIENT_ID,
  clientId: 'b3U6apHSesK4EeS83ifhCLdAvA',
  clientSecret: 'b3U632uksMm62PSaNgrbpUkj3kGWxp0',
  logging: true,
  buildCurl: true
})

module.exports = {
  mashup: mashup
}

function mashup(req, res) {
  client.createCollection({
    type: 'sessions',
    qs:{ql:'title contains \''+req.swagger.params.sessionTitleFragment.value+'\''}
  }, function(err, results) {
    if( err ) {
      res.jsonp(500, {error: JSON.stringify(err)})
      return
    }

    var sessions = []
    while( results.hasNextEntity() ) {
      var session = results.getNextEntity().get()
      sessions.push(session)
      var speaker = session.speaker

      // TODO retrieve speaker bio & social links
      
      console.log(session.title+' by '+speaker)
    }
    res.json(sessions)

  })
}
