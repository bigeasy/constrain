module.exports = function (comparator, encoder, options) {
    var value, start = {}, stop = {}, limit = Number.MAX_VALUE, count = 0
    options = Object.create(options)
    if (options.end) {
        if (options.reverse) {
            options.gte = options.end
        } else {
            options.lte = options.end
        }
    }
    if ((options.reverse && (value = options.start)) || (value = options.lte)) {
        stop.value = encoder(value)
        stop.test = options.reverse ? function () { return true }
                                    : function (key) { return comparator(key, stop.value) <= 0 }
        if (options.lt) {
            stop.test = function (key) { return comparator(key, stop.value) < 0 }
        }
    } else if (value = options.lt) {
        stop.value = encoder(value)
        stop.test = function (key) { return comparator(key, stop.value) < 0 }
    } else {
        stop.test = function () { return true }
    }
    if ((!options.reverse && (value = options.start)) || (value = options.gte)) {
        start.value = encoder(value)
        start.test = options.reverse ? function (key) { return comparator(key, start.value) >= 0 }
                                     : function () { return true }
        if (options.gt) {
            start.test = function (key) { return comparator(key, start.value) > 0 }
        }
    } else if (value = options.gt) {
        start.value = encoder(value)
        start.test = function (key) { return comparator(key, start.value) > 0 }
    } else {
        start.test =function () { return true }
    }
    if (options.limit != null && options.limit >= 0) {
        limit = options.limit
    }
    var range = options.reverse
         ? { start: stop.test, stop: start.test, key: stop.value }
         : { start: start.test, stop: stop.test, key: start.value }
    return {
        valid: function (key) {
            return range.start(key) ? (range.stop(key) && count++ < limit ? 0 : 1) : -1
        },
        key: range.key,
        direction: options.reverse ? 'reverse' : 'forward'
    }
}
