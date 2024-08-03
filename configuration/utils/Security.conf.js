const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const method = {};

method.generateToken = (payload) => {
    const options = {
        expiresIn: "1d", // Token expires in 1 day
    };
    const token = jwt.sign(payload, process.env.PASSWORD_SALT, options);
    return token;
};

method.verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.PASSWORD_SALT);
        return decoded;
    } catch (error) {
        console.error("Token verification failed:", error.message);
        return null;
    }
};

method.hashPassword = async (password) => {
    const hash = await bcrypt.hash(password, 10);
    return hash;
};

method.comparePasswords = async (Password, DBPassword) => {
    const result = await bcrypt.compare(Password, DBPassword);
    return result ? true : false;
};

method.encodeString = (text) => {
    try {
        var mykey = crypto.createCipher("aes-128-cbc", process.env.PASSWORD_SALT);
        var mystr = mykey.update(text, "utf8", "hex");
        mystr += mykey.final("hex");
        return mystr;
    } catch (error) {
        return null;
    }
};

method.decodeString = (text) => {
    try {
        var mykey = crypto.createDecipher("aes-128-cbc", process.env.PASSWORD_SALT);
        var mystr = mykey.update(text, "hex", "utf8");
        mystr += mykey.final("utf8");
        return mystr;
    } catch (error) {
        return null;
    }
};

module.exports = method;
