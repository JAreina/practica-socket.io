'use strict';
///  EJECUTAR   $ node index.js
const http= require('http').createServer(server),
        fs = require('fs'),
        io = require('socket.io')(http);


  let conexiones =0;


  function server (req,res) {
  	fs.readFile('index.html' , (err, data)=>{
  		if(err){
  			res.writeHead(500,{'Content-Type' : 'text/html'});
  			return res.end('<h1>ERROR INTERNO DEL SERVIDOR</h1>');

  		}else{
  			res.writeHead(200,{'Content-Type' : 'text/html'});
  			return res.end(data,'utf-8');
  		}
  	}) ;
  	// body...
  }

  http.listen(2222,()=> console.log("INICIADO EN PORT 2222"));

  io.on('connection', (socket)=>{
  	 conexiones++;
         socket.emit('hola',{
         	message: `mensaje deddddddd socket.io `
         });
         socket.on("MENSAJE DESDE CLIENTE", data => console.log(data));


         console.log(`conexiones  ${conexiones}` );
         socket.emit("numero usuarios",{numeros: conexiones});
socket.broadcast.emit('numero usuarios',{numeros:conexiones});


socket.on('disconnect',()=>{
          conexiones--;
          console.log(`CONEXIONS ACTIVAS  ${conexiones}`);
socket.broadcast.emit('numero usuarios',{numeros:conexiones});

	});
  });


