return unless Object.keys cheatsheet .length

possible-divs =
	'.forum-info' # forum topics page
	'.talkback form'

for sel in possible-divs when QS sel
	that.appendChild <| do
		template 'cheatsheet' {cheatsheet}
			ul = ..querySelector 'ul'
			ul.style.display = 'none'

			..querySelector '.toggler' .onclick = ->
				ul.style.display = if ul.style.display is 'none'
					''
				else 'none'
	break