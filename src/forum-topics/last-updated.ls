require! <[lib/fetch-siblings ../characters]>
{$, $$, el, node} = require 'lib/dom'
template-default-pagination = require './templates/default-pagination'


###
### Welcome, Adventurer, for this is the main script.
### It all started with this simple file, but then grew far out of control ...
###

#topic states
const TSTATE_UNK = 0, #no information, either new or never read
	TSTATE_ALR = 1, #topic with new post, but we already opened it
	TSTATE_CHK = 2 #topic checked, we read all of it

# we can't skip directly to tbody-regular cause we'd break post-its display
# good thing : recent forum update killed that destructuring stuff ! Yay ! My soul is now free
for {parentNode: {parentNode: tr}:td}:post in $$ '.topic-title'
	continue if $('.employee-icon', post) or $('.status-text', post)

	{topic-id} = tr.dataset
	{'post-pages-cell': pages, 'last-post-cell':  {children: [last-post-link]}:last-post} = fetch-siblings td
	last-poster-name = $ '.author-name' last-post .innerHTML

	[, post-count] = last-post-link.href / '#'

	unless pages.querySelector 'ul' #no pages
		pages.innerHTML = template-default-pagination {post.href}

	state = check-topic topic-id, post-count, last-poster-name

	# perform few more guesses
	unless state is TSTATE_CHK
		# we're logged in, and we know the last poster
		if characters and last-poster-name # last is an empty string : "last message by pseudo (..."
			# we know the last poster - even more, it's us ! (I KNEW IT)
			state = TSTATE_CHK if that in characters

	# we've read the last answer
	tr.className = if state is TSTATE_CHK
		if pages.querySelector '.last-read'
			pages.removeChild that
		
		'read'
	else
		'unread' # never trust blizz

	# if we already went to the topic
	unless state is TSTATE_UNK
		# make the actual link go to the last page
		post.href = pages.getElementsByTagName 'a' .[*-1]href

	mark-state post, state

/**
 * prepends state to a topic
 *
 * `state` must be a TSTATE_* constant
 */
!function mark-state({innerHTML}:node, state)
	# ❢ = HEAVY EXCLAMATION MARK ORNAMENT
	states = <[? ! ✓]>

	node.innerHTML = "<b>[#{states[state]}]</b> #innerHTML"

/**
 * checks topic to user
 *
 * returns 2 if user read last post
 * returns 1 if user read topic (at some moment)
 * returns 0 if no information were found
 */
function check-topic(id, count, last-poster)
	match localStorage.getItem "topic_#id"
	| (> count)
		if last-poster == get-last-poster id
		then TSTATE_CHK
		else TSTATE_ALR
	| (== count) => TSTATE_CHK
	| 0 or null  => TSTATE_UNK
	| _          => TSTATE_ALR

function get-last-poster
	localStorage.getItem "topic_lp_#it"