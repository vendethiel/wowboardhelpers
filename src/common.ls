thread = document.getElementById 'thread'
w = unsafeWindow ? w
posts = document.getElementById 'posts'

#@todo add `...childs` ? slow downs a lot =(
function node(tag, props = {})
	(document.createElement tag) <<< props

function hide-all(selector)
	for el in elements = QSA selector
		el.style.display = 'none'

	elements

function show-all(selector)
	for el in elements = QSA selector
		el.style.display = 'block'

	elements

/**
 * fetches nextElementSibling
 */
function fetch-siblings(elem, {slice = 0, index-by = 'className'})
	{[elem[index-by]slice slice; elem] while elem?.=nextElementSibling}

#QSA = document.querySelectorAll ? (requires this to be moved up)
function QSA then document.querySelectorAll it

function QS then document.querySelector it


export posts, thread, w, node, hide-all, show-all, QSA, QS, fetch-siblings