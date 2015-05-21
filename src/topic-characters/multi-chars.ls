require! <[lib/lang]>
{$, $$, el} = require 'lib/dom'
template-multi-chars = require './templates/multi-chars'

account-characters = if localStorage.getItem "#{lang.locale}-accountCharacters"
	JSON.parse that
else {}

function clean
	it -= 'context-link' # remove class
	it -= 'xmlns="http://www.w3.org/1999/xhtml" '
	it

modified = false # avoid saving if useless

for post-character in $$ '.post-character'
	icon-ignore = post-character.querySelector '.icon-ignore'
	continue unless icon-ignore # own account
	link = clean <| post-character.querySelector '.bnet-username > a' .outerHTML.trim!

	# need to use getAttribute() for chrome because it sucks
	# and it's returned as a string, which should be the same in other browsers
	# since it's a DOM thing, but better safe than sorry ...
	[, account] = /ignoreUser\(this, ([0-9]+)/ == icon-ignore.getAttribute 'onclick' .toString!
	
	post-character.dataset <<< {account, link}

	unless link in account-characters[][account]
		modified = true
		account-characters[account]push link

if modified # save it !
	localStorage.setItem "#{lang.locale}-accountCharacters" JSON.stringify account-characters

for post-character in $$ '.topic-post:not(.hidden) .post-character'
	{account, link: current} = post-character.dataset
	continue unless account

	# excluding null because stuff gets randomly corrupted
	characters = account-characters[account]exclude null
	continue if characters.length is 1

	{offset-height: height}:post-detail = $ '.post-detail' post-character.parentNode

	# no toggler for one char (2 is because the current is ignored)
	# base 130 (h1 = 15) + approx 15 for each char (-1 for the current)
	toggle = characters.length > 2 and height < 130 + (characters.length - 1) * 15

	post-character.appendChild do
		el template-multi-chars {toggle, current, characters}

	if toggle
		{children}:ul = post-character.querySelector 'ul'
		children = [...children]

		# floor it to display the max possible. if we have 8.2 we want
		# it to be 8 (displayed) so that we'll have one hidden
		if (limit = ((height - 130) / 15)floor!) > 1
			children.to limit .each (.style.display = '')

		toggle = $ '.toggle', post-character

		let ul, children, toggle
			toggle.onclick = ->
				children.each (.style.display = '')
				postCharacter.querySelector '.toggler' .style.display = 'none'

				# no-op onclick as the h1 itself is toggling
				# and we're only removing the [+]
				toggle.onclick = ->