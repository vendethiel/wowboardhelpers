require! <[lang ../forum-options]>
{$, node} = require 'dom'

#remove sticky part (tbody.sticky)
sticky = $ '.sticky'
unless 'show' is localStorage.getItem 'show-stickies'
	sticky.style.display = 'none'

#add sticky-toggling button
module.exports = button-sticky = node 'a' innerHTML: 'Post-its' title: lang.toggle-sticky, onclick: !->
	sticky.style.display = ['none' '']exclude(sticky.style.display)0

	#save user pref
	localStorage.setItem 'show-stickies' s.display || 'show'

button-sticky
	..style.cursor = 'pointer'

	forum-options.appendChild ..