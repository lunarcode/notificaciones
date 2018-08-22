var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var usuariosSAFI = {};
var notificacionDAO = require('./modulos/notificaciones/dao/NotificacionesDAO'); 


io.on('connection', function(socket) {
	console.log('Un cliente se ha conectado');
	var idNoti = 0;

	socket.on('add-user', function(dataUser){

		console.log(dataUser);
	    usuariosSAFI[dataUser.usuarioID].socketID = socket.id;
	});


    socket.on('new-message',function(data){

    	console.log("Enviando Mensaje : " + data.mensaje + " a " + data.usuarios);

    	 enviaMensajes(data);

    });

});


function enviaMensajes(dataNotificacion){
	var listaUsuarios = dataNotificacion.usuarios.split(',');
	var listaRoles = dataNotificacion.roles.split(',');

	for( let numUsu in usuariosSAFI ){
		var usuarioBean = usuariosSAFI[numUsu];

		if(listaUsuarios.includes(usuarioBean.UsuarioID.toString()) || listaRoles.includes(usuarioBean.RolID.toString()) ){

			if ( usuarioBean.hasOwnProperty('socketID') ){

			    	if ( io.sockets.connected[usuarioBean.socketID] != null ){
			     	 	io.sockets.connected[usuarioBean.socketID].emit("add-message", dataNotificacion);
			     	 }

			} else {
			      console.log("El usuario no tiene una sesion activa: " +usuarioBean.UsuarioID); 
			}
		}
	}
		


}


io.on('disconnect', function(socket) {
		console.log('Se perdio la conexión con el Socket-');
})


server.listen(3000, function() {
	console.log('Servidor corriendo en http://localhost:3000');
	notificacionDAO.consultaUsuarios({},11,function(listaUsuario){
		
		for (var i = 0; i < listaUsuario.length ; i++) {

			usuariosSAFI[listaUsuario[i].UsuarioID] = listaUsuario[i];
		}

		console.log(listaUsuario);

		// console.log(usuariosSAFI);
	})

});