//here declare API routes

module.exports = function(app){
    app.get('/',function(req,res){
        switch(process.env.NODE_ENV){
          case 'development':
            res.sendFile('./public/src/index.html');
            break;
          case 'production':
            res.sendFile('./public/dist/index.html');
            break;
        }
    });
}
