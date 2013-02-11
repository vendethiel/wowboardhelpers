return unless topic

account-characters = if localStorage.getItem "account-characters"
	JSON.parse that
else {}

for post-character in QSA '.post-character'
	icon-ignore = post-character.querySelector '.icon-ignore'
	continue unless icon-ignore # self account
	name = post-character.querySelector '.char-name-code' .innerHTML.trim!
	link = post-character.querySelector '.user-name > a' .outerHTML.trim!
	link -= "context-link" # remove class

	[, account] = /ignore\(([0-9]+)/ == icon-ignore.onclick.toString!
	
	post-character.dataset <<< {account, name}

	has = false
	for character in account-characters[][account]
		if character.name is name
			has = true
			break
	unless has
		account-characters[account]push {name, link}

# save it !
localStorage.setItem "account-characters" JSON.stringify account-characters

for post-character in QSA '.post:not(.hidden) .post-character'
	{account, name: current} = post-character.dataset
	continue unless account

	characters = account-characters[account]
	continue if characters.length is 1

	post-detail = post-character.parentNode.querySelector '.post-detail'
	height = post-detail.offset-height

	# base 130 (h1 = 15) + approx 15 for each char
	toggle = height < 130 + characters.length * 15

	post-character.appendChild do
		template 'multi-chars' {toggle, current, characters}


	if toggle
		ul = post-character.querySelector 'ul'
		ul.style.display = 'none'
		
		toggle = post-character.querySelector '.toggle'

		let ul, toggle
			toggle.onclick = ->
				ul.style.display = ''
				postCharacter.querySelector '.toggler' .style.display = 'none'

				toggle.onclick = ->