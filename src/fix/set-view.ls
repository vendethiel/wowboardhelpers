# mere copypasta, removed last line (which redraws posts)
w.Cms.Forum.setView = (type, target) ->
	w.Cookie.create 'forumView', type, path: "/" expires: 8760

	w.$(target)addClass 'active'
		.siblings!
		.removeClass 'active'
		
	w.$('#posts')attr 'class' type