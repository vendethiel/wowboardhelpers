{node} = require 'dom'

w = unsafeWindow ? window
inject = ->
	document.body.appendChild node 'script' innerHTML: ";#it;"

unless w.Cms # let's detect this, 'tis something comin' from Blizzard Forums
	w = w.window = let
		# fuck you chrome 27 http://crbug.com/222652
		el = document.createElement 'p'
		el.setAttribute 'onclick' 'return window;'
		el .= onclick!
		if el.Cms # WE DID IT
			return el
		
		var fetched-window
		fetch-window = -> fetched-window := it.detail
		addEventListener 'chrome:ownage' fetch-window
		inject 'window.dispatchEvent(new CustomEvent("chrome:ownage", {detail: window}))'
		fetched-window

module.exports = w