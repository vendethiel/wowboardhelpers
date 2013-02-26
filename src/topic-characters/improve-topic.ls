for infos in document.getElementsByClassName 'character-info'
	realm = infos.querySelector '.context-user span'
	continue unless realm #cm etc
	realm .= innerHTML

	infos.querySelector '.character-desc' ?.innerHTML += "<br />#realm"