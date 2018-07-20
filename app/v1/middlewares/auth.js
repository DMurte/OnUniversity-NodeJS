const async = require('es5-async-await/async');
const await = require('es5-async-await/await');
const moment = require('moment');

const userModel = require('../models/user');

    const auth = {

        global:  async((req, res, next)  => {
            const auth = req.headers['authorization'];

            if (!auth) res.status(500).send({ message_error: 'Incorrect credentials' });
            
            const userAccess = await (userModel.accessToken.find( { where: { id : auth } } ));
    
            if (userAccess) {
                req.session = {
                    userId: userAccess.userId,
                    user: true 
                   }
    
               next();
               return;
          
            }
    
            res.status(500).send({ message_error: 'Credenciales incorrectas' });
        }),
        admin: async((req, res, next)  => {
            const auth = req.headers['authorization'];

            if (!auth) res.status(500).send({ message_error: 'Incorrect credentials' });

            const userAccess = await (userModel.accessToken.find( { where: { id : auth } } ));
            const user = await (userModel.user.find( { where: { id : userAccess.userId } } ));
            if (user.type == 3) {
                req.session = {
                    userId: userAccess.userId,
                    user: true 
                   }
    
               next();
               return;
          
            }
    
            res.status(500).send({ message_error: 'Credenciales incorrectas' });
        })
      
      }
      
      
      
      
      
      module.exports = auth;



