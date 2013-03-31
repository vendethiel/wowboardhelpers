{cheatsheet} = require './bind-key'
if Object.keys cheatsheet .length
	possible-divs =
		'.forum-info' # forum topics page
		'.talkback form'

	{$, el} = require 'dom'
	template-cheatsheet = require './templates/cheatsheet'

	for sel in possible-divs when $ sel
		that.appendChild <| do
			el template-cheatsheet {cheatsheet}
				ul = ..querySelector 'ul'
				ul.style.display = 'none'

				..querySelector '.toggler' .onclick = ->
					ul.style.display = if ul.style.display is 'none'
						''
					else 'none'
		break