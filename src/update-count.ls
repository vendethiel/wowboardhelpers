return unless thread

#pagination
pages = QSA '#forum-actions-top .ui-pagination li:not(.cap-item)'

#we have some pages and we're not on the last page
if pages?length and 'current' isnt pages[*-1]className
	return

#get the post-count (#xx) : .post-info:last > a[href]
post-count = thread.getElementsByClassName 'post-info'
	.[*-1]getElementsByTagName 'a' .0 #bikoz :last-child sucks ballzzzz
	.getAttribute 'href' .slice 1 #remove #

last-poster-name = thread.getElementsByClassName 'char-name-code' .[*-1]innerHTML.trim!

#mark as read
w.localStorage.setItem "topic_#{thread.dataset.id}" post-count
w.localStorage.setItem "topic_lp_#{thread.dataset.id}" last-poster-name