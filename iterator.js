const coalesce = require('extant')
const assert = require('assert')

const mvcc = require('mvcc')

module.exports = function (source, options) {
    const terminate = function () {
        if (typeof options == 'function') {
            return options
        }
        const include = options.key == null || coalesce(options.inclusive, true) ? 1 : 0
        const reverse = source.type == mvcc.REVERSE ? -1 : 1
        const comparator = options.key == null
            ? function () { return 0 }
            : options.comparator
        let limit = coalesce(options.limit, -1)
        return function (item) {
            if (comparator(item.key, options.key) * reverse >= include || limit-- == 0) {
                return true
            }
            return false
        }
    } ()
    const iterator = {
        done: false,
        next (trampoline, consume, terminator = iterator) {
            source.next(trampoline, items => {
                for (let i = 0, I = items.length; i < I; i++) {
                    if (terminate(items[i])) {
                        consume(items.slice(0, i))
                        terminator.done = true
                        return
                    }
                }
                consume(items)
            }, terminator)
        }
    }
    return iterator
}
