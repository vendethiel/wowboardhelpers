require! <[lang parse-time]>
{$$} = require 'dom'
relative = require 'relative-date-component'

timestamp = new Date!getTime!
post-titles = $$ '.post-title[data-simplified-time]'

for post-title in post-titles
	post-timestamp = parse-time post-title.dataset.simplified-time
	date = new Date timestamp - post-timestamp
	post-title.dataset.timestamp = date.getTime!

timeout = 10_000ms
refresh = ->
	for post-title in post-titles
		d = new Date Number post-title.dataset.timestamp

		post-title.querySelector '.simplified-time'
			.innerHTML = relative d

	setTimeout refresh, timeout
refresh!