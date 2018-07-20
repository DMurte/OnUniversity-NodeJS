const db = require('../../../config/db')
const Sequelize = require('sequelize');


const postModel = {
    
    post : db.define('post',{
        id : {
            type : Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement : true
        },
        text :{
            type : Sequelize.TEXT
        },
        postOrigin :{
            type : Sequelize.INTEGER
        },
        lessonId :{
            type : Sequelize.INTEGER
        },
        creatorId :{
            type : Sequelize.INTEGER
        },
        votes :{
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

    postTag : db.define('postTag', {
        postId : {
            type : Sequelize.INTEGER
        },
        tagId : {
            type : Sequelize.INTEGER
        }
        },
        {
            freezeTableName: true,
            timestamps: false
        }),
}

module.exports =  postModel;