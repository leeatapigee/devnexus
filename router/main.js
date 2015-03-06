module.exports=function(app) {
  app.get('/',function(req,res){
    res.render('pages/index.html')
  });

  app.get('/about',function(req,res){
    res.render('pages/about.html');
  });
}
