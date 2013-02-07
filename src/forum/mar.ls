return unless forum
all-read = false

export button-mar = node 'a' innerHTML: 'MAR' title: lang.mar, onclick: !->
	return if all-read
	!:=all-read

	for row in tbody-regular.children
		continue if row.className.trim! is 'read'

		topic-id = row.id.slice 'postRow'length
		siblings = fetch-siblings row.children.0, slice: 5

		w.localStorage.setItem "topic_#topic-id" (siblings.last-post.children.0.href / '#')1
		w.localStorage.setItem "topic_lp_#topic-id" siblings.author.innerHTML.trim!

		row.className += ' read'

	forum-options.removeChild button-mar

button-mar.style.cursor = 'pointer'

forum-options.appendChild button-mar