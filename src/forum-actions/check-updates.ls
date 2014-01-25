require! <[lib/lang lib/ajax ../tbody-regular ../forum]>
{$, node} = require 'lib/dom'

# we DON'T delay parsing because server reponse won't be ordered
first-topic-id = tbody-regular.children.0.id.slice 'postRow'length
tr-html = """<tr id="postRow#first-topic-id"""
a-end-html = 'data-tooltip-options=\'{"location": "mouse"}\'>'
tbody-html = '<tbody class="regular">'

$ '.forum-actions-top'
	..insertBefore do
		h1 = node 'h1'
		..children[*-1]


# XXX should parse somehow to know what the actual fuck is going on
timeout = 15.seconds!
refresh = ->
	ajax.get document.location, !->
		unless @status is 200
			console.log "encountered status #{@status} while checking for updates; forum might be unstable"
			return

		h1.innerHTML = lang.checking-new
		after-regular = @response.slice(tbody-html.length + @response.indexOf tbody-html)trim!

		# crappy html check ... should probably try to parse
		if after-regular.starts-with tr-html
			h1.innerHTML += " <u>#{lang.no-new}</u>"
			setTimeout -> #clear message
				h1.innerHTML = ""
			, 1_500ms
			setTimeout refresh, timeout # here we go again
		else
			#get new post title
			start-pos = a-end-html.length + after-regular.indexOf a-end-html
			after-regular .= slice start-pos
			title = after-regular.to(after-regular.indexOf '<')trim!

			h1.innerHTML = "<a href='#{document.location}'>#{lang.new-messages}</a> : 
			#{['<br />' if title.length > 30]}#title"

refresh is forum.dataset.page > 1