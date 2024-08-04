const { DataTypes } = require('sequelize');
const sequelize = require('../configuration/db/dbpool.conf.js');

const Department = sequelize.define('Departments', {
    departmentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    isActive: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'tbldepartments',
    timestamps: true
});

module.exports = Department;
