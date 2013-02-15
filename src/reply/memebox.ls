return unless topic
return unless textarea # shortcircuit here (if banned or something)

memes =
	challengeaccepted: 'http://sambacentral.files.wordpress.com/2012/11/challenge-accepted.jpg'
	foreveralone: 'http://i1.kym-cdn.com/entries/icons/original/000/003/619/Untitled-1.jpg'
	bitchplease: 'http://www.troll.me/images/yao-ming/bitch-please.jpg'
	stfuandgtfo: 'http://4.bp.blogspot.com/-cD0QmZLGuAY/TnHyAD269EI/AAAAAAAAAkU/6O4rA1REcdI/s1600/STFU_and_GTFO.jpg'
	youdontsay: 'http://bearsharkaxe.com/wp-content/uploads/2012/06/you-dont-say.jpg'
	fullretard: 'http://www.osborneink.com/wp-content/uploads/2012/11/never_go_full_retard1.jpg'
	susalenemi: 'http://img11.hostingpics.net/pics/311549libertlolxqt.png'
	fulloffuck: 'http://www.mememaker.net/static/images/templates/14288.jpg'
	seriously: 'http://i3.kym-cdn.com/entries/icons/original/000/005/545/OpoQQ.jpg'
	trollface: 'http://fc09.deviantart.net/fs70/f/2012/342/5/a/troll_face_by_bmsproductionz-d5ng9k6.png'
	fuckyeah: 'http://cdn.ebaumsworld.com/mediaFiles/picture/2168064/82942867.jpg'
	pedobear: 'http://aserres.free.fr/pedobear/pedobear.png'
	slowpoke: 'https://0-media-cdn.foolz.us/ffuuka/board/a/image/1351/43/1351437155488.png'
	megusta: 'http://a400.idata.over-blog.com/5/08/51/37/me_gusta_by_projectendo-d2z3rku.jpg'
	notbad: 'http://www.reactionface.info/sites/default/files/images/YvEN9.png'
	ohcrap: 'http://i1.kym-cdn.com/entries/icons/original/000/004/077/Raisins_Face.jpg'
	trauma: 'http://global3.memecdn.com/trauma_c_629591.jpg'
	yuno: 'http://i1.kym-cdn.com/entries/icons/original/000/004/006/y-u-no-guy.jpg'
	okay: 'http://cache.ohinternet.com/images/e/e6/Okay_guy.jpg'
	no: 'http://stickerish.com/wp-content/uploads/2011/09/NoGuyBlackSS.png'

/*# disabled as per dryaan
extra-memes = {}
if localStorage.getItem "memes"
	extra-memes = JSON.parse that
	# extra work on these is done at the bottom, after memebox is appended to dom
*/


return unless post-wrapper = QS '.post.general'
post-wrapper.removeChild post-wrapper.children[*-1] #remove span.clear

add-meme = (url) ->
	->
		textarea.value += (if textarea.value then "\n" else "") + url

append-meme = (name, url) ->
	ul.appendChild <| do
		document.createElement 'li'
			..innerHTML = name
			..onclick = add-meme url

/*
if localStorage.getItem "hide_memebox"
	post-wrapper.appendChild <|
		node 'div' id: 'memebox'
			<|
			node 'span' className: 'unhider' innerHTML: 'Memebox ✓'
				..onclick = ->
					localStorage.removeItem "hide_memebox"
					@innerHTML = 'OK!'

	return

hider = memebox.querySelector '.hider'
hider.onclick = ->
	memebox.style.display = 'none'
	localStorage.setItem "hide_memebox" "1"
*/

memebox = template 'memebox'

ul = memebox.querySelector '#memes'
memebox.querySelector '#meme-search' .onkeyup = !->
	value = @value.replace /[\s_-]+/ ''
	ul.innerHTML = ''

	return unless value

	approximates = []; i = 0
	for name, url of memes # {...extra-memes, ...memes}
		switch name.indexOf value
		| -1 =>
		| 0  =>
			append-meme name, url

			break if ++i > 10
		| _  =>
			approximates.push [name, url]

	for [name, url] in approximates
		append-meme name, url

		break if ++i > 10

post-wrapper.appendChild memebox

# now let's move on user memes