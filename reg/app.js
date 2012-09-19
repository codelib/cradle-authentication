var http = require('http'),
express  = require('express'),
   cons  = require('consolidate'),
  cradle = require('cradle'),
  sys    = require('sys'),
coneccion= new(cradle.Connection)(),
   db    = coneccion.database('usuarios'),
  app    = express(),
  server = http.createServer(app)
  server.listen(8000)
  db.create();
  //config
 app.use(express.static('./public'));
	//jquery Templates
	app.engine('html', cons.jqtpl);
	//html como extension default
	app.set('view engine' , 'html');
    app.set('views', './views');

app.get('/',function (req,res){
	 res.render('regis.html',{}); 
})
app.get('/login',function (req,res){
   res.render('login.html',{}); 
})
app.post('/send',express.bodyParser() ,function (req,res){
	if (req.body && req.body.usuario && req.body.contrasena) {
		//Checa si ya existe el usuario
    db.get(req.body.usuario, function(err,doc){
      if(doc){
        res.send('this username already exists!');
        // confirma si el password  se repite
      }else if(req.body.contrasena != req.body.contrasena2){
        res.send('Inserta de manera correcta la contraseña');
      }else{
        delete req.body.contrasena2;
        db.save(req.body.usuario,req.body, function(db_err,db_res){
          if (db_err) { res.send('Hubo un error, envia el formulario otra vez')}else{
          res.send('Perfecto')
        }
        })
      }
    })

	}
})

app.post('/posting',express.bodyParser() , function(req,res){
  //Correspondencia de nombre
 console.log(req.body+ req.body.usuario,req.contrasena)
  db.get(req.body.usuario, function(err,doc){
    if(!doc){
      res.send('El usuario no existe');
    //correspondencia de contraseña
  }else if(doc.contrasena != req.body.contrasena){
    res.send('la contraseña es incorrecta')
  }else{
    res.send('logged in!');
  }
  })
});

console.log("Esta funcionando en el 8000!")