return unless topic

# adds context links
for context in topic.querySelectorAll '.context-links'
	el = template 'context-links' link: context.children.0.href

	context.insertBefore el, context.querySelector '.link-last'