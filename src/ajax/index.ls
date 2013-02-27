module.exports =
	get: (url, success) ->
		new XMLHttpRequest
			..open 'GET' url
			..onload = success
			..send!