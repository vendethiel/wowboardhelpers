require! '../tbody-regular'
{$, $$, el} = require 'lib/dom'
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

for let {children: [pages-wrapper], parentNode: tr}:post-pages in $$ '.post-pages-cell', tbody-regular
	topic-id = tr.id.slice 'postRow'length

	hide tr if topic-id in hidden-topics

	el template-hide-topic hidden: topic-id in hidden-topics
		..onclick = ->
			if topic-id in hidden-topics
				pages-wrapper.removeChild ..
				hidden-topics.splice hidden-topics.indexOf(topic-id), 1
			else
				hide tr
				hidden-topics.push topic-id

			save-hiddens!

		# add it as the first element in .post-pages-cell .pages-wrapper
		pages-wrapper.insertBefore .., pages-wrapper.children.0