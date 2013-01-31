return if thread

export mode = posts.getAttribute 'class'

function set-view(type, target)
	mode := type

	#caching wouldn't be efficient since you use mode toggling very little (or so I expect)
	if type is 'simple'
		last-post-th.style.display = 'none' #hide <th "last posts"
		hide-all '.post-last-updated' #hide <td "last post"
		for el in show-all '.tt-last-updated' #show inline last updated + last poster
			el.style.display = ''
	else #... and the opposite
		last-post-th.style.display = ''
		show-all '.post-last-updated'
		hide-all '.tt-last-updated'

#gotta work around things in chrome where we can't set cookies
# let's just reuse their work
for link in QSA 'a.simple, a.advanced'
	let old = link.onclick
		link.onclick = ->
			old.call @ #only way to apply cookie change in chrome
			type = if @classList.contains 'simple' then 'simple' else 'advanced'
			return if type is mode
			set-view type, @