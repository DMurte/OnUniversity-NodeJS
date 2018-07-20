const db = require('../../../config/db')
const Sequelize = require('sequelize');


const mentorshipModel = {
    
    mentorship : db.define('mentorship',{
        id : {
            type : Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement : true
        },
        startDate :{
            type : Sequelize.DATE
        },
        endDate :{
            type : Sequelize.DATE
        },
        mentorId :{
            type : Sequelize.INTEGER
        },
        studentId :{
            type : Sequelize.INTEGER
        },
        topic :{
            type : Sequelize.TEXT
        },
        cost :{
            type : Sequelize.TEXT
        }
        },
        {
            freezeTableName: true,
            timestamps: false
        }),
}

module.exports =  mentorshipModel;