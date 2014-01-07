require('proof')(10, function (ok, equal) {
    function compare (a, b) { return a - b }
    function encoder (key) { return key }
    var correlate = require('../..')
    var range = correlate(compare, encoder, {})
    equal(range.valid(1), 0, 'forward no key start')
    equal(range.valid(1), 0, 'forward no key stop')
    ok(range.key == null, 'forward no key')
    equal(range.direction, 'forward', 'forward direction')
    var range = correlate(compare, encoder, { gte: 1, lte: 3 })
    equal(range.valid(1), 0, 'forward gte equal')
    equal(range.valid(2), 0, 'forward gte greater than')
    equal(range.valid(2), 0, 'forward lte less than')
    equal(range.valid(3), 0, 'forward lte equal')
    equal(range.valid(4), 1, 'forward lte greater than')
    ok(range.key == 1, 'forward lte key')
})
