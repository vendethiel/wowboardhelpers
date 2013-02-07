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

refresh = ->
	new XMLHttpRequest
		..open 'GET' document.location
		..onload = !->
			return unless @status is 200

			h1.innerHTML = lang.checking-new
			after-regular = @response.slice tbody-html.length+@response.indexOf tbody-html .trim!

			#XXX should not notice for update if post is ignored.
			if tr-html is after-regular.substr 0 tr-html.length
				setTimeout refresh, timeout #there we go again
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
				#{['<br />' if title.length > 50]}#title"

		..send!
timeout = 15s * 1000ms #15s

#timeout clearing is in hide-topic
export check-updates = setTimeout refresh, timeout