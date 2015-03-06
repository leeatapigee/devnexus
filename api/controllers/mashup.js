'use strict'

var request = require('request')
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

function requestSpeaker(res, sessions, index, waitingForSpeakers) {
  request.get({url:"https://api.usergrid.com/devnexus/2015/speakers/"+sessions[index].speaker,
    headers:{Authorization:'Bearer YWMtL-djUsQ4EeS1UDXl8h2kkAAAAUwUo_m2TcRZ_Hvi53vTeAgimwHKN21oK2g'}},
    function(err, resp, body) {
      if( err ) {
        res.jsonp(err)
      } else {
        console.log('inside closure, index='+index)
        --waitingForSpeakers
//            console.log('waitingForSpeakers='+waitingForSpeakers)
        var spkr = JSON.parse(body).entities[0]  // we KNOW we only got one speaker
        sessions[index].bio = spkr.bio
        sessions[index].social = spkr.social
        sessions.push(sessions[index])

        if( !waitingForSpeakers )
          res.jsonp(sessions)
      }
    }
  )
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
    var waitingForSpeakers = 0
    var index = 0
    while( results.hasNextEntity() ) {
      sessions[index] = results.getNextEntity().get()
      console.log('index='+index)

      // retrieve speaker to include bio & social links
      ++waitingForSpeakers
      console.log('waitingForSpeakers='+waitingForSpeakers)
      requestSpeaker(res, sessions, index, waitingForSpeakers)
      ++index
    }

  })
}
