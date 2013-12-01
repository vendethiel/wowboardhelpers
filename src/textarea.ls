require! './topic'
{$} = require 'lib/dom'

module.exports = if topic
	$ '#post-edit textarea'
else null