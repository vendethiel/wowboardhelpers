require! lang
{$$} = require 'dom'

module.exports = jump = !->
	page = prompt lang 'page-number'
	if "#{+page}" is page # ignore if not a valid number
		document.location = do
			("#{document.location}" / '/')[til -1] * '/' +
			"/?page=#{page >? 1}"

for $$ '.forum-actions .expander'
	..onclick = jump