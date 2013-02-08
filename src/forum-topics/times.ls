units =
	second: 1000ms
	minute: 60_000ms
	hour  : 3_600_000ms
	day   : 8_640_000ms

timestamp = new Date!getTime!
post-titles = QSA '.post-title[data-simplified-time]'

for post-title in post-titles
	total = 0
	for timespan in post-title.dataset.simplified-time / ', '
		[count, unit] = timespan / ' '

		#use lang to get correct unit
		total += count * units[lang[lang.singularize unit]]

	date = new Date timestamp - total
	#post-title.innerHTML .= replace '>)' ">, #{date.getHours!}:#{date.getMinutes!})"
	#post-title.querySelector '.simplified-time' .datetime = date.toString!
	post-title.dataset.timestamp = date.getTime!

timeout = 10 * units.second #1 minute
refresh = ->
	for post-title in post-titles
		d = new Date Number post-title.dataset.timestamp

		post-title.querySelector '.simplified-time'
			.innerHTML = d.relative-time!

	setTimeout refresh, timeout
refresh!