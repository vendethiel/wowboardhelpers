~ require! lang

#account-characters
	h1.toggle
		= lang 'otherCharacters'

		if @toggle
			span.toggler= ' [+]'
	br

	ul
		for character in @characters.exclude @current
			li(style='#{["display: none" if @toggle]}')= character