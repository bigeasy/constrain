require('proof')(10, function (ok, equal) {
    function compare (a, b) { return a - b }
    function encoder (key) { return key }
    var correlate = require('../..')
    var x = correlate(compare, encoder, { lt: 3, gt: 1, reverse: true })
    ok(!x.start(3), 'reverse lt equal')
    ok(x.start(2), 'reverse lt less than')
    ok(!x.stop(1), 'reverse gt equal')
    ok(x.stop(2), 'reverse gt greater than')
    var x = correlate(compare, encoder, { lte: 3, gt: 1, reverse: true })
    equal(x.key, 3, 'reverse lte key')
    ok(x.start(3), 'reverse lte equal')
    ok(x.start(2), 'reverse lte less than')
    var x = correlate(compare, encoder, { start: 3, reverse: true })
    equal(x.key, 3, 'reverse start key')
    ok(x.start(3), 'reverse start equal')
    ok(x.start(2), 'reverse start less than')
})
