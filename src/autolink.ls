return unless topic

rules =
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
				 target="_blank">$2</a>)'

	# linkify links not preceded by a quote or double-quote (should avoid
	# relinkifying href= urls)
	* * /([^"']|^)(https?:\/\/)([^<\s\)]+)/g
			* '$1<a class="external" \
					rel="noreferrer" \
					href="$2$3" \
					title="$2$3" \
					target="_blank">$3</a>'

	# specialcase linkify urls without a protocol but with a common tld
	* * //
			(^|>|;|\s) # to avoid linking parts of urls inside hrefs, must start
										 # with one of these
			(
				[\w\.\-]+\. # domain
				(?:com|net|org|eu|jp|us|co\.uk) # non-exhaustive
				(/[^<\s]*)?(?=[\s<]|$) # rest of the url until space or <br> or end
			)
		//g
			* '$1<a class="external" \
					rel="noreferrer" \
					href="http://$2" \
					title="$2" \
					target="_blank">$2</a>'

replace = ->
	for [pattern, replacement] in rules
		it .= replace pattern, replacement
	it

for post in QSA '.post-detail'
	try
		post.innerHTML = x=replace post.innerHTML
	catch
		console.log "fail lol #x"