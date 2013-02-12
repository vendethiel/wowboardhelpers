return unless topic

# old version
if localStorage.getItem 'account-characters'
	console.log 'going to new format'
	new-array = {[acc, [clean val.link for val in vals when val.link isnt String::link]] \
		for acc, vals of JSON.parse that}

	localStorage.setItem "accountCharacters" JSON.stringify new-array
	localStorage.removeItem 'account-characters'


# ok, back to our business ...
account-characters = if localStorage.getItem 'accountCharacters'
	JSON.parse that
else {}

function clean
	it -= "context-link" # remove class
	it -= "xmlns=\"http://www.w3.org/1999/xhtml\" " #xlmns
	it

for post-character in QSA '.post-character'
	icon-ignore = post-character.querySelector '.icon-ignore'
	continue unless icon-ignore # self account
	# yes <| binds tighter than <|, fuck LS
	link = clean post-character.querySelector('.user-name > a')outerHTML.trim!

	[, account] = /ignore\(([0-9]+)/ == icon-ignore.onclick.toString!
	
	post-character.dataset <<< {account, link}

	unless link in account-characters[][account]
		account-characters[account]push link

# save it !
localStorage.setItem "accountCharacters" JSON.stringify account-characters

for post-character in QSA '.post:not(.hidden) .post-character'
	{account, link: current} = post-character.dataset
	continue unless account

	characters = account-characters[account]
	continue if characters.length is 1

	post-detail = post-character.parentNode.querySelector '.post-detail'
	height = post-detail.offset-height

	# no toggler for one char (2 is because the current is ignored)
	# base 130 (h1 = 15) + approx 15 for each char
	toggle = if characters.length > 2
		(height - 130) / (characters.length * 15)
	else 1

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