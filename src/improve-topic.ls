return unless topic

for infos in document.getElementsByClassName 'character-info'
	realm = infos.querySelector '.context-user span' .innerHTML

	infos.querySelector '.character-desc' ?.innerHTML += "<br />#realm"