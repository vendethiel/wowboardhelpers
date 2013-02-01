return if thread

#remove sticky part (tbody.sticky)
tbody-sticky = document.getElementsByClassName 'sticky' .0
	unless 'show' is w.localStorage.getItem 'show-stickies'
		..style.display = 'none'

#add sticky-toggling button
button-sticky = node 'a' innerHTML: 'Post-its' title: lang.toggle-sticky, onclick: !->
	(s = tbody-sticky.style)display = if s.display is 'none' then '' else 'none'

	#save user pref
	w.localStorage.setItem 'show-stickies' s.display || 'show'


button-sticky.style.cursor = 'pointer'

forum-options.appendChild button-sticky