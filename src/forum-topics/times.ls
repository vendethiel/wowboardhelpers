require! <[lib/lang lib/parse-time]>
{$$} = require 'lib/dom'

current = Date.now!
post-titles = $$ '.post-title[data-date-string]'

dates = []

for post-title in post-titles
	post-timestamp = parse-time post-title.dataset.date-string
	date = Date.create current - post-timestamp
	timestamp = date.getTime!

	dates[timestamp] = date
	post-title.dataset <<< {timestamp}

(->
	for post-title in post-titles
		date = dates[post-title.dataset.timestamp]

		post-title.querySelector '.relative-date'
			.innerHTML = date.relative!
)every 10.seconds!