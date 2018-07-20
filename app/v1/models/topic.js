const db = require('../../../config/db')
const Sequelize = require('sequelize');


const topicModel = {
    
    topic : db.define('topic', {
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
        }
        },
        {
            freezeTableName: true,
            timestamps: false
        }),
}

module.exports =  topicModel;