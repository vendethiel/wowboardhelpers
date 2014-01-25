{$, node} = require 'lib/dom'

actions-right = $ '.forum-actions-top .actions-right'
	..insertBefore do
		forum-options = node 'div' className: 'forum-options'
		$ '.inner-search-wrapper' ..

module.exports = forum-options