require! <[lang parse-time]>
{$$} = require 'dom'

timestamp = Date.now!
post-titles = $$ '.post-title[data-date-string]'

dates = []

for post-title in post-titles
	post-timestamp = parse-time post-title.dataset.date-string
	date = new Date timestamp - post-timestamp
	console.log post-title.dataset.date-string, post-timestamp, date
	timestamp = date.getTime!

	dates[timestamp] = date
	post-title.dataset <<< {timestamp}

timeout = 10.seconds!
console.log 30.hoursAgo!relative!
refresh = ->
	for post-title in post-titles
		date = dates[post-title.dataset.timestamp]

		post-title.querySelector '.relative-date'
			.innerHTML = date.relative!

	setTimeout refresh, timeout
refresh!