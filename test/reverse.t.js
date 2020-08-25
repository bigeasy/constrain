require('proof')(21, prove)

function prove (okay) {
    function compare (a, b) { return a - b }
    function encoder (key) { return key }
    const constrain = require('..')
    {
        const range = constrain(compare, encoder, { lt: 3, gt: 1, reverse: true })
        okay(!range.inclusive, 'reverse gt inclusive')
        okay(range.included(2), 'reverse lt less than')
        okay(!range.included(1), 'reverse gt equal')
        okay(range.direction, 'reverse', 'reverse direction')
    }
    {
        const range = constrain(compare, encoder, { lte: 3, gt: 1, reverse: true })
        okay(range.inclusive, 'reverse gte inclusive')
        okay(range.key, 3, 'reverse lte key')
        okay(range.included(3), 'reverse lte equal')
        okay(range.included(2), 'reverse lte less than')
        okay(!range.included(1), 'reverse lte less excluded')
    }
    {
        const range = constrain(compare, encoder, { end: 3, reverse: true })
        okay(range.inclusive, 'reverse start inclusive')
        okay(range.key, 3, 'reverse start key')
        okay(range.included(3), 'reverse start equal')
        okay(range.included(2), 'reverse start less than')
    }
    {
        const range = constrain(compare, encoder, { gte: 1, reverse: true })
        okay(range.inclusive, 'reverse no key inclusive')
        okay(range.included(1), 'reverse gte equal')
        okay(!range.included(0), 'reverse gte less than')
        okay(range.key, null, 'reverse no key')
    }
    {
        const range = constrain(compare, encoder, { end: 1, lt: 1, reverse: true })
        okay(!range.inclusive, 'reverse start and lt inclusive')
        okay(range.key, 1, 'reverse start and lt key')
        okay(range.included(0), 'reverse start and lt less than')
    }
    {
        const range = constrain(compare, encoder, { start: 2, end: 1, reverse: true })
        okay(!range.included(0), 'reverse end beyond')
    }
}
