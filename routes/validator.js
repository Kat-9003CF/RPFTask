exports.isValidUsername = (str) => {
    return str ? true : false;
}

exports.isValidPass = (str) => {
    return str.length > 8 ? true : false;
}

exports.isValidEmail = (str) => {
    return str.includes('@') ? true : false;
}