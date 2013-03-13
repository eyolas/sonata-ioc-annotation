exports.isString = function (obj) {
    return toString.call(obj) == '[object String]';
}