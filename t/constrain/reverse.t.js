require('proof')(18, function (ok, equal) {
    function compare (a, b) { return a - b }
    function encoder (key) { return key }
    var constrain = require('../..')
    var range = constrain(compare, encoder, { lt: 3, gt: 1, reverse: true })
    equal(range.valid(3), -1, 'reverse lt equal')
    equal(range.valid(2), 0, 'reverse lt less than')
    equal(range.valid(1), 1, 'reverse gt equal')
    equal(range.valid(2), 0, 'reverse gt greater than')
    equal(range.direction, 'reverse', 'reverse direction')
    var range = constrain(compare, encoder, { lte: 3, gt: 1, reverse: true })
    equal(range.key, 3, 'reverse lte key')
    equal(range.valid(3), 0, 'reverse lte equal')
    equal(range.valid(2), 0, 'reverse lte less than')
    var range = constrain(compare, encoder, { start: 3, reverse: true })
    equal(range.key, 3, 'reverse start key')
    equal(range.valid(3), 0, 'reverse start equal')
    equal(range.valid(2), 0, 'reverse start less than')
    var range = constrain(compare, encoder, { gte: 1, reverse: true })
    equal(range.valid(1), 0, 'reverse gte equal')
    equal(range.valid(0), 1, 'reverse gte less than')
    ok(range.key == null, 'reverse no key')
    var range = constrain(compare, encoder, { start: 1, lt: 1, reverse: true })
    equal(range.key, 1, 'reverse start and gt key')
    equal(range.valid(1), -1, 'reverse start and lt equal')
    equal(range.valid(0), 0, 'reverse start and lt less than')
    var range = constrain(compare, encoder, { start: 2, end: 1, reverse: true })
    equal(range.valid(0), 1, 'reverse end beyond')
})
