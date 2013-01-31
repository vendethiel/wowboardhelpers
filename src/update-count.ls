return unless thread

#pagination
{length: l}:pages? = QSA '#forum-actions-top .ui-pagination li:not(.cap-item)'

#we have some pages and we're not on the last page
if l and 'current' isnt c = pages[*-1]className
	return
l ||= 1

#get the topic id from the URL
topic-id = ((document.location / '/')[*-1] / '?')0

#get the post-count (#xx) : .post-info:last > a[href]
post-count = thread.getElementsByClassName 'post-info'
	.[*-1]getElementsByTagName 'a' .0 #bikoz :last-child sucks ballzzzz
	.getAttribute 'href' .slice 1 #remove #

last-poster-name = thread.getElementsByClassName 'char-name-code' .[*-1]innerHTML.trim!

#mark as read
w.localStorage.setItem "topic_#topic-id" post-count
w.localStorage.setItem "topic_lp_#topic-id" last-poster-name