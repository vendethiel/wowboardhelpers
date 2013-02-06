return unless forum

#remove sticky part (tbody.sticky)
unless 'show' is w.localStorage.getItem 'show-stickies'
	QS '.sticky' .style.display = 'none'

#add sticky-toggling button
button-sticky = node 'a' innerHTML: 'Post-its' title: lang.toggle-sticky, onclick: !->
	(s = QS '.sticky' .style)display = if s.display is 'none' then '' else 'none'

	#save user pref
	w.localStorage.setItem 'show-stickies' s.display || 'show'


button-sticky.style.cursor = 'pointer'

forum-options.appendChild button-sticky