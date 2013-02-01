return if thread

#get account's character names
characters = QSA '.user-plate .overview'
if characters.length
	characters = [(name / ' ')[*-1] - '\n' for {innerHTML: name} in characters.0.children]


#last message column in ADV mode
export last-post-th = node 'td' className: 'last-post-th' innerHTML: lang.last-message

QS '.post-th' .appendChild last-post-th #append it to columns (ADV style)

#topic states
const TSTATE_UNK = 0, #no information, either new or never read
	TSTATE_ALR = 1, #topic with new post, but we already opened it
	TSTATE_CHK = 2 #topic checked, we read all of it

has-unread = false

#let's update rows
#THAT DESTRUCTURING.
for {[div, a]:children, parentNode: td}:post in document.getElementsByClassName 'post-title'
	if children.length > 2 #sticky, redirects, etc

		# still add column to ADV mode
		last-post-td = node 'td' className: 'post-last-updated' innerHTML: ' '

		td.appendChild last-post-td

		continue

	topic-id = div.id.slice 'thread_tt_'length

	{pages, {children: [last-post-link]}:last-post, replies, author} = fetch-siblings post, slice: 5 #defaults to className, slice 'post-'

	post-count = (last-post-link.href / '#')1


	unless pages.querySelector 'ul' #no pages
		pages.innerHTML = templates.default-pagination {a.href}


	post-only = false
	#get text to show in simple mode
	text = div.querySelector '.tt_info' .innerHTML / '\n'
	text = if text.2.trim!length then text.2 #has anwer(s)
	else
		post-only = true
		div.querySelector '.tt_time' .innerHTML #does not

	text .= replace //(#{author-name = last-post-link.innerHTML.trim!})// ->
		"<span class='poster " + [if it in characters #we posted the last message - H4xx0R
			"own-poster"] + "'>#author-name</span>"


	post.appendChild template 'tt-last-updated' {text}

	
	inline-text = text
	inline-text .= slice (text.index-of '(') + 1, -1 unless post-only
	simplified-time = if -1 is inline-text.indexOf '/'
	then simplify-time (inline-text / ' ')[lang.time-index to lang.time-outdex-1] * ' '
	else inline-text #post is so old it's DD/MM/YYYY

	#last-updated <td for ADV mode
	last-post-td = node 'td' className: 'post-last-updated' innerHTML: simplified-time
	td.appendChild last-post-td

	state = check-topic topic-id, post-count, author-name

	/*used to work, but blizzard marks some posts are marked even tho THEY'RE FUCKING NOT
	if 'read' is td.className.trim!
		TSTATE_CHK
	else
		check-topic topic-id, post-count*/

	#perform few more guesses
	unless state is TSTATE_CHK
		#we're logged in, and we know the last poster
		if characters and author-name #last is an empty string : "last message by pseudo (..."
			#we know the last poster - even more, we're him ! (I KNEW IT)
			state = TSTATE_CHK if that in characters

		#we created the topic and no one answered yet
		if replies ~= 0 and author.innerHTML.trim! in characters #waiting on "infix ops close implicit calls"
			state = TSTATE_CHK

	#we've read the last answer
	if state is TSTATE_CHK
		td.className = 'read'
		
		if pages.querySelector '.last-read'
			pages.removeChild that
	else
		has-unread = true
		td.className = '' #reset it ("used to work")

	#if we already went to the topic
	unless state is TSTATE_UNK
		#make the actual link go to the last page
		a.href = pages.querySelectorAll '.ui-pagination a' .[*-1]href

	mark-state post, state

unless has-unread
	forum-options.removeChild button-mar


/**
 * prepends state to a topic
 *
 * `state` must be a TSTATE_* constant
 */
!function mark-state({innerHTML}:node, state)
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
	match w.localStorage.getItem "topic_#id"
	| (>= count)
		if last-poster == get-last-poster id
		then TSTATE_CHK
		else TSTATE_ALR
	| 0 or null  => TSTATE_UNK
	| _          => TSTATE_ALR


function get-last-poster
	w.localStorage.getItem "topic_lp_#it"