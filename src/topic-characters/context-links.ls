require! '../topic'
{el} = require 'dom'

template-context-links = require './templates/context-links'

for context in topic.querySelectorAll '.context-links'
	continue if context.children.length is 1 # blizz or deleted

	extra-context = el template-context-links link: context.children.0.href

	context.insertBefore extra-context, context.querySelector '.link-last'