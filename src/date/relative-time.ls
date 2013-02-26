require! 'lang'

module.exports = relative-time = ->
	if ( days = ( ( diff = Date.now! - it.getTime! ) / 86400000 ) ) > 1
		lang.pluralize days, \day
	else if ( hours = days * 24 ) > 1
		lang.pluralize hours, \hour
	else if ( minutes = hours * 60 ) > 1
		lang.pluralize minutes, \minute
	else if ( seconds = minutes * 60 ) >= 1
		lang.pluralize seconds, \second
	else
		lang.few-seconds-ago