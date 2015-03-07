module.exports=function(app) {
  app.get('/',function(req,res){
    res.render('pages/index')
  });

  app.get('/resources',function(req,res){
    res.render('pages/resources');
  });

  app.get('/attended', function(req,res){
    res.render('pages/attended')
  })

  app.get('/intending', function(req,res){
    res.render('pages/intending')
  })
}
