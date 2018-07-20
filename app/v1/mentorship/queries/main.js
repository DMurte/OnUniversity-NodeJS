const async = require('es5-async-await/async');
const await = require('es5-async-await/await');
const nodemailer = require('nodemailer');
const nunjucks = require('nunjucks');

const utils = require('../../tools/utils');
const userModel = require('../../models/user');
const mentorshipModel = require('../../models/mentorship');


const notification = '../../templates/notification.html'
const welcome = '../../templates/welcome.html'
const restore = '../../templates/restore.html'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS
      }
  });

var request= {};

request.getAll = async ( (data) =>  {
    return new Promise( (resolve, reject) => {

        const mentorship =  await (mentorshipModel.mentorship.find({ where: { studentId: data.userId } }));

        resolve(mentorship)
        return;
 
   });
    
});

request.getMentorship = async ((data) => {
    return new Promise( (resolve , reject ) => {
        const mentorship =  await (mentorshipModel.mentorship.find({ where: { id: data.id } }));
        const userType =  await (userModel.user.find({ where: { id: data.userId } }));

        if(mentorship.studentId != data.userId && mentorship.mentorId != data.userId && userType != 3){
            reject('incorrect credentials');

        }else{
            resolve(mentorship);

        }
    })
});

request.create = async ((data) => {
    return new Promise( (resolve , reject ) => {
    
        await ( mentorshipModel.mentorship.create(
            { 
                startDate : data.startDate, 
                endDate : data.endDate, 
                studentId : data.userId,
                mentorId : data.mentorId,
                cost : data.cost,
                topic : data.topic
            }
        )); 

        // let html = nunjucks.render('', { user })
        // transporter.sendMail({from:'',to:'',subject:'' ,text:'',html});

        resolve('mentorship created');

    });
    
});

request.update = async ((data) => {
    return new Promise( (resolve, reject) => {
        const mentorship =  await (mentorshipModel.mentorship.find({ where: { id: data.id } }));
        const userType =  await (userModel.user.find({ where: { id: data.userId } }));

        if(mentorship.studentId != data.userId && mentorship.mentorId != data.userId && userType != 3){
            reject('incorrect credentials');

        }else{
            await (mentorshipModel.mentorship.update(
                {
                    startDate: data.startDate, 
                    endDate: data.endDate,
                    mentorId: data.mentorId
                },
                {
                    where: { 
                        id: data.id,
                    }
                }
            ));

            resolve('mentorship updated');
        }
       
    });
    
});



request.cancel = async ((data) => {
    return new Promise( (resolve, reject) => {
        const mentorship =  await (mentorshipModel.mentorship.find({ where: { id: data.id } }));
        const userType =  await (userModel.user.find({ where: { id: data.userId } }));

        if(mentorship.studentId != data.userId && mentorship.mentorId != data.userId && userType != 3){
            reject('incorrect credentials');

        }else{
            await (mentorshipModel.mentorship.destroy(
                {
                    where: { 
                        id: data.id
                    }
                }
            ));
    
            resolve('mentorship cancelled');
        }
    })    
});



module.exports = request;


