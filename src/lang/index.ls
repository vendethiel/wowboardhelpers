l = (document.location / '/')4

langs =
	fr: require './fr'
	en: require './en'

require! 'string/toCamelCase'

module.exports = class lang # acts like a proxy to avoid unneeded keys
	import langs[l] ? langs.en
	-> return lang[it] ? lang[toCamelCase it] ? it

	@pluralize ?= (count, key) ~>
		"#{Math.round count} #{@ key}#{['s' if count > 1.5]}"

	@singularize ?= ->
		if it[*-1] is 's'
			it.slice 0 -1
		else
			it