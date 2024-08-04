const { DataTypes } = require('sequelize');
const sequelize = require('../configuration/db/dbpool.conf.js');

const Attendance = sequelize.define('Attendances', {
    attendanceId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'userId'
        }
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    inTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    outTime: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'tblattendance',
    timestamps: true
});

// Define models for associations
const User = require('./users.model.js');

// Define associations
Attendance.belongsTo(User, { foreignKey: 'userId' });

module.exports = Attendance;
