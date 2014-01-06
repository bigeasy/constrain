require('proof')(3, function (ok, equal) {
    function compare (a, b) { return a - b }
    function encoder (key) { return key }
    var correlate = require('../..')
    var range = correlate(compare, encoder, {})
    ok(range.start(1), 'forward no key start')
    ok(range.stop(1), 'forward no key stop')
    ok(range.key == null, 'forward no key')
})
