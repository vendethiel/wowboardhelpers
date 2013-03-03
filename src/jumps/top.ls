require! <[bind-key dom/$]>

bind-key 't' 'page-top' !->
	$ '#logo' .scrollIntoView!