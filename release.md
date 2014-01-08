### Accommodate AbstractLevelDOWN Fixups

AbstractLevelDOWN interprets the query parameters for us. It will set the start
property in all cases. For greater than going forward and less than going in
reverse, we get both a `start` property and a `lt` or `gt` property. Currently,
our logic expects one or the other. Correlate now accommodates the presence of
both a `start` key and a comparison key.

### Issue by Issue

 * Implement reversed `start` and `lt`. #23.
