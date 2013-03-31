require! <[lang ../forum-options ../w]>
{$, node} = require 'dom'

#remove sticky part (tbody.sticky)
unless 'show' is w.localStorage.getItem 'show-stickies'
	$ '.sticky' .style.display = 'none'

#add sticky-toggling button
module.exports = button-sticky = node 'a' innerHTML: 'Post-its' title: lang.toggle-sticky, onclick: !->
	(s = $ '.sticky' .style)display = if s.display is 'none' then '' else 'none'

	#save user pref
	w.localStorage.setItem 'show-stickies' s.display || 'show'

module.exports.style.cursor = 'pointer'

forum-options.appendChild button-sticky