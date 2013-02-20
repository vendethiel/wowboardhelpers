
let #src/shared/helpers///bind-key.ls
	# console.time 'src/shared/helpers///bind-key.ls'
	export cheatsheet = {}
	
	export bind-key = !(bind, lang-key, cb) ->
		cheatsheet[bind] = lang lang-key
	
		bind .= toUpperCase!charCodeAt!
	
		document.addEventListener 'keydown' !->
			return unless bind is it.keyCode
			return unless it.target is QS 'html' #not typing
			it.preventDefault!
	
			cb!
	# console.timeEnd 'src/shared/helpers///bind-key.ls'

let #src/shared/helpers///dom.ls
	# console.time 'src/shared/helpers///dom.ls'
	#@todo add `...childs` ? slow downs a lot =(
	function node(tag, props = {})
		(document.createElement tag) <<< props
	
	
	function replace-with(from-node, new-node)
		parent = from-node.parentNode
	
		# do we have to insert it at some pos ?
		if from-node.nextSibling
			parent.removeChild from-node
			parent.insertBefore new-node, that
		else
			parent.removeChild from-node
			parent.appendChild new-node
	
	/**
	 * processes a template
	 * and returns 
	 */
	function template(name, locals)
		name .= replace /-([a-z])/g -> it.1.toUpperCase!
	
		innerHTML = templates[name] locals
		
		node('div' {innerHTML})firstElementChild
	
	/**
	 * fetches nextElementSibling
	 */
	function fetch-siblings(elem, {slice = 0, index-by = 'className'})
		{[elem[index-by]slice slice; elem] while elem?.=nextElementSibling}
	
	function QSA then document.querySelectorAll it
	function QS then document.querySelector it
	
	export node, replace-with, template, QSA, QS, fetch-siblings
	# console.timeEnd 'src/shared/helpers///dom.ls'

let #src/shared/common.ls
	# console.time 'src/shared/common.ls'
	forum-options = QS '.forum-options'
	
	if topic = document.getElementById 'thread'
		topic.dataset
			..url = topic-url = (document.location / '?')0 - /#[0-9]+/
			..id = (..url / '/')[*-1]
			..page = (document.location == /\?page=([0-9]+)/)?1 or 1
	
		export textarea = QS '#post-edit textarea'
	
	if forum = document.getElementById 'posts'
		forum.dataset.id = ((document.location / '/')[*-2] / '?')0
		
		export tbody-regular = QS 'tbody.regular'
	
	export topic, forum, forum-options
	
	console.log 'Ahhhh…greetings ! Want to help on this ? Head over to http://github.com/Nami-Doc/wowboardhelpers !'
	# console.timeEnd 'src/shared/common.ls'

let #src/shared/css.ls
	# console.time 'src/shared/css.ls'
	style = node 'style' type: 'text/css' innerHTML: '''
	/*slake:build#compile-ls embeds css*/
	#forum-actions-top h1 {
  text-align: center;
  margin-left: 200px;
}
.forum .forum-actions {
  padding: 0px;
}
.forum .actions-panel {
  margin-right: 15px;
}
.forum .forum-options {
  float: right;
  right: auto;
  position: relative;
  margin-top: 25px;
  margin-right: 15px;
}
.poster {
  font-weight: bold;
}
.own-poster {
  text-decoration: underline;
}
a.show-topic {
  cursor: pointer;
  color: #008000;
}
a.show-topic:hover {
  color: #008000 !important;
}
a.hide-topic {
  cursor: pointer;
  color: #f00;
}
a.hide-topic:hover {
  color: #f00 !important;
}
.last-read {
  opacity: 0;
}
tr:hover .last-read {
  opacity: 1;
}
.post-pages .last-read {
  background-image: none !important;
  background: none !important;
}
tr:not(.stickied) a[data-tooltip] {
  display: inline !important;
}
#posts.advanced .tt-last-updated {
  display: none;
}
#posts.advanced .post-author {
  width: 15px;
}
#posts.advanced .post-views {
  width: 15px;
}
#posts.advanced .post-lastPost {
  width: 90px;
  text-align: center;
}
#posts.advanced .post-lastPost .more-arrow {
  display: none;
}
#posts.advanced .post-th .replies {
  padding-right: 2px;
  text-align: center;
}
#posts.advanced .post-th .poster {
  text-align: right;
  font-weight: normal;
  padding-right: 5px;
}
#posts.advanced .post-th .last-post-th {
  text-align: left;
}
#posts.advanced .post-last-updated {
  width: 70px;
}
#posts.advanced .post-replies {
  width: 10px;
  text-align: right;
  padding-right: 10px;
}
#posts.simple .tt-last-updated {
  display: inline;
}
#posts.simple .last-post-th {
  display: none;
}
#posts.simple .post-last-updated {
  display: none;
}
.clear-textarea {
  display: block;
  margin: 1px 0 1px 553px;
  font-weight: bold;
  font-size: 2em;
  position: absolute;
  z-index: 2;
  cursor: pointer;
}
#memebox {
  position: relative;
  float: right;
  width: 150px;
  top: 5px;
}
#memebox h1 {
  font-size: 1.8em;
  display: inline;
}
#memebox .hider {
  color: #f00;
  display: none;
}
#memebox:hover .hider {
  display: inline;
}
#memebox .unhider {
  color: #008000;
  display: none;
}
#memebox:hover .unhider {
  display: inline;
}
#memebox ul#memes {
  margin-top: 10px;
  margin-left: 30px;
  list-style-type: circle;
}
#memebox li {
  font-weight: bold;
  color: link;
  text-decoration: underline;
}
.context-links .extra-link {
  background-image: none !important;
  padding-left: 8px !important;
  border-top-left-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
}
.ui-context {
  width: 230px !important;
}
.karma {
  white-space: normal !important;
}
.post-user .avatar {
  top: 27px !important;
}
#account-characters {
  margin-left: 30px;
}
#account-characters h1 {
  display: inline;
}
#account-characters ul {
  list-style: circle;
  margin-left: 20px;
}
#account-characters a {
  font-weight: bold;
}
img.autolink {
  border: 5px solid #000;
  max-width: 540px;
  max-height: 500px;
}

	'''
	
	document.head.appendChild style
	# console.timeEnd 'src/shared/css.ls'

let #src/shared/lang.ls
	# console.time 'src/shared/lang.ls'
	l = (document.location / '/')4
	
	langs =
		fr:
			time-index: 3
			time-outdex: 0
	
			toggle-sticky: 'Afficher/Cacher les post-its'
			mar: 'Tout marquer comme lu'
			new-messages: 'Il y a des nouveau(x) message(s)'
			checking-new: 'Vérification des nouveaux messages ...'
			no-new: 'Pas de nouveau message.'
	
			few-seconds-ago: 'il y a quelques secondes'
			#table FR to EN for time parsing
			seconde: 'second'
			second: 'seconde'
			heure: 'hour'
			hour: 'heure'
			jour: 'day'
			day: 'jour'
			few: 'quelques' #[il y a]
	
			last-message: 'Message' #.last-post-th
			html-overrides:
				'.replies': 'REPS'
				'.poster': 'Dernier'
	
			other-characters: 'Autres personnages'
	
			cheatsheet: 'Raccourcis'
			jump-to-last-read: 'Aller au dernier message lu'
			quick-quote: 'Citer le bout de message sélectionné'
		en:
			time-index: 0
			time-outdex: -1
	
			last-message: 'Last'
			toggle-sticky: 'Show/Hide stickies'
			mar: 'Mark all as read'
			few-seconds-ago: 'few seconds ago'
			new-messages: 'There are new message(s)'
			checking-new: 'Checking new messages ...'
			no-new: 'No new message.'
	
			other-characters: 'Other characters'
	
			cheatsheet: 'Cheatsheet'
			jump-to-last-read: 'Jump to last read message'
			quick-quote: 'Quote the selected part'
	
	
	export class lang # acts like a proxy to avoid unneeded keys
		import langs[l] ? langs.en
		-> return lang[it] ? lang[it.toCamelCase!] ? it
	
		@pluralize ?= (count, key) ~>
			"#{Math.round count} #{@ key}#{['s' if count > 1.5]}"
	
		@singularize ?= ->
			if it[*-1] is 's'
				it.slice 0 -1
			else
				it
	
	time-table =
		* 'heures'  'h'
		* 'heure'   'h'
		* 'houres'  'h'
		* 'hour'    'h'
	
		* 'minutes' 'm'
		* 'minute'  'm'
	
		* 'jours'   'j'
		* 'jour'    'j'
		* 'days'    'd'
		* 'day'     'd'
	
		* 'secondes' 's'
		* 'seconds'  's'
		* 'second'   's'
	
	/**
	 * simplifies time based on table replacement
	 */
	export function simplify-time
		for [convert-from, convert-to] in time-table
			it .= replace convert-from, convert-to
	
		it
	# console.timeEnd 'src/shared/lang.ls'

let #src/shared/content-class.ls
	# console.time 'src/shared/content-class.ls'
	content = QS '#content'
	
	content.className = switch
	| topic => "topic"
	| forum => "forum"
	| otherwise => ""
	# console.timeEnd 'src/shared/content-class.ls'

let #src/shared/utils///ajax.ls
	# console.time 'src/shared/utils///ajax.ls'
	export class ajax
		@get = (url, success) ->
			new XMLHttpRequest
				..open 'GET' url
				..onload = success
				..send!
	# console.timeEnd 'src/shared/utils///ajax.ls'

let #src/shared/utils///date.ls
	# console.time 'src/shared/utils///date.ls'
	Date::relative-time = ->
		if ( days = ( ( diff = Date.now! - @getTime! ) / 86400000 ) ) > 1
			lang.pluralize days, \day
		else if ( hours = days * 24 ) > 1
			lang.pluralize hours, \hour
		else if ( minutes = hours * 60 ) > 1
			lang.pluralize minutes, \minute
		else if ( seconds = minutes * 60 ) >= 1
			lang.pluralize seconds, \second
		else
			lang.few-seconds-ago
	# console.timeEnd 'src/shared/utils///date.ls'

let #src/shared/utils///string.ls
	# console.time 'src/shared/utils///string.ls'
	#FUCK YOU IDC I EXTEND NATIVE OBJECTS
	String::pad = (len, str) ->
		return if @length >= len
	
		@ + "#str" * (len - @length)
	
	String::toCamelCase = ->
		@replace /[_-]([a-z])/g -> it.1.toUpperCase!
	# console.timeEnd 'src/shared/utils///string.ls'

let #src/common/autolink.ls
	# console.time 'src/common/autolink.ls'
	extensions = '(?:com|net|org|eu|fr|jp|us|co\.uk|me)'
	
	rules = # indent looks nasty because array star is just `void =` which adds 2 indents
		# youtube thumbnails
		* * //
				(?:https?:\/\/)? # optional protocol
				(?:(?:www|m)\.)?			 # optional subdomain (some people add it)
				(
					youtu\.be\/ # short links
						([\w\-_]+) # video id
						(\?[&=\w\-_;\#]*)? # options
					|
					youtube\.com\/watch\?
						([&=\w\-_;\.\?\#\%]*) # pre video id options
						v=([\w\-_]+) # video id
						([&=\w\-\._;\?\#\%]*) # post vieo id options
				)
	//g
				* '<iframe class="youtube-player" type="text/html" width="640" height="385" src="http://www.youtube.com/embed/$2$5" frameborder="0">
	</iframe>'
	
		# specialcase linkify urls without internal parenthesis surrounded by
		# parenthesis like (http://google.com)
		* * /\((https?:\/\/)([^<\s\)]+)\)/g
				* '(<a class="external" \
					 rel="noreferrer" \
					 href="$1$2" \
					 title="$1$2" \
					 data-autolink="paren-specialcase" \
					 target="_blank">$2</a>)'
	
		# specialcase linkify urls without a protocol but with a common tld
		* * //
				(^|>|;|\s) # to avoid linking parts of urls inside hrefs, must start
											 # with one of these
				(?:https?:\/\/)? # still allow these because there's no autolinking
				(
					# (?![a-z]{2}\.battle\.net) # those SHOULD be autolinked but sometimes are not :(
					[\w\.\-]+\. # domain
					#extensions # non-exhaustive
					(/[^<\s]*)?(?=[\s<]|$) # rest of the url until space or <br> or end
				)
			//g
				* '$1<a class="external" \
						rel="noreferrer" \
						href="http://$2" \
						data-autolink="protocol-specialcase" \
						title="$2" \
						target="_blank">$2</a>'
	
	
		# linkify links not preceded by a quote or double-quote (should avoid
		# relinkifying href= urls)
		# specialcase battle.net urls since they're autolinked by the forum
	
		# I moved this pattern up to fix an edge-case in @qqueue's original code, but had to add
		# / in the exclude pattern to avoid relinking some URLs
		# running regexp to linkify stuff is probably something we *should* avoid but
		# I hardly see myself foreaching the dom to split nodes etc
		* * /([^"'\/]|^)(https?:\/\/)(?![a-z]{2}\.battle\.net)([^<\s\)]+)/g
				* '$1<a class="external" \
						rel="noreferrer" \
						href="$2$3" \
						title="$2$3" \
						data-autolink="quote-specialcase" \
						target="_blank">$3</a>'
		* * //
				(^|>|;|\s) # to avoid linking parts of urls inside hrefs
				(
					(?!(?:www\.)?dropbox) # broken shit (non-exhaustive)
					[\w\.\-]+\. # domain
					#extensions # non-exhaustive
					(/[^.<\s]*)
					\.(jpg|png|gif|jpeg)
					(?=[\s<]|$)
				|
					puu\.sh/[a-zA-Z0-9]+
				)
			//g
				* '$1<img src="http://$2" alt="$2" class="autolink" />'
	
	export function autolink
		for [pattern, replacement] in rules
			it .= replace pattern, replacement
		it
	
	export function el-autolink(el)
		try
			h = autolink el.innerHTML
	
			# replace wow links
			r = //\>((?:http:\/\/)?[a-z]{2}\.battle\.net/[^<\s.]*)//g
			while [, url]? = r.exec h
				let url, el
					full-url = if ~url.indexOf 'http://'
						url # we already have the leading http:// part
					else "http://#url"
	
					<-! ajax.get full-url
					if /<title>(.+)<\/title>/ == @response
						el.innerHTML .= replace ">#url" ">#{that.1 - " - World of Warcraft"}"
	
	
			el.innerHTML = h
		catch
			console.log "Unable to generate valid HTML : #h (#e)"
	# console.timeEnd 'src/common/autolink.ls'

let #src/fix///html-overrides.ls
	# console.time 'src/fix///html-overrides.ls'
	if lang.html-overrides
		for k, v of that
			QS k ?.innerHTML = v
	# console.timeEnd 'src/fix///html-overrides.ls'

let #src/fix///menu.ls
	# console.time 'src/fix///menu.ls'
	# fixes Blizzard's menu
	# which seems to think js has autovivification
	# NOTE : that will still fail when the extension hasn't been loaded yet
	
	old = w.Menu.show
	w.Menu.show = (, , options = {}) ->
		w.Menu.dataIndex[x=options.set ? 'base'] ?= []
	
		old ...
	# console.timeEnd 'src/fix///menu.ls'

let #src/fix///set-view.ls
	# console.time 'src/fix///set-view.ls'
	# mere copypasta, removed last line (which redraws posts)
	w.Cms.Forum.setView = (type, target) ->
		w.Cookie.create 'forumView', type, path: "/" expires: 8760
	
		w.$(target)addClass 'active'
			.siblings!
			.removeClass 'active'
			
		w.$('#posts')attr 'class' type
	# console.timeEnd 'src/fix///set-view.ls'

let #src/forum/mar.ls
	# console.time 'src/forum/mar.ls'
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
	# console.timeEnd 'src/forum/mar.ls'

let #src/forum/stickies.ls
	# console.time 'src/forum/stickies.ls'
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
	# console.timeEnd 'src/forum/stickies.ls'

let #src/forum/move-actions.ls
	# console.time 'src/forum/move-actions.ls'
	return unless forum
	
	QS '.forum-options'
		..parentNode.removeChild ..
	
		QS '.content-trail' .appendChild ..
	# console.timeEnd 'src/forum/move-actions.ls'

let #src/forum/check-updates.ls
	# console.time 'src/forum/check-updates.ls'
	return unless forum
	
	#we DON'T delay execution because server reponse won't be ordered
	first-topic-id = tbody-regular.children.0.id.slice 'postRow'length
	tr-html = """<tr id="postRow#first-topic-id"""
	a-end-html = 'data-tooltip-options=\'{"location": "mouse"}\'>'
	tbody-html = '<tbody class="regular">'
	
	QS '#forum-actions-top'
		..insertBefore do
			h1 = node 'h1'
			..children[*-1]
	
	
	# XXX should not notice for update if post is hidden.
	# BUT it should notice if 2 posts have been updated, first is hidden
	# and second is not
	refresh = ->
		ajax.get document.location, !->
			return unless @status is 200
	
			h1.innerHTML = lang.checking-new
			after-regular = @response.slice(tbody-html.length + @response.indexOf tbody-html)trim!
	
			if tr-html is after-regular.substr 0 tr-html.length
				setTimeout refresh, timeout # here we go again
				h1.innerHTML += " <u>#{lang.no-new}</u>"
				setTimeout -> #clear message
					h1.innerHTML = ""
				, 1500ms #1s
			else
				#get new post title
				start-pos = a-end-html.length + after-regular.indexOf a-end-html
				after-regular .= slice start-pos
				title = after-regular.slice(0 after-regular.indexOf '<')trim!
	
				h1.innerHTML = "<a href='#{document.location}'>#{lang.new-messages}</a> : 
				#{['<br />' if title.length > 30]}#title"
	timeout = 15s * 1000ms #15s
	
	#timeout clearing is in hide-topic
	export check-updates = setTimeout refresh, timeout
	# console.timeEnd 'src/forum/check-updates.ls'

let #src/forum-topics/last-updated.ls
	# console.time 'src/forum-topics/last-updated.ls'
	return unless forum
	
	#get account's character names
	characters = QSA '.char-wrapper .name'
	if characters.length
		characters = [(name / ' ')[*-1] - '\n' for {innerHTML: name} in characters]
	
	
	#last message column in ADV mode
	export last-post-th = node 'td' className: 'last-post-th' innerHTML: lang.last-message
	
	QS '.post-th' .appendChild last-post-th #append it to columns (ADV style)
	
	#topic states
	const TSTATE_UNK = 0, #no information, either new or never read
		TSTATE_ALR = 1, #topic with new post, but we already opened it
		TSTATE_CHK = 2 #topic checked, we read all of it
	
	has-unread = false
	
	#we can't skip directly to tbody-regular cause we'd break post-its display
	#THAT DESTRUCTURING.
	for {[div, a]:children, parentNode: td}:post in document.getElementsByClassName 'post-title'
		if children.length > 2 #sticky, redirects, etc
	
			# still add column to ADV mode
			last-post-td = node 'td' className: 'post-last-updated' innerHTML: ' '
	
			td.appendChild last-post-td
	
			continue
	
		#NO IT'S NOT A JOKE this class is named "thread". W T F
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
	
		is-cm = false
		if last-post-link.querySelector 'span'
			last-post-link = that
			is-cm = true
	
		text .= replace //(#{author-name = last-post-link.innerHTML.trim!})// ->
			templates.author name: it, own: it in characters, cm: is-cm
	
		
		inline-text = text
		inline-text .= slice (text.index-of '(') + 1, -1 unless post-only
		simplified-time = if ~inline-text.indexOf '/'
			inline-text #post is so old it's DD/MM/YYYY
		else
			simplified-time = (inline-text / ' ')[lang.time-index to lang.time-outdex-1] * ' '
			post.dataset <<< {simplified-time}
			text .= replace simplified-time, "<span class='simplified-time'>#simplified-time</span>"
	
			simplify-time simplified-time
	
		#manipulated to en<span simplified time (if necessary)
		post.appendChild template 'tt-last-updated' {text}
	
		#last-updated <td for ADV mode
		td.appendChild node 'td' className: 'post-last-updated' innerHTML: simplified-time
	
		state = check-topic topic-id, post-count, author-name
	
		#perform few more guesses
		unless state is TSTATE_CHK
			#we're logged in, and we know the last poster
			if characters and author-name #last is an empty string : "last message by pseudo (..."
				#we know the last poster - even more, it's us ! (I KNEW IT)
				state = TSTATE_CHK if that in characters
	
			#we created the topic and no one answered yet
			if replies ~= 0 and author.innerHTML.trim! in characters
				state = TSTATE_CHK
	
		#we've read the last answer
		if state is TSTATE_CHK
			td.className = 'read'
			
			if pages.querySelector '.last-read'
				pages.removeChild that
		else
			has-unread = true
			td.className = '' #fix blizzcrap
	
		#if we already went to the topic
		unless state is TSTATE_UNK
			#make the actual link go to the last page
			a.href = pages.getElementsByTagName 'a' .[*-1]href
	
		mark-state post, state
	
	unless has-unread
		forum-options.removeChild button-mar
	
	/**
	 * prepends state to a topic
	 *
	 * `state` must be a TSTATE_* constant
	 */
	!function mark-state({innerHTML}:node, state)
		# ❢ = HEAVY EXCLAMATION MARK ORNAMENT
		states = <[? ! ✓]>
		
		# could've used #<> but I'm using LS :(
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
	# console.timeEnd 'src/forum-topics/last-updated.ls'

let #src/forum-topics/move-redirects.ls
	# console.time 'src/forum-topics/move-redirects.ls'
	return unless forum
	
	for status in tbody-regular.querySelectorAll '.post-status'
		tr = status.parentNode.parentNode
		tr.className += ' hidden redirect'
	
		#set it at the end
		tbody-regular.removeChild tr
		tbody-regular.appendChild tr
	# console.timeEnd 'src/forum-topics/move-redirects.ls'

let #src/forum-topics/hide-topic.ls
	# console.time 'src/forum-topics/hide-topic.ls'
	return unless forum
	
	hidden-topics = (w.localStorage.getItem "hidden_topics" or "") / ";"
	
	# propagates hidden list to localStorage
	!function save-hiddens
		w.localStorage.setItem "hidden_topics" hidden-topics * ";"
	
	# hides a topic, doing dom interactions
	!function hide
		it.parentNode.removeChild it
		tbody-regular.appendChild it
		it.className += ' hidden'
	
		if it.querySelector '.last-read'
			that.parentNode.removeChild that
	
	
	
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
						hidden-topics.splice hidden-topics.indexOf(topic-id), 1
					else
						hide tr
						hidden-topics.push topic-id
	
					save-hiddens!
	
				#add it as the first element in .post-pages
				post-pages.insertBefore .., post-pages.children.0
	
	#ensure we don't check updates if we already have updates
	if QS 'tbody.regular tr:not(.hidden):not(.read)'
		clearTimeout check-updates
	# console.timeEnd 'src/forum-topics/hide-topic.ls'

let #src/forum-topics/times.ls
	# console.time 'src/forum-topics/times.ls'
	units =
		second: 1000ms
		minute: 60_000ms
		hour  : 3_600_000ms
		day   : 86_400_000ms
	
	timestamp = new Date!getTime!
	post-titles = QSA '.post-title[data-simplified-time]'
	
	for post-title in post-titles
		total = 0
		for timespan in post-title.dataset.simplified-time / ', '
			[count, unit] = timespan / ' '
	
			if count is lang 'few'
				count = 5
				unit = lang 'second'
	
			#use lang to get correct unit
			total += count * units[lang lang.singularize unit]
			console.log count, lang.singularize unit if total isnt total
	
		date = new Date timestamp - total
		#post-title.innerHTML .= replace '>)' ">, #{date.getHours!}:#{date.getMinutes!})"
		#post-title.querySelector '.simplified-time' .datetime = date.toString!
		post-title.dataset.timestamp = date.getTime!
	
	timeout = 10 * units.second #1 minute
	refresh = ->
		for post-title in post-titles
			d = new Date Number post-title.dataset.timestamp
	
			post-title.querySelector '.simplified-time'
				.innerHTML = d.relative-time!
	
		setTimeout refresh, timeout
	refresh!
	# console.timeEnd 'src/forum-topics/times.ls'

let #src/topic-characters/improve-topic.ls
	# console.time 'src/topic-characters/improve-topic.ls'
	return unless topic
	
	for infos in document.getElementsByClassName 'character-info'
		realm = infos.querySelector '.context-user span'
		continue unless realm #cm etc
		realm .= innerHTML
	
		infos.querySelector '.character-desc' ?.innerHTML += "<br />#realm"
	# console.timeEnd 'src/topic-characters/improve-topic.ls'

let #src/topic-characters/multi-chars.ls
	# console.time 'src/topic-characters/multi-chars.ls'
	return unless topic
	
	# old version
	if localStorage.getItem 'account-characters'
		console.log 'going to new format'
		new-array = {[acc, [clean val.link for val in vals when val.link]] \
			for acc, vals of JSON.parse that}
	
		localStorage.setItem "accountCharacters" JSON.stringify new-array
		localStorage.removeItem 'account-characters'
	
	
	# ok, back to our business ...
	account-characters = if localStorage.getItem 'accountCharacters'
		JSON.parse that
	else {}
	
	function clean
		it -= "context-link" # remove class
		it -= "xmlns=\"http://www.w3.org/1999/xhtml\" "
		it
	
	modified = false # avoid saving if useless
	
	for post-character in QSA '.post-character'
		icon-ignore = post-character.querySelector '.icon-ignore'
		continue unless icon-ignore # self account
		# yes <| binds tighter than <|, fuck LS
		link = clean post-character.querySelector('.user-name > a')outerHTML.trim!
	
		[, account] = /ignore\(([0-9]+)/ == icon-ignore.onclick.toString!
		
		post-character.dataset <<< {account, link}
	
		unless link in account-characters[][account]
			modified = true
			account-characters[account]push link
	
	if modified # save it !
		localStorage.setItem "accountCharacters" JSON.stringify account-characters
	
	for post-character in QSA '.post:not(.hidden) .post-character'
		{account, link: current} = post-character.dataset
		continue unless account
	
		characters = account-characters[account]
		continue if characters.length is 1
	
		post-detail = post-character.parentNode.querySelector '.post-detail'
		height = post-detail.offset-height
	
		# no toggler for one char (2 is because the current is ignored)
		# base 130 (h1 = 15) + approx 15 for each char (-1 for the current)
		toggle = characters.length > 2 and height < 130 + (characters.length - 1) * 15
	
		post-character.appendChild do
			template 'multi-chars' {toggle, current, characters}
	
	
		if toggle 
			ul = post-character.querySelector 'ul'
	
			# floor it. if we have 8.2 we want it to resolve to 8 (displayed)
			# so that we'll have one hidden
			if (limit = Math.floor (height - 130) / 15) > 1
				i = 0 # try to display properly as much as we can
				while i < limit, i++
					ul.children[i]style.display = ''
	
			toggle = post-character.querySelector '.toggle'
	
			let ul, toggle
				toggle.onclick = ->
					for li in ul.children
						li.style.display = ''
					postCharacter.querySelector '.toggler' .style.display = 'none'
	
					# no-op onclick as the h1 itself is toggling
					# and we're only removing the [+]
					toggle.onclick = ->
	# console.timeEnd 'src/topic-characters/multi-chars.ls'

let #src/topic-characters/context-links.ls
	# console.time 'src/topic-characters/context-links.ls'
	return unless topic
	
	# adds context links
	for context in topic.querySelectorAll '.context-links'
		el = template 'context-links' link: context.children.0.href
	
		context.insertBefore el, context.querySelector '.link-last'
	# console.timeEnd 'src/topic-characters/context-links.ls'

let #src/topic-posts/jump.ls
	# console.time 'src/topic-posts/jump.ls'
	return unless topic
	
	# cache it cause the script will modify it
	return unless last-post-id = localStorage.getItem "topic_#{topic.dataset.id}"
	
	bind-key 'j' 'jump-to-last-read' !->
		last-post-page = Math.ceil last-post-id / 20
	
		if topic.dataset.page < last-post-page
			document.location = topic.dataset.url + "?page=#last-post-page"
		else # sadly, the post aren't marked themselves (like .post-1 or something)
			QSA '.post-detail' .[(last-post-id % 20) - 1]?scrollIntoView!
	# console.timeEnd 'src/topic-posts/jump.ls'

let #src/topic-posts/autolink.ls
	# console.time 'src/topic-posts/autolink.ls'
	return unless topic
	
	for post in QSA '.post-detail'
		el-autolink post
	# console.timeEnd 'src/topic-posts/autolink.ls'

let #src/topic-posts/update-count.ls
	# console.time 'src/topic-posts/update-count.ls'
	return unless topic
	
	#pagination
	pages = QSA '#forum-actions-top .ui-pagination li:not(.cap-item)'
	
	#we have some pages and we're not on the last page
	if pages?length and 'current' isnt pages[*-1]className
		return
	
	#get the post-count (#xx) : .post-info:last > a[href]
	post-count = topic.getElementsByClassName 'post-info'
		.[*-1]getElementsByTagName 'a' .0 #bikoz :last-child sucks ballzzzz
		.getAttribute 'href' .slice 1 #remove #
	
	last-poster-name = topic.getElementsByClassName 'char-name-code' .[*-1]innerHTML.trim!
	
	#mark as read
	w.localStorage.setItem "topic_#{topic.dataset.id}" post-count
	w.localStorage.setItem "topic_lp_#{topic.dataset.id}" last-poster-name
	# console.timeEnd 'src/topic-posts/update-count.ls'

let #src/reply/remember-reply.ls
	# console.time 'src/reply/remember-reply.ls'
	return unless topic
	return unless textarea
	
	submit = QS '.post [type=submit]'
	
	unless textarea.value #i.e. you have to wait for the timeout
		textarea.value = localStorage.getItem "post_#{topic.dataset.id}" or ''
	
	textarea.onkeyup = -> #update on type
		w.localStorage.setItem "post_#{topic.dataset.id}" @value
	
	submit.onclick = -> #clear on submit
		w.localStorage.setItem "post_#{topic.dataset.id}" ""
	# console.timeEnd 'src/reply/remember-reply.ls'

let #src/reply/clear-textarea.ls
	# console.time 'src/reply/clear-textarea.ls'
	return unless topic
	return unless textarea
	
	clearer = template 'clear-textarea'
	
	QS '.editor1'
		return unless ..
	
		..insertBefore clearer, textarea
	
		clearer.onclick = ->
			textarea.value = ''
			# manually clearing localStorage is something I'd like to avoid
			# emit an event ?
			w.localStorage.removeItem "post_#{topic.dataset.id}"
	# console.timeEnd 'src/reply/clear-textarea.ls'

let #src/reply/quick-quote.ls
	# console.time 'src/reply/quick-quote.ls'
	return unless topic
	return unless textarea
	
	bind-key 'r' 'quick-quote' !->
		if w.getSelection!toString!
			textarea.value += (if textarea.value then "\n" else "") + "[quote]#that[/quote]"
			textarea.selectionStart = textarea.selectionEnd = textarea.value.length
			textarea.focus!
			QS '#forum-actions-bottom' .scrollIntoView!
	# console.timeEnd 'src/reply/quick-quote.ls'

let #src/reply/memebox.ls
	# console.time 'src/reply/memebox.ls'
	return unless topic
	return unless textarea # shortcircuit here (if banned or something)
	
	memes =
		challengeaccepted: 'http://sambacentral.files.wordpress.com/2012/11/challenge-accepted.jpg'
		foreveralone: 'http://i1.kym-cdn.com/entries/icons/original/000/003/619/Untitled-1.jpg'
		bitchplease: 'http://www.troll.me/images/yao-ming/bitch-please.jpg'
		stfuandgtfo: 'http://4.bp.blogspot.com/-cD0QmZLGuAY/TnHyAD269EI/AAAAAAAAAkU/6O4rA1REcdI/s1600/STFU_and_GTFO.jpg'
		youdontsay: 'http://bearsharkaxe.com/wp-content/uploads/2012/06/you-dont-say.jpg'
		fullretard: 'http://www.osborneink.com/wp-content/uploads/2012/11/never_go_full_retard1.jpg'
		susalenemi: 'http://img11.hostingpics.net/pics/311549libertlolxqt.png'
		fulloffuck: 'http://www.mememaker.net/static/images/templates/14288.jpg'
		seriously: 'http://i3.kym-cdn.com/entries/icons/original/000/005/545/OpoQQ.jpg'
		trollface: 'http://fc09.deviantart.net/fs70/f/2012/342/5/a/troll_face_by_bmsproductionz-d5ng9k6.png'
		fuckyeah: 'http://cdn.ebaumsworld.com/mediaFiles/picture/2168064/82942867.jpg'
		pedobear: 'http://aserres.free.fr/pedobear/pedobear.png'
		slowpoke: 'https://0-media-cdn.foolz.us/ffuuka/board/a/image/1351/43/1351437155488.png'
		megusta: 'http://a400.idata.over-blog.com/5/08/51/37/me_gusta_by_projectendo-d2z3rku.jpg'
		notbad: 'http://www.reactionface.info/sites/default/files/images/YvEN9.png'
		ohcrap: 'http://i1.kym-cdn.com/entries/icons/original/000/004/077/Raisins_Face.jpg'
		trauma: 'http://global3.memecdn.com/trauma_c_629591.jpg'
		yuno: 'http://i1.kym-cdn.com/entries/icons/original/000/004/006/y-u-no-guy.jpg'
		okay: 'http://cache.ohinternet.com/images/e/e6/Okay_guy.jpg'
		no: 'http://stickerish.com/wp-content/uploads/2011/09/NoGuyBlackSS.png'
	
	/*# disabled as per dryaan
	extra-memes = {}
	if localStorage.getItem "memes"
		extra-memes = JSON.parse that
		# extra work on these is done at the bottom, after memebox is appended to dom
	*/
	
	
	return unless post-wrapper = QS '.post.general'
	post-wrapper.removeChild post-wrapper.children[*-1] #remove span.clear
	
	add-meme = (url) ->
		->
			textarea.value += (if textarea.value then "\n" else "") + url
	
	append-meme = (name, url) ->
		ul.appendChild <| do
			document.createElement 'li'
				..innerHTML = name
				..onclick = add-meme url
	
	/*
	if localStorage.getItem "hide_memebox"
		post-wrapper.appendChild <|
			node 'div' id: 'memebox'
				<|
				node 'span' className: 'unhider' innerHTML: 'Memebox ✓'
					..onclick = ->
						localStorage.removeItem "hide_memebox"
						@innerHTML = 'OK!'
	
		return
	
	hider = memebox.querySelector '.hider'
	hider.onclick = ->
		memebox.style.display = 'none'
		localStorage.setItem "hide_memebox" "1"
	*/
	
	memebox = template 'memebox'
	
	ul = memebox.querySelector '#memes'
	memebox.querySelector '#meme-search' .onkeyup = !->
		value = @value.replace /[\s_-]+/ ''
		ul.innerHTML = ''
	
		return unless value
	
		approximates = []; i = 0
		for name, url of memes # {...extra-memes, ...memes}
			switch name.indexOf value
			| -1 =>
			| 0  =>
				append-meme name, url
	
				break if ++i > 10
			| _  =>
				approximates.push [name, url]
	
		for [name, url] in approximates
			append-meme name, url
	
			break if ++i > 10
	
	post-wrapper.appendChild memebox
	
	# now let's move on user memes
	# console.timeEnd 'src/reply/memebox.ls'

let #src/reply/preview.ls
	# console.time 'src/reply/preview.ls'
	return unless topic
	return unless textarea
	
	post-preview = QS '#post-preview'
	
	# let's replace BML preview to add
	# our autolink feature
	old = w.BML.preview.bind w.BML
	w.BML.preview = (content, target, callback) ->
		old content, target, !->
			callback! # old behavior
			el-autolink post-preview
	# console.timeEnd 'src/reply/preview.ls'

let #src/common/cheatsheet.ls
	# console.time 'src/common/cheatsheet.ls'
	return unless Object.keys cheatsheet .length
	
	possible-divs =
		'.forum-info' # forum topics page
		'.talkback form'
	
	for sel in possible-divs when QS sel
		that.appendChild <| do
			template 'cheatsheet' {cheatsheet}
				ul = ..querySelector 'ul'
				ul.style.display = 'none'
	
				..querySelector '.toggler' .onclick = ->
					ul.style.display = if ul.style.display is 'none'
						''
					else 'none'
		break
	# console.timeEnd 'src/common/cheatsheet.ls'