const { Sequelize } = require('sequelize')


const sequelize = new Sequelize('CRUD_DB', 'rodo', 'ranger1588', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize