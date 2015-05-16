{node} = require 'lib/dom'

w = unsafeWindow ? window

unless w.Wow # let's detect this, it's something comin' from Blizzard Forums
	w := void
	console.log "It seems you're using Google Chrome, which is a bad browser and disables some of the features Wow Board Helpers provides."
	console.log "You may want to try the Injector version of this UserScript, which should resolve your problems."

module.exports = w or {}