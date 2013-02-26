require! 'dom/node'

/**
 * processes a template
 * and returns 
 */
module.exports = function template(t, locals)
	innerHTML = t locals
	
	node('div' {innerHTML})firstElementChild