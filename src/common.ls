w = unsafeWindow ? w
forum-options = QS '.forum-options'

if thread = document.getElementById 'thread'
	thread.dataset.id = ((document.location / '/')[*-1] / '?')0
else
	export tbody-regular = QS 'tbody.regular'

posts = document.getElementById 'posts'

#@todo add `...childs` ? slow downs a lot =(
function node(tag, props = {})
	(document.createElement tag) <<< props

/**
 * processes a template
 * and returns 
 */
function template(name, locals)
	name .= replace /-([a-z])/g -> it.1.toUpperCase!

	innerHTML = templates[name] locals
	
	node('div' {innerHTML})lastChild

/**
 * fetches nextElementSibling
 */
function fetch-siblings(elem, {slice = 0, index-by = 'className'})
	{[elem[index-by]slice slice; elem] while elem?.=nextElementSibling}

#QSA = document.querySelectorAll ? (requires this to be moved up)
function QSA then document.querySelectorAll it

function QS then document.querySelector it


export w, thread, posts, forum-options, node, template, QSA, QS, fetch-siblings