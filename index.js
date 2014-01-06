module.exports = function (comparator, options) {
    var value, start = {}, stop = {}
    if (value = options.lt) {
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
