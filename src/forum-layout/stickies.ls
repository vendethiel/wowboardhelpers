require! <[lang ../forum-options ../w]>
{$, node} = require 'dom'

#remove sticky part (tbody.sticky)
sticky = $ '.sticky'
unless 'show' is w.localStorage.getItem 'show-stickies'
	sticky.style.display = 'none'

#add sticky-toggling button
module.exports = button-sticky = node 'a' innerHTML: 'Post-its' title: lang.toggle-sticky, onclick: !->
	sticky.style.display = if sticky.style.display is 'none' then '' else 'none'

	#save user pref
	w.localStorage.setItem 'show-stickies' s.display || 'show'

button-sticky
	..style.cursor = 'pointer'

	forum-options.appendChild ..