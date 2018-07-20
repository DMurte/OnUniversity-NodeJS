const async = require('es5-async-await/async');
const await = require('es5-async-await/await');
const nodemailer = require('nodemailer');
const nunjucks = require('nunjucks');
const randtoken = require('rand-token');

const utils = require('../../tools/utils');
const userModel = require('../../models/user');
const mentorshipModel = require('../../models/mentorship');


const notification = '../../templates/notification.html'
const welcome = './templates/welcome.html'
const restore = '../../templates/restore.html'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS
      }
  });


var request= {};

request.register = async ( (data) =>  {
    return new Promise( (resolve, reject) => {

        const email =  await (userModel.user.find({ where: { email: data.email } }));

        if (email) {
            reject("Email already in use");
            return;
        } 

        await ( userModel.user.create(
            { 
                firstName: data.firstName, 
                lastName: data.lastName, 
                email: data.email, 
                password: utils.encrypt(data.password), 
                type: 1,                   
                status: 1,
                confirmed : 0                   
            }
        ));

        let user =  await (userModel.user.find({ where: { email: data.email } }));
        user = user.dataValues

        const confirmationToken = randtoken.generate(8)
        await (userModel.confirmationToken.create( { id: confirmationToken, userId: user.id, type: 1 } ));

        user.token = utils.generateToken();
        await (userModel.accessToken.create({ id: user.token, userId: user.id }));

        // const html = nunjucks.render(welcome , {})

        const mailOptions = {
            from:`Bootcamps Online <${process.env.EMAIL}>`,
            to : 'danielmurte1@gmail.com' ,
            subject:'Email Confirmation!',
            text:`http://localhost:3678/api/v1/user/confirm/${confirmationToken}`,
            html : ''
        }

        transporter.sendMail(mailOptions)
          
        delete user.password;
        resolve(user)
        return;
 
   });
    
});

request.login = async ((data) => {
    return new Promise( (resolve , reject ) => {
        let user = await (userModel.user.find(
                                {
                                    where: { 
                                        email: data.email , 
                                        password: utils.encrypt(data.password)
                                    }
                                }
                            ));

        if (!user) {
            reject( "Wrong credentials" );
            return;
        }

        user = user.dataValues;
        user.token = utils.generateToken();

        await (userModel.accessToken.create({ id: user.token, userId: user.id }));
        delete user.password;
    
        resolve(user);

    })
});

request.getUser = async ((data) => {
    return new Promise( (resolve , reject ) => {
        let user = await (userModel.user.find({ where: { id: data.userId } }))  
        if( user == null){
            reject('No user with that Id');
            return;
        }else{
            user = user.dataValues;        
            delete user.password;
            resolve(user);
            return;
        }
        

    });
    
});

request.getById = async ((data) => {
    return new Promise( (resolve , reject ) => {
        let user = await (userModel.user.find({ where: { id: data.id } }))  
        if( user == null){
            reject('No user with that Id');
            return;
        }else{
            user = user.dataValues;        
            delete user.password;
            resolve(user);
            return;
        }
        
    });
    
});

request.confirm = async ((data) => {
    return new Promise( (resolve, reject) => {
        let confirmation = await(userModel.confirmationToken.find({ where:{ id : data.token, type : 1 } })); 
       
        await (userModel.user.update(
                {
                    confirmed: 1,
                },
                {
                    where: { 
                        id: confirmation.userId
                    }
                }
            ));

        let user = await (userModel.user.find({ where: { id: confirmation.userId } }))
        user = user.dataValues
        delete user.password;

        resolve(user);

    });
    
});

request.block = async ((data) => {
    return new Promise( (resolve, reject) => {
       
        await (userModel.user.update(
                {
                    status: 0,
                },
                {
                    where: { 
                        id: data.userId
                    }
                }
            ));

        resolve('User blocked');

    });
    
});

request.activate = async ((data) => {
    return new Promise( (resolve, reject) => {
       
        await (userModel.user.update(
                {
                    status: 1,
                },
                {
                    where: { 
                        id: data.userId
                    }
                }
            ));


            resolve('User activated');

    });
    
});



request.update = async ((data) => {
    return new Promise( (resolve, reject) => {


        if(data.email!=data.oldEmail){
            let email = await(userModel.user.find({where:{ email: data.email }})); 
            if(email){
                reject("Email already in use")
                return;
            }
        }
       
        await (userModel.user.update(
                {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    city: data.city,
                    country: data.country,
                    userName: data.userName,
                    description: data.description,
                    portfolio: data.portfolio
                },
                {
                    where: { 
                        id: data.userId
                    }
                }
            ));

        let user = await (userModel.user.find({ where: { id: data.userId } }))
        user = user.dataValues
        delete user.password;

        resolve(user);

    });
    
});

request.updatePassword = async ((data) => {
    return new Promise( (resolve, reject) => {
        let user = await(userModel.user.find({where:{ id: data.userId }})); 
        
        if(user.password!=utils.encrypt(data.oldPassword)){
            if(email){
                reject("Incorrect credentials")
                return;
            }
        }
       
        await (userModel.user.update(
                {
                    password: utils.encrypt(data.password)
                },
                {
                    where: { 
                        id: data.userId
                    }
                }
            ));

        resolve('Password updated');

    });
    
});

request.restorePassword = async ((data) => {
    return new Promise( (resolve, reject) => {
        let user = await(userModel.user.find({where:{ email: data.email }})); 
        
        if(!user){
            reject("No user with that email")
            return;
        }
        const confirmationToken = randtoken.generate(8)

        const mailOptions = {
            from:`Bootcamps Online <${process.env.EMAIL}>`,
            to : 'danielmurte1@gmail.com' ,
            subject:'Restore Password!',
            text:`http://localhost:3678/api/v1/user/restore/${confirmationToken}`,
            html : ''
        }

        transporter.sendMail(mailOptions)

        user = user.dataValues
        await (userModel.confirmationToken.create( { id: confirmationToken, userId : user.id, type : 2 }));

        resolve('Email sent');

    });
    
});


request.restore = async ((data) => {
    return new Promise( (resolve, reject) => {
        let restoreToken = await(userModel.confirmationToken.find({where:{  id : data.token, type: 2 }})); 
        if(!restoreToken){
            reject("Incorrect credentials or token already used")
            return;

        }

        restoreToken = restoreToken.dataValues

        
        await (userModel.user.update(
            {
                password: utils.encrypt(data.password)
            },
            {
                where: { 
                    id: restoreToken.userId
                }
            }
        ));

        await (userModel.confirmationToken.destroy({ where: { userId: restoreToken.userId, type : 2 } }));

  
        resolve('Restored password');

    });
    
});


request.getMentorships = async ( (data) =>  {
    return new Promise( (resolve, reject) => {
        const mentorships =  await (mentorshipModel.mentorship.findAll({ where: { studentId: data.userId } }));   
        resolve(mentorships)
        return;

    });
});



module.exports = request;


