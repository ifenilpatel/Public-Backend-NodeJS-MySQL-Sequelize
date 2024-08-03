const { Sequelize } = require('sequelize');

// Database connection details
const dbName = 'dbmaster';
const dbUser = 'root';
const dbPassword = 'root';
const dbHost = 'localhost';

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: 'mysql',
    logging: false,
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;
