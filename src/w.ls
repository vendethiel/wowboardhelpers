w = unsafeWindow ? window

# XXX apparently chrome will give me the D by disabling this workaround :[
#  ( http://crbug.com/222652 )
unless w.Cms # let's detect this, 'tis something comin' from Blizzard Forums
	w = w.window = let
		el = document.createElement 'p'
		el.setAttribute 'onclick' 'return window;'
		el.onclick!

module.exports = w