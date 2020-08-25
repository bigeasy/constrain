require('proof')(23, prove)

function prove (okay) {
    function compare (a, b) { return a - b }
    function encoder (key) { return key }
    var constrain = require('..')
    {
        const constraint = constrain(compare, encoder, {})
        okay(constraint.inclusive, 'forward no key inclusive')
        okay(constraint.included(1), 'forward no key start')
        okay(constraint.included(1), 'forward no key stop')
        okay(constraint.key == null, 'forward no key')
        okay(constraint.direction, 'forward', 'forward direction')
    }
    {
        const constraint = constrain(compare, encoder, { gte: 1, lte: 3 })
        okay(constraint.inclusive, 'forward gte inclusive')
        okay(constraint.included(1), 'forward gte equal')
        okay(constraint.included(2), 'forward gte greater than')
        okay(constraint.included(2), 'forward lte less than')
        okay(constraint.included(3), 'forward lte equal')
        okay(!constraint.included(4), 'forward lte greater than')
        okay(constraint.key, 1, 'forward lte key')
    }
    {
        const constraint = constrain(compare, encoder, { start: 1, gt: 1 })
        okay(!constraint.inclusive, 'forward start and gt inclusive')
        okay(constraint.key, 1, 'forward start and gt key')
        okay(constraint.included(1), 'forward start and gt equal')
        okay(constraint.included(2), 'forward start and gt greater than')
    }
    {
        const constraint = constrain(compare, encoder, { gt: 1 })
        okay(!constraint.inclusive, 'forward gt inclusive')
    }
    {
        const constraint = constrain(compare, encoder, { start: 1, limit: 1 })
        okay(constraint.inclusive, 'forward start inclusive')
        okay(constraint.included(1), 'forward limit not met')
        okay(!constraint.included(2), 'forward limit met')
    }
    {
        const constraint = constrain(compare, encoder, { start: 1, limit: -1 })
        okay(constraint.included(1), 'forward unlimited limit not met')
        okay(constraint.included(2), 'forward unlimited limit unlimited')
    }
    {
        const constraint = constrain(compare, encoder, { start: 1, end: 3 })
        okay(!constraint.included(4), 'forward end beyond')
    }
}
