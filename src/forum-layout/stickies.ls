require! <[lang ../forum-options]>
{$, node} = require 'dom'

#remove sticky part (tbody.sticky)
sticky = $ '.sticky'
unless 'show' is localStorage.getItem 'show-stickies'
	sticky.style.display = 'none'

#add sticky-toggling button
module.exports = button-sticky = node 'a' innerHTML: 'Post-its' title: lang.toggle-sticky, onclick: !->
	(s = sticky.style)display = ['none' '']find (!= s.display)

	#save user pref
	localStorage.setItem 'show-stickies' s.display or 'show'

button-sticky
	..style.cursor = 'pointer'

	forum-options.appendChild ..