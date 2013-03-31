require! '../topic'
{$$} = require 'dom'

#pagination
pages = $$ '#forum-actions-top .ui-pagination li:not(.cap-item)'

#we have some pages and we're not on the last page
if pages
	if not pages.length # first page
		or (pages.length and 'current' is pages[*-1]className) # last page
		or not localStorage.getItem "topic_#{topic.dataset.id}" # never visited + pages
	then
		#get the post-count (#xx) : .post-info:last > a[href]
		post-count = topic.getElementsByClassName 'post-info'
			.[*-1]getElementsByTagName 'a' .0 #bikoz :last-child sucks ballzzzz
			.getAttribute 'href' .slice 1 #remove #

		last-poster-name = topic.getElementsByClassName 'char-name-code' .[*-1]innerHTML.trim!

		#mark as read
		localStorage.setItem "topic_#{topic.dataset.id}" post-count
		localStorage.setItem "topic_lp_#{topic.dataset.id}" last-poster-name