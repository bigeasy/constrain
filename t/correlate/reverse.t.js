require('proof')(10, function (ok, equal) {
    function compare (a, b) { return a - b }
    function encoder (key) { return key }
    var correlate = require('../..')
    var x = correlate(compare, encoder, { lt: 3, gt: 1, reverse: true })
    ok(!range.start(3), 'reverse lt equal')
    ok(range.start(2), 'reverse lt less than')
    ok(!range.stop(1), 'reverse gt equal')
    ok(range.stop(2), 'reverse gt greater than')
    var x = correlate(compare, encoder, { lte: 3, gt: 1, reverse: true })
    equal(range.key, 3, 'reverse lte key')
    ok(range.start(3), 'reverse lte equal')
    ok(range.start(2), 'reverse lte less than')
    var x = correlate(compare, encoder, { start: 3, reverse: true })
    equal(range.key, 3, 'reverse start key')
    ok(range.start(3), 'reverse start equal')
    ok(range.start(2), 'reverse start less than')
})
