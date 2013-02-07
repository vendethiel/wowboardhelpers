return unless forum

#we DON'T delay execution because server reponse won't be ordered
first-topic-id = tbody-regular.children.0.id.slice 'postRow'length
tr-html = """<tr id="postRow#first-topic-id"""
a-end = 'data-tooltip-options=\'{"location": "mouse"}\'>'
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
			#                               ofc it's the length of THIS!
			after-regular = @response.slice tbody-html.length+@response.indexOf tbody-html .trim!

			if tr-html is after-regular.substr 0 tr-html.length
				setTimeout refresh, timeout #there we go again
				h1.innerHTML += " <u>#{lang.no-new}</u>"
				setTimeout ->
					h1.innerHTML = ""
				, 1500ms #1s
			else
				start-pos = a-end.length + after-regular.indexOf a-end
				after-regular .= slice start-pos
				title = after-regular.slice(0 after-regular.indexOf '<')trim!

				h1.innerHTML = "<a href='#{document.location}'>#{lang.new-messages}</a> : #title"

		..send!
timeout = 15s * 1000ms #15s

#timeout clearing is in hide-topic
export check-updates = setTimeout refresh, timeout