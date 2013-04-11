require! lang

units = {[name, 1[name]!] for name in <[second minute hour day]>}

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