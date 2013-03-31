require! './topic'
{$} = require 'dom'

module.exports = if topic
	$ '#post-edit textarea'
else null