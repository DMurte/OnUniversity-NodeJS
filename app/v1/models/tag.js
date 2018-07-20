const db = require('../../../config/db')
const Sequelize = require('sequelize');


const tagModel = {
    
    tag : db.define('tag', {
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
}

module.exports =  tagModel;