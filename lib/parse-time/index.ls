require! lang

units =
	second: 1000ms
	minute: 60_000ms
	hour  : 3_600_000ms
	day   : 86_400_000ms

module.exports = ->
	total = 0
	for timespan in it / ', '
		[count, unit] = timespan / ' '

		if count is lang 'few'
			count = 5
			unit = lang 'second'

		#use lang to get correct unit
		total += count * units[lang lang.singularize unit]
	total