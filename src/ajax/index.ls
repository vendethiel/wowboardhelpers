export class ajax
	@get = (url, success) ->
		new XMLHttpRequest
			..open 'GET' url
			..onload = success
			..send!