module.exports = function (comparator, encoder, options) {
    const reverse = options.reverse || false
    const direction = reverse ? 'reverse' : 'forward'
    const include = (reverse ? options.gt : options.lt) ? 0 : 1
    const multipler = options.reverse ? -1 : 1
    const inclusive = ! (options.reverse ? options.lt : options.gt)
    const start = options.gt || options.start || options.gte || null
    const end = options.lt || options.end || options.lte || null
    const key = options.reverse ? end : start
    const boundary = options.reverse ? start : end
    const limit = options.limit ? options.limit : -1
    const compare = boundary == null
        ? options.reverse
            ? () => 1
            : () => -1
        : comparator
    let count = 0
    function included (value) {
        if (compare(value, boundary) * multipler < include && count != limit) {
            count++
            return true
        }
        return false
    }
    return { included, inclusive, key, direction, options }
}
