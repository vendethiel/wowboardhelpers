return unless topic

# adds context links
for context in topic.querySelectorAll '.context-links'
	continue if context.children.length is 1 # blizz

	el = template 'context-links' link: context.children.0.href

	context.insertBefore el, context.querySelector '.link-last'