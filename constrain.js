module.exports = function (comparator, encoder, options) {
    var value, start = {}, stop = {}, limit = Number.MAX_VALUE, count = 0
    options = Object.create(options)
    if (options.end != null) {
        if (options.reverse) {
            options.gte = options.end
        } else {
            options.lte = options.end
        }
    }
    if ((options.reverse && (value = options.start) != null) || (value = options.lte) != null) {
        stop.value = encoder(value)
        stop.test = options.reverse ? function () { return true }
                                    : function (key) { return comparator(key, stop.value) <= 0 }
        stop.inclusive = true
        if (options.lt != null) {
            stop.test = function (key) { return comparator(key, stop.value) < 0 }
            stop.inclusive = false
        }
    } else if ((value = options.lt) != null) {
        stop.value = encoder(value)
        stop.test = function (key) { return comparator(key, stop.value) < 0 }
        stop.inclusive = false
    } else {
        stop.test = function () { return true }
        stop.inclusive = true
    }
    if ((!options.reverse && (value = options.start) != null) || (value = options.gte) != null) {
        start.value = encoder(value)
        start.test = options.reverse ? function (key) { return comparator(key, start.value) >= 0 }
                                     : function () { return true }
        start.inclusive = true
        if (options.gt != null) {
            start.test = function (key) { return comparator(key, start.value) > 0 }
            start.inclusive = false
        }
    } else if ((value = options.gt) != null) {
        start.value = encoder(value)
        start.test = function (key) { return comparator(key, start.value) > 0 }
        start.inclusive = false
    } else {
        start.test = function () { return true }
        start.inclusive = true
    }
    if (options.limit != null && options.limit >= 0) {
        limit = options.limit
    }
    var range = options.reverse
         ? { inclusive: stop.inclusive, start: stop.test, stop: start.test, key: stop.value }
         : { inclusive: start.inclusive, start: start.test, stop: stop.test, key: start.value }
    return {
        valid: function (key) {
            return range.start(key) ? (range.stop(key) && count++ < limit ? 0 : 1) : -1
        },
        inclusive: range.inclusive,
        key: range.key,
        direction: options.reverse ? 'reverse' : 'forward'
    }
}
