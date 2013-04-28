# could be replaced with ForbesLindsay/ajax but I think
# this is enough ATM :)
module.exports =
	get: (url, success) ->
		new XMLHttpRequest
			..open 'GET' url
			..onload = success
			..send!