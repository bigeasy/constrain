require('proof')(9, function (ok, equal) {
    function compare (a, b) { return a - b }
    function encoder (key) { return key }
    var correlate = require('../..')
    var range = correlate(compare, encoder, {})
    ok(range.valid(1), 'forward no key start')
    ok(range.valid(1), 'forward no key stop')
    ok(range.key == null, 'forward no key')
    var range = correlate(compare, encoder, { gte: 1, lte: 3 })
    ok(range.valid(1), 'forward gte equal')
    ok(range.valid(2), 'forward gte greater than')
    ok(range.valid(2), 'forward lte less than')
    ok(range.valid(3), 'forward lte equal')
    ok(!range.valid(4), 'forward lte greater than')
    ok(range.key == 1, 'forward lte key')
})
