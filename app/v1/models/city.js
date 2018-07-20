const db = require('../../../config/db')
const Sequelize = require('sequelize');


const cityModel = {
    
    city : db.define('postTag', {
        id : {
            type : Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement : true
        },
        name : {
            type : Sequelize.TEXT
        },
        country : {
            type : Sequelize.TEXT
        },
        lng : {
            type : Sequelize.DECIMAL
        },
        lat : {
            type : Sequelize.DECIMAL
        }
        },
        {
            freezeTableName: true,
            timestamps: false
        }),
}

module.exports =  cityModel;