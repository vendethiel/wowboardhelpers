return unless topic

account-characters = if localStorage.getItem "account-characters"
	JSON.parse that
else {}

post-characters = QSA '.post-character'
for post-character in post-characters
	icon-ignore = post-character.querySelector '.icon-ignore'
	continue unless icon-ignore # self account
	name = post-character.querySelector '.char-name-code' .innerHTML.trim!
	link = post-character.querySelector '.user-name > a' .outerHTML.trim!
	link -= "context-link " # remove class

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

for post-character in post-characters
	{account, name: current} = post-character.dataset
	continue unless account
	continue if account-characters[account]length is 1

	post-character.appendChild do
		template 'multi-chars' {current, characters: account-characters[account]}