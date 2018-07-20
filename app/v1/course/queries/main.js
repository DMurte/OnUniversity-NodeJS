const async = require('es5-async-await/async');
const await = require('es5-async-await/await');
const nodemailer = require('nodemailer');
const nunjucks = require('nunjucks');

const utils = require('../../tools/utils');
const userModel = require('../../models/user');
const courseModel = require('../../models/course');


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
        const courses = await (courseModel.course.findAll());
        resolve(courses)
   });
    
});

request.getCourse = async ((data) => {
    return new Promise( (resolve , reject ) => {
        const course = await (courseModel.course.find({ where: { id: data.id } }));
        if(!course) {
            reject('No course with that Id');
        }
        resolve(course);
    })
});

request.create = async ((data) => {
    return new Promise( (resolve , reject ) => {
        await ( courseModel.course.create(
            { 
                title: data.title, 
                description: data.description, 
                cost: data.cost, 
                img: data.img, 
                mentorId: data.mentorId,                  
                type: data.type,                  
                cityId: data.cityId                                  
            }
        ));
     
        const course = await (courseModel.course.find(
                            { 
                                where : { 
                                        title: data.title, 
                                        description: data.description,
                                        mentorId : data.mentorId 
                                } 
                            }
                        ));

        resolve(course)

    });
    
});

request.update = async ((data) => {
    return new Promise( (resolve, reject) => {
      
        await (courseModel.course.update(
            {
                title: data.title, 
                description: data.description, 
                cost: data.cost, 
                img: data.img, 
                mentorId: data.mentorId,                  
                type: data.type,                  
                cityId: data.cityId
            },
            {
                where: { 
                    id: data.id
                }
            }
        ));
     
        const course = await (courseModel.course.find({ where: { id: data.id } }));
        resolve(course)

    });
    
});

request.delete = async ((data) => {
    return new Promise( (resolve, reject) => {
        const course = await (courseModel.course.find({ where: { id: data.id } }));
        
        await (courseModel.course.destroy(
            {
                where: { 
                    id: data.id
                }
            }
        ));

        await (userModel.userCourse.destroy(
            {
                where: { 
                    courseId: data.id
                }
            }
        ));
     
        resolve('Course deleted')

    });
    
});


module.exports = request;


