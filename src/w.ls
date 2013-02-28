w = unsafeWindow ? window

unless w.Cms # let's detect this, 'tis something comin' from Blizzard Forums
	w = w.window = let
		el = document.createElement 'p'
		el.setAttribute 'onclick' 'return window;'
		el.onclick!

module.exports = w