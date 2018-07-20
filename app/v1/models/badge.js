const db = require('../../../config/db')
const Sequelize = require('sequelize');


const badgeModel = {
    
    badge : db.define('badge', {
        id : {
            type : Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement : true
        },
        name : {
            type : Sequelize.TEXT
        },
        description : {
            type : Sequelize.TEXT
        },
        img : {
            type : Sequelize.TEXT
        }
        },
        {
            freezeTableName: true,
            timestamps: false
        }),
}

module.exports =  badgeModel;