require! <[lib/lang]>
{$} = require 'lib/dom'

if lang.html-overrides
	for k, v of that
		$ k ?.innerHTML = v