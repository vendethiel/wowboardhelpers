{cheatsheet} = require './bind-key'
{$, el} = require 'lib/dom'

if cheatsheet.size!
	possible-divs =
		'.forum-wrapper'
		'.forum-actions-bottom'

	template-cheatsheet = require './templates/cheatsheet'

	for sel in possible-divs when $ sel
		that.appendChild <| do
			el template-cheatsheet {cheatsheet}
				ul = ..querySelector 'ul'
				ul.style.display = 'none'

				..querySelector '.toggler' .onclick = !->
					ul.style.display = ['none' '']find (!= ul.style.display)
					it.preventDefault!
		break