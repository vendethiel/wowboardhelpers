{$$} = require 'lib/dom'

for infos in $$ '.user-details'
	link = infos.querySelector '.icon-profile.link-first' ?.getAttribute 'href'
	continue unless link # cm etc
	continue if link.has '//' # moved character
	[, , , , realm] = link / '/'
	realm .= replace '-' ' ' .capitalize true .replace ' ' '-' # format properly

	infos.querySelector '.character-desc' ?.innerHTML += "<br />#realm"