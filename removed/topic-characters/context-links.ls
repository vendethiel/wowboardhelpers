return unless topic

for post-character in QSA '.post-character'
	context-links = post-character.querySelector '.context-links'
	html = context-links.innerHTML

	post-character.appendChild template 'context-links' {html}

	context-links.parentNode.parentNode # .ui-context .context
		..parentNode.removeChild ..