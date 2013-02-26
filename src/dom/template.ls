if 0 then require abc

/**
 * processes a template
 * and returns 
 */
function template(name, locals)
	name .= replace /-([a-z])/g -> it.1.toUpperCase!

	innerHTML = templates[name] locals
	
	node('div' {innerHTML})firstElementChild