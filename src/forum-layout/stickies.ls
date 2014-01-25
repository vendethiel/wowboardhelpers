require! <[lib/lang ../forum-options]>
{$, node} = require 'lib/dom'

#remove sticky part (tbody.sticky)
sticky = $ 'tbody.stickied-topics'

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