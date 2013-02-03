#@todo add `...childs` ? slow downs a lot =(
function node(tag, props = {})
	(document.createElement tag) <<< props


function replace-with(from-node, new-node)
	parent = from-node.parentNode

	# do we have to insert it at some pos ?
	if from-node.nextSibling
		parent.removeChild from-node
		parent.insertBefore new-node, that
	else
		parent.removeChild from-node
		parent.appendChild new-node

/**
 * processes a template
 * and returns 
 */
function template(name, locals)
	name .= replace /-([a-z])/g -> it.1.toUpperCase!

	innerHTML = templates[name] locals
	
	node('div' {innerHTML})firstChild

/**
 * fetches nextElementSibling
 */
function fetch-siblings(elem, {slice = 0, index-by = 'className'})
	{[elem[index-by]slice slice; elem] while elem?.=nextElementSibling}

#QSA = document.querySelectorAll ? (requires this to be moved up)
function QSA then document.querySelectorAll it

function QS then document.querySelector it
export node, replace-with, template, QSA, QS, fetch-siblings