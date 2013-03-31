require! 'lang'
{$$} = require 'dom'
{relative-time} = require 'date'

units =
	second: 1000ms
	minute: 60_000ms
	hour  : 3_600_000ms
	day   : 86_400_000ms

timestamp = new Date!getTime!
post-titles = $$ '.post-title[data-simplified-time]'

for post-title in post-titles
	total = 0
	for timespan in post-title.dataset.simplified-time / ', '
		[count, unit] = timespan / ' '

		if count is lang 'few'
			count = 5
			unit = lang 'second'

		#use lang to get correct unit
		total += count * units[lang lang.singularize unit]
		console.log count, lang.singularize unit if total isnt total

	date = new Date timestamp - total
	post-title.dataset.timestamp = date.getTime!

timeout = 10 * units.second #1 minute
refresh = ->
	for post-title in post-titles
		d = new Date Number post-title.dataset.timestamp

		post-title.querySelector '.simplified-time'
			.innerHTML = relative-time d

	setTimeout refresh, timeout
refresh!