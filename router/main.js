

module.exports=function(app) {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.get('/',function(req,res,next){
    res.render('pages/index')
  });

  app.get('/resources',function(req,res,next){
    res.render('pages/resources');
  });

  app.get('/attended', function(req,res,next){
    res.render('pages/attended', {
      sessions: JSON.stringify(require('../app').allSessions)
    })
  })

  app.get('/intending', function(req,res,next){
    res.render('pages/intending', {
      sessions: JSON.stringify(require('../app').allSessions)
    })
  })
}
