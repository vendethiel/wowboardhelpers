module.exports = ->
	document.createElement 'div'
		..innerHTML = it
		return ..firstElementChild