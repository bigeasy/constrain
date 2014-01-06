module.exports = function (comparator, options) {
    var value, start = {}, stop = {}
    if ((options.reverse && (value = options.start)) || (value = options.lte)) {
        stop.value = value
        stop.test = options.reverse ? function () { return true }
                                    : function (key) { return comparator(key, stop.value) < 0 }
    } else if (value = options.lt) {
        stop.value = value
        stop.test = function (key) { return comparator(key, stop.value) < 0 }
    }
    if (value = options.gt) {
        start.value = value
        start.test = function (key) { return comparator(key, start.value) > 0 }
    }
    return options.reverse
         ? { start: stop.test, stop: start.test, key: stop.value }
         : { start: start.test, stop: stop.test, key: start.value }
}
