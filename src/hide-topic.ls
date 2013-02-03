return if thread

hidden-topics = (w.localStorage.getItem "hidden_topics" or "") / ";"

# propagates hidden list to localStorage
!function save-hiddens
	w.localStorage.setItem "hidden_topics" hidden-topics * ";"

# hides a topic, doing dom interactions
!function hide
	it.parentNode.removeChild it
	tbody-regular.appendChild it

	if it.querySelector '.last-read'
		that.parentNode.removeChild that
		#replace-with that, template 'hide-topic' hidden: true



for post-pages in QSA 'tbody.regular .post-pages'
	if post-pages.querySelector '.last-read'
		#we're gonna use .last-read as a placeholder, and we have to remove the old anyway
		post-pages.removeChild that

	tr = post-pages.parentNode
	topic-id = tr.id.slice 'postRow'length

	if topic-id in hidden-topics
		hide tr

	let tr, topic-id
		template 'hide-topic' hidden: topic-id in hidden-topics
			..onclick = ->
				if topic-id in hidden-topics
					post-pages.removeChild ..
					#replace-with .., template 'hide-topic' hidden: false
					hidden-topics.splice hidden-topics.indexOf(topic-id), 1
				else
					hide tr
					hidden-topics.push topic-id

				save-hiddens!

			#add it as the first element in .post-pages
			post-pages.insertBefore .., post-pages.children.0