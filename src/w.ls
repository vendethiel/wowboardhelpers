{node} = require 'dom'

w = unsafeWindow ? window

unless w.Cms # let's detect this, 'tis something comin' from Blizzard Forums
	w = w.window = let
		var ret
		# fuck you chrome 27 http://crbug.com/222652
		el = document.createElement 'a'
		# chrome returns it at string because it sucks but it's fine since it'll fail anyway
		el.setAttribute 'onclick' 'return window;'
		el = that if el.onclick?!

		unless el.Cms
			console.log "It seems you're using Google Chrome, which is a bad browser and disables some of the features Wow Board Helpers provides."
			console.log "You may want to try the Injector version of this User Script, which should resolve your problems."
		el

module.exports = w