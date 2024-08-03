const { DataTypes } = require('sequelize');
const sequelize = require('../configuration/db/dbpool.conf.js');
const Security = require("../configuration/utils/Security.conf.js");

const User = sequelize.define('Users', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mobile: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    emailId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
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
    tableName: 'tblusers',
    timestamps: true,
    hooks: {
        beforeCreate: async (user) => {
            // Hash the password before saving
            let password = await Security.hashPassword(user.passwordHash);
            user.passwordHash = password;
        }
    }
});

module.exports = User;
