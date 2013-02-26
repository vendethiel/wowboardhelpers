w = unsafeWindow ? window
'use strict'

w.Cms or # let's detect this, 'tis something comin' from Blizzard Forums
	unsafeWindow = w = w.unsafeWindow = let
		el = document.createElement 'p'
		el.setAttribute 'onclick' 'return window;'
		el.onclick!

module.exports = w