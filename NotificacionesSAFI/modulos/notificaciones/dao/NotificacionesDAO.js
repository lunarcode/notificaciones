var db = require('../../../config/dbconnection'); 


var NotificacionesDAO = {  

    /**
     *
     * Consulta usuarios
     * se modifica la consulta 11 de USUARIOSLIS
     */    
    consultaUsuarios: (UsuarioBean,tipoConsulta,callback)=>{

        var query = "call USUARIOSLIS(?,?,?,?,?,  ?,?,?,?,?)"
        var parametros = [
            '',
            0,
            tipoConsulta,

            1,
            1,
            '1900-01-01',
            '127.0.0.1',
            'NOTISAFIPRO',
            1,
            1
        ]

        db.query(query,parametros,(error, results, fields)=>{
            callback(results[0])           
        })

    },


    /**
     *
     * Alta de usuario
     *
     */    
     /*alta: (usuarioBean,callback)=>{
        var mensajeRespuesta = {
                codigo: '',
                mensaje: '',
                mensajeDev: '',
                control: '',
            }

        db.getConnection(function(err, connection) {

            connection.beginTransaction(function(err) {
              if (err) { 
                    mensajeRespuesta.codigo = '999'
                    mensajeRespuesta.mensaje = 'Error del Servidor'
                    throw error;
                }
              
                var query = " call BUSUARIOSALT(?,?,?,?,@numErr,  @numMen,?,?,?,?,  ?)"
                var numerro = 0
                var errmen  = ''
                var parametros = [
                    usuarioBean.correo,
                    usuarioBean.contrasenia,
                    usuarioBean.folioToken,
                    'S',

                    1,
                    '1900-01-01',
                    '',
                    '',
                    1
                ]
             
                connection.query(query, parametros, function (error, results, fields) {
                  if (error) {
                    return connection.rollback(function() {
                      mensajeRespuesta.codigo = '999'
                      mensajeRespuesta.mensaje = 'Error de conexion'
                      console.log(error);
                      callback(mensajeRespuesta) 
                      
                    });
                  }


                  connection.commit(function(err) {
                    if (err) {
                      return connection.rollback(function() {
                         mensajeRespuesta.codigo = '999'
                         mensajeRespuesta.mensaje = 'Error al realizar el commit'
                        throw err;
                      });
                    }

                    console.log('success!');
                    mensajeRespuesta = results[0][0]
                    callback(mensajeRespuesta)  
                  });


                });
        
            });
        });

    },*/


};  





module.exports = NotificacionesDAO;  