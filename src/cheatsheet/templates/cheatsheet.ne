~ require! 'lib/lang'

#cheatsheet-container
	// that's meh but ...
	span.clear
	#cheatsheet
		// what's wrong with you blizz ?
		button.toggler.ui-button.button1
			span.button-left: span.button-right= lang.cheatsheet

		ul
			for key, val of @cheatsheet
				li
					b= key
					| : #val