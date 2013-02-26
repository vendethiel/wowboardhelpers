require! <[topic dom/$$]>

#pagination
pages = $$ '#forum-actions-top .ui-pagination li:not(.cap-item)'

#we have some pages and we're not on the last page
if pages and (pages.length or 'current' is pages[*-1]className)
		#get the post-count (#xx) : .post-info:last > a[href]
		post-count = topic.getElementsByClassName 'post-info'
			.[*-1]getElementsByTagName 'a' .0 #bikoz :last-child sucks ballzzzz
			.getAttribute 'href' .slice 1 #remove #

		last-poster-name = topic.getElementsByClassName 'char-name-code' .[*-1]innerHTML.trim!

		#mark as read
		localStorage.setItem "topic_#{topic.dataset.id}" post-count
		localStorage.setItem "topic_lp_#{topic.dataset.id}" last-poster-name