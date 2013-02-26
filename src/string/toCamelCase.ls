module.exports = toCamelCase = ->
	it.replace /[_-]([a-z])/g -> it.1.toUpperCase!