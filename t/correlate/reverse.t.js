require('proof')(2, function (ok) {
    function compare (a, b) { return a - b }
    var correlate = require('../..')
    var x = correlate(compare, { lt: 3, gt: 1, reverse: true })
    ok(!x.start(3), 'reverse gt equal')
    ok(x.start(2), 'reverse gt less than')
})
