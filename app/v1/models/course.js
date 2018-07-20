const db = require('../../../config/db')
const Sequelize = require('sequelize');


const courseModel = {
    
    course : db.define('course', {
        id : {
            type : Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement : true
        },
        title : {
            type : Sequelize.TEXT
        },
        description : {
            type : Sequelize.TEXT
        },
        cost : {
            type : Sequelize.TEXT
        },
        img : {
            type : Sequelize.TEXT
        },
        mentorId : {
            type : Sequelize.INTEGER
        },
        type :{
            type : Sequelize.INTEGER
        },
        cityId :{
            type : Sequelize.INTEGER
        }
        },
        {
            freezeTableName: true,
            timestamps: false
        }),

    courseBadge : db.define('courseBadge', {
        courseId : {
            type : Sequelize.INTEGER
        },
        badgeId : {
            type : Sequelize.INTEGER
        }
        },
        {
            freezeTableName: true,
            timestamps: false
        }),

    courseType : db.define('courseType', {
        id : {
            type : Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement : true
        },
        name : {
            type : Sequelize.TEXT
        }
        },
        {
            freezeTableName: true,
            timestamps: false
        }),

    badge : db.define('userBadge', {
        userId : {
            type : Sequelize.INTEGER
        },
        badgeId : {
            type : Sequelize.INTEGER
        },
        date :{
            type : Sequelize.DATE
        }
        },
        {
            freezeTableName: true,
            timestamps: false
        }),

    lesson : db.define('lesson', {
        id : {
            type : Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement : true
        },
        title : {
            type : Sequelize.TEXT
        },
        description :{
            type : Sequelize.TEXT
        },
        courseId :{
            type : Sequelize.INTEGER
        },
        index :{
            type : Sequelize.INTEGER
        },
        url :{
            type : Sequelize.TEXT
        }
        },
        {
            freezeTableName: true,
            timestamps: false
        }),

}

module.exports =  courseModel;