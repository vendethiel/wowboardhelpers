require! '../tbody-regular'
{$, $$, el} = require 'dom'
template-hide-topic = require './templates/hide-topic'

hidden-topics = (localStorage.getItem "hidden_topics" or "") / ";"

# propagates hidden list to localStorage
!function save-hiddens
	localStorage.setItem "hidden_topics" hidden-topics * ";"

# hides a topic, doing dom interactions
!function hide
	it.parentNode.removeChild it
	tbody-regular.appendChild it
	it.className += ' hidden'

	if it.querySelector '.last-read'
		that.parentNode.removeChild that

for post-pages in $$ 'tbody.regular .post-pages'
	if post-pages.querySelector '.last-read'
		# we're gonna use .last-read as a placeholder, and we have to remove the old anyway
		post-pages.removeChild that

	tr = post-pages.parentNode
	topic-id = tr.id.slice 'postRow'length

	if topic-id in hidden-topics
		hide tr

	let tr, topic-id
		el template-hide-topic hidden: topic-id in hidden-topics
			..onclick = ->
				if topic-id in hidden-topics
					post-pages.removeChild ..
					hidden-topics.splice hidden-topics.indexOf(topic-id), 1
				else
					hide tr
					hidden-topics.push topic-id

				save-hiddens!

			# add it as the first element in .post-pages
			post-pages.insertBefore .., post-pages.children.0

# ensure we don't check updates if we already have updates
if $ 'tbody.regular tr:not(.hidden):not(.read)'
	clearTimeout require '../forum-actions/check-updates'