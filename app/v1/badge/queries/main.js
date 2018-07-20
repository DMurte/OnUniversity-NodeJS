const async = require('es5-async-await/async');
const await = require('es5-async-await/await');

const utils = require('../../tools/utils');
const userModel = require('../../models/user');
const courseModel = require('../../models/course');
const badgeModel = require('../../models/badge');

var request= {};

request.getAll = async ( (data) =>  {
    return new Promise( (resolve, reject) => {
        const badges = await (badgeModel.badge.findAll());
        resolve(badges)
   });
    
});

request.getBadge = async ((data) => {
    return new Promise( (resolve , reject ) => {
        const badge = await (badgeModel.badge.find({ where: { id: data.id } }));
        if(!badge) {
            reject('No badge with that Id');
        }

        resolve(badge);
    })
});

request.create = async ((data) => {
    return new Promise( (resolve , reject ) => {
        let badge = await (badgeModel.badge.find({ where: { name: data.name } }));
        if(badge) {
            reject('badge already exist');
        }
        await ( badgeModel.badge.create(
            { 
                name: data.name, 
                description: data.description,    
                img : data.img                           
            }
        ));
           
        badge = await (badgeModel.badge.find({ where: { name: data.name, description: data.description, img : data.img } }));
        resolve(badge)

    });
    
});

request.update = async ((data) => {
    return new Promise( (resolve, reject) => {

        let badge = await (badgeModel.badge.find({ where: { name: data.name } }));
        if(badge) {
            reject('badge already exist');
        }
      
        await (badgeModel.badge.update(
            {
                name: data.name, 
                description: data.description,
                img : data.img
            },
            {
                where: { 
                    id: data.id
                }
            }
        ));
     
        badge = await (badgeModel.badge.find({ where: { id: data.id } }));
        resolve(badge)

    });
    
});

request.delete = async ((data) => {
    return new Promise( (resolve, reject) => {
        const badge = await (badgeModel.badge.find({ where: { id: data.id } }));
        
        await (badgeModel.badge.destroy(
            {
                where: { 
                    id: data.id
                }
            }
        ));

        await (userModel.userBadge.destroy(
            {
                where: { 
                    badgeId: data.id
                }
            }
        ));

        await (courseModel.courseBadge.destroy(
            {
                where: { 
                    badgeId: data.id
                }
            }
        ));
     
        resolve('badge deleted')

    });
    
});


module.exports = request;


