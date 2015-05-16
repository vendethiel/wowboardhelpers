{$, node} = require 'lib/dom'

actions-right = $ '.forum-actions-top .paging-wrapper'
	..insertBefore do
		forum-options = node 'div' className: 'forum-options'
		$ '.inner-search-wrapper' ..

module.exports = forum-options