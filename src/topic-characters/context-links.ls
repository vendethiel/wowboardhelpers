return unless topic

# adds context links
for context in topic.querySelectorAll '.context-links'
	el = node 'a',
		innerHTML: 'HF'
		className: 'link-first extra-link'
		href: context.children.0.href + 'achievement' #.context-links a:eq(0)

	context.insertBefore el, context.querySelector '.link-last'