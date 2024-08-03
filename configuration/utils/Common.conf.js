const moment = require("moment");

const diffTwoDateTime = (newTime, oldTime) => {
    newTime = moment(newTime);
    oldTime = moment(oldTime);
    var duration = moment.duration(newTime.diff(oldTime));

    var days = duration._data.days;
    var hours = duration._data.hours;
    var minutes = duration._data.minutes;
    var months = duration._data.months;

    return {
        days: days,
        hours: hours,
        minutes: minutes,
        months: months,
    };
};

const convertToDateTime = (value) => {
    let result = moment(value).utc().format("YYYY-MM-DD HH:mm:ss");
    return result;
};

const currentDate = () => {
    let result = moment().utc().format("YYYY-MM-DD HH:mm:ss");
    return result;
};

const randomNumber = (value) => {
    var a = Math.floor(100000 + Math.random() * 900000);
    a = String(a);
    a = a.substring(0, value);
    return a;
};

module.exports = {
    diffTwoDateTime,
    convertToDateTime,
    currentDate,
    randomNumber,
};
