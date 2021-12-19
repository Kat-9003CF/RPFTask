exports.isValidUsername = (str) => {
    return str.length > 0
}

exports.isValidPass = (str) => {
    return str.length > 8
}

exports.isValidEmail = (str) => {
    return str.includes('@')
}