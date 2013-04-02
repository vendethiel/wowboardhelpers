if document.getElementById 'crabby-shell'
	that.parentNode.removeChild that
else # FUCK YOU FIREFOX YOU MAKE NO SENSE
	setTimeout ->
		if document.getElementById 'crabby-shell'
			that.parentNode.removeChild that
	, 300ms