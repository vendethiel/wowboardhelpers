{node} = require 'dom'

w = unsafeWindow ? window
inject = ->
	document.body.appendChild node 'script' innerHTML: ";#it;"

unless w.Cms # let's detect this, 'tis something comin' from Blizzard Forums
	w = w.window = let
		var ret
		# fuck you chrome 27 http://crbug.com/222652
		el = document.createElement 'p'
		el.setAttribute 'onclick' 'return window;'
		el .= onclick!

		unless el.Cms
			console.log "It seems you're using Google Chrome, which is a bad browser and disables some of the features Wow Board Helpers provides."
		el

module.exports = w