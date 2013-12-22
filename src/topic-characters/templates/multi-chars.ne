:prelude
	require! <[lib/lang]>
	posts-of = ->
		name = it.split('/')[5 4]
		name.1 .= humanize!
		"http://eu.battle.net/wow/fr/search?f=post&amp;a=#{name * '%40'}&amp;sort=time"


#account-characters
	h1.toggle
		= lang 'otherCharacters'

		if @toggle
			span.toggler= ' [+]'
	br

	ul
		for character in @characters.exclude @current when character
			li(style='#{["display: none" if @toggle]}')
				= character
				a.see-messages(href="#{posts-of character}")