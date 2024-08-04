const { DataTypes } = require('sequelize');
const sequelize = require('../configuration/db/dbpool.conf.js');

const Designation = sequelize.define('Designations', {
    designationId: {
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
    tableName: 'tbldesignations',
    timestamps: true
});

module.exports = Designation;
