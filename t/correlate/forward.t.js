require('proof')(9, function (ok, equal) {
    function compare (a, b) { return a - b }
    function encoder (key) { return key }
    var correlate = require('../..')
    var range = correlate(compare, encoder, {})
    ok(range.start(1), 'forward no key start')
    ok(range.stop(1), 'forward no key stop')
    ok(range.key == null, 'forward no key')
    var range = correlate(compare, encoder, { gte: 1, lte: 3 })
    ok(range.start(1), 'forward gte equal')
    ok(range.start(2), 'forward gte greater than')
    ok(range.stop(2), 'forward lte less than')
    ok(range.stop(3), 'forward lte equal')
    ok(!range.stop(4), 'forward lte greater than')
    ok(range.key == 1, 'forward lte key')
})
