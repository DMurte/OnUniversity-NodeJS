const db = require('../../../config/db')
const Sequelize = require('sequelize');


let userModel = {
    
    user : db.define('user',{
        id : {
            type : Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement : true
        },
        firstName : {
            type : Sequelize.TEXT
        },
        lastName : {
            type : Sequelize.TEXT
        },
        email : {
            type : Sequelize.TEXT
        },
        password : {
            type : Sequelize.TEXT
        },
        city : {
            type : Sequelize.TEXT
        },
        country : {
            type : Sequelize.TEXT
        },
        type : {
            type : Sequelize.INTEGER
        },
        status : {
            type : Sequelize.INTEGER
        },
        confirmed : {
            type : Sequelize.INTEGER
        },
        createdAt :{
            type : Sequelize.DATE
        },
        updatedAt :{
            type : Sequelize.DATE
        }
        },
        {
            freezeTableName: true,
            timestamps: true
        }),

    userType : db.define('userType', {
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

    status : db.define('userStatus', {
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

    accessToken : db.define('accessToken', {
        id : {
            type : Sequelize.TEXT,
            primaryKey: true,
        },
        userId :{
            type : Sequelize.INTEGER
        }
        },
        {
            freezeTableName: true,
            timestamps: true
        }),

    confirmationToken : db.define('confirmationToken', {
        id : {
            type : Sequelize.TEXT,
            primaryKey: true,
        },
        userId :{
            type : Sequelize.INTEGER
        },
        type :{
            type : Sequelize.INTEGER
        }
        },
        {
            freezeTableName: true,
            timestamps: true
        }),

    userCourse : db.define('userCourse', {
        userId : {
            type : Sequelize.INTEGER
        },
        courseId : {
            type : Sequelize.INTEGER
        },
        courseType :{
            type : Sequelize.INTEGER
        }
        },
        {
            freezeTableName: true,
            timestamps: false
        }),

    userBadge : db.define('userBadge', {
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

    userVote : db.define('userVote', {
        postId : {
            type : Sequelize.INTEGER,
        },
        userId : {
            type : Sequelize.INTEGER,
        }
        },
        {
            freezeTableName: true,
            timestamps: false

        }),

    application : db.define('application', {
        id : {
            type : Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement : true
        },
        userId : {
            type : Sequelize.INTEGER
        },
        createdAt :{
            type : Sequelize.DATE
        },
        updatedAt :{
            type : Sequelize.DATE
        },
        startDate :{
            type : Sequelize.DATE
        },
        endDate :{
            type : Sequelize.DATE
        }
        },
        {
            freezeTableName: true,
            timestamps: true
        }),

    mentorTopic : db.define('mentorTopic', {
        mentorId : {
            type : Sequelize.INTEGER
        },
        topicId : {
            type : Sequelize.INTEGER
        }
        },
        {
            freezeTableName: true,
            timestamps: false
        }),

    restoreToken : db.define('mentorTopic', {
        id : {
            type : Sequelize.TEXT,
            primaryKey: true,
            autoIncrement : true
        },
        userId : {
            type : Sequelize.INTEGER
        }
        },
        {
            freezeTableName: true,
            timestamps: false
        }),
}


module.exports =  userModel;