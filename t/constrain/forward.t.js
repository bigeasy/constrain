require('proof')(17, function (ok, equal) {
    function compare (a, b) { return a - b }
    function encoder (key) { return key }
    var constrain = require('../..')
    var range = constrain(compare, encoder, {})
    equal(range.valid(1), 0, 'forward no key start')
    equal(range.valid(1), 0, 'forward no key stop')
    ok(range.key == null, 'forward no key')
    equal(range.direction, 'forward', 'forward direction')
    var range = constrain(compare, encoder, { gte: 1, lte: 3 })
    equal(range.valid(1), 0, 'forward gte equal')
    equal(range.valid(2), 0, 'forward gte greater than')
    equal(range.valid(2), 0, 'forward lte less than')
    equal(range.valid(3), 0, 'forward lte equal')
    equal(range.valid(4), 1, 'forward lte greater than')
    equal(range.key, 1, 'forward lte key')
    var range = constrain(compare, encoder, { start: 1, gt: 1 })
    equal(range.key, 1, 'forward start and gt key')
    equal(range.valid(1), -1, 'forward start and gt equal')
    equal(range.valid(2), 0, 'forward start and gt greater than')
    var range = constrain(compare, encoder, { start: 1, limit: 1 })
    equal(range.valid(1), 0, 'forward limit not met')
    equal(range.valid(2), 1, 'forward limit met')
    var range = constrain(compare, encoder, { start: 1, limit: -1 })
    equal(range.valid(1), 0, 'forward unlimited limit not met')
    equal(range.valid(2), 0, 'forward unlimited limit unlimited')
})
