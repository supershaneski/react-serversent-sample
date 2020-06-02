exports.getIPAddress = () => {
    var interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
            return alias.address;
        }
    }
    return '0.0.0.0';
}

exports.getSimpleId = () => {
    return Math.random().toString(26).slice(2);
}

exports.formatDate = (dateStr) => {
    const date = (typeof dateStr !== "undefined")?new Date(dateStr):new Date();
    return date.toISOString();
}

exports.createErrorData = (msg) => {
    var err = [];
    err.push({ error: msg });
    return err;
}

exports.formatData = (obj, key, defvalue) => {
    if(Object.hasOwnProperty.call(obj, key)) {
        return obj[key];
    }
    return defvalue;
}

exports.hasOwnProperty = (obj, key) => {
    return Object.hasOwnProperty.call(obj, key);
}

exports.getDateId = (date) => {
    const _date = new Date(date);
    let _year = _date.getFullYear();
    let _month = _date.getMonth() + 1;
    let _day = _date.getDate();
    _month = (_month < 10)?"0"+_month:_month;
    _day = (_day < 10)?"0"+_day:_day;
    let _hour = _date.getHours();
    let _minute = _date.getMinutes();
    let _second = _date.getSeconds();
    _hour = (_hour < 10)?"0"+_hour:_hour;
    _minute = (_minute < 10)?"0"+_minute:_minute;
    _second = (_second < 10)?"0"+_second:_second;
    var _id = _year + "" + _month + "" + _day + "";
    _id += _hour + "" + _minute + "" + _second;
    return _id;
}