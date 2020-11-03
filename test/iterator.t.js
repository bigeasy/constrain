require('proof')(10, async okay => {
    const mvcc = {
        advance: require('advance'),
        constrain: require('../iterator')
    }
    const set = [
        [{ key: 1 }, { key: 2 }, { key: 3 }],
        [{ key: 4 }, { key: 5 }, { key: 6 }]
    ]

    function comparator (left, right) {
        return left - right
    }

    {
        const gathered = []
        const iterator = mvcc.advance.forward(set)
        const constrained = mvcc.constrain(iterator, { key: 4, comparator })
        while (! constrained.done) {
            constrained.next(null, items => {
                gathered.push.apply(gathered, items)
            })
        }
        okay(gathered.map(item => item.key), [ 1, 2, 3, 4 ], 'forward inclusive')
    }

    {
        const gathered = []
        const iterator = mvcc.advance.forward(set)
        const constrained = mvcc.constrain(iterator, { key: 4, comparator, inclusive: false })
        while (! constrained.done) {
            constrained.next(null, items => {
                gathered.push.apply(gathered, items)
            })
        }
        okay(gathered.map(item => item.key), [ 1, 2, 3 ], 'forward exclusive')
    }

    {
        const gathered = []
        const iterator = mvcc.advance.reverse(set)
        const constrained = mvcc.constrain(iterator, { key: 3, comparator, reverse: true })
        while (! constrained.done) {
            constrained.next(null, items => {
                gathered.push.apply(gathered, items)
            })
        }
        okay(gathered.map(item => item.key), [ 6, 5, 4, 3 ], 'reverse inclusive')
    }

    {
        const gathered = []
        const iterator = mvcc.advance.reverse(set)
        const constrained = mvcc.constrain(iterator, { key: 3, comparator, reverse: true, inclusive: false })
        while (! constrained.done) {
            constrained.next(null, items => {
                gathered.push.apply(gathered, items)
            })
        }
        okay(gathered.map(item => item.key), [ 6, 5, 4 ], 'reverse exclusive')
    }

    {
        const gathered = []
        const iterator = mvcc.advance.forward(set)
        const constrained = mvcc.constrain(iterator, { key: 4, comparator, limit: 0 })
        while (! constrained.done) {
            constrained.next(null, items => {
                gathered.push.apply(gathered, items)
            })
        }
        okay(gathered.map(item => item.key), [], 'limit zero')
    }

    {
        const gathered = []
        const iterator = mvcc.advance.forward(set)
        const constrained = mvcc.constrain(iterator, { key: 4, comparator, limit: 2 })
        while (! constrained.done) {
            constrained.next(null, items => {
                gathered.push.apply(gathered, items)
            })
        }
        okay(gathered.map(item => item.key), [ 1, 2 ], 'limit two')
    }

    {
        const gathered = []
        const iterator = mvcc.advance.forward(set)
        const constrained = mvcc.constrain(iterator, item => item.key == 3)
        while (! constrained.done) {
            constrained.next(null, items => {
                gathered.push.apply(gathered, items)
            })
        }
        okay(gathered.map(item => item.key), [ 1, 2 ], 'function terminator')
    }

    {
        const gathered = []
        const iterator = mvcc.advance.forward(set)
        const constrained = mvcc.constrain(iterator, item => item.key == 3)
        while (! constrained.done) {
            constrained.next(null, items => {
                gathered.push.apply(gathered, items)
            })
        }
        okay(gathered.map(item => item.key), [ 1, 2 ], 'function terminator')
    }

    {
        const gathered = []
        const iterator = mvcc.advance.forward(set)
        const constrained = mvcc.constrain(iterator, { limit: 2 })
        while (! constrained.done) {
            constrained.next(null, items => {
                gathered.push.apply(gathered, items)
            })
        }
        okay(gathered.map(item => item.key), [ 1, 2 ], 'limit only forward')
    }

    {
        const gathered = []
        const iterator = mvcc.advance.reverse(set)
        const constrained = mvcc.constrain(iterator, { limit: 2, reverse: true })
        while (! constrained.done) {
            constrained.next(null, items => {
                gathered.push.apply(gathered, items)
            })
        }
        okay(gathered.map(item => item.key), [ 6, 5 ], 'limit only reverse')
    }
})
