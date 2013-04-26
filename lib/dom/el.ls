module.exports = ->
	document.createElement 'div'
		try ..innerHTML = it
		catch => console.log "failing html" it
		return ..firstElementChild