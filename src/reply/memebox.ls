return unless topic

memes =
	challengeaccepted: 'http://troll-face.fr/wp-content/uploads/2012/12/challenge-accepted.png'
	foreveralone: 'http://i1.kym-cdn.com/entries/icons/original/000/003/619/Untitled-1.jpg'
	bitchplease: 'http://www.troll.me/images/yao-ming/bitch-please.jpg'
	stfuandgtfo: 'http://4.bp.blogspot.com/-cD0QmZLGuAY/TnHyAD269EI/AAAAAAAAAkU/6O4rA1REcdI/s1600/STFU_and_GTFO.jpg'
	youdontsay: 'http://bearsharkaxe.com/wp-content/uploads/2012/06/you-dont-say.jpg'
	fullretard: 'http://www.osborneink.com/wp-content/uploads/2012/11/never_go_full_retard1.jpg'
	seriously: 'http://i3.kym-cdn.com/entries/icons/original/000/005/545/OpoQQ.jpg'
	trollface: 'http://www.mes-coloriages-preferes.com/Images/Large/Personnages-celebres-Troll-face-28324.png'
	fuckyeah: 'http://cdn.ebaumsworld.com/mediaFiles/picture/2168064/82942867.jpg'
	pedobear: 'http://aserres.free.fr/pedobear/pedobear.png'
	megusta: 'http://a400.idata.over-blog.com/5/08/51/37/me_gusta_by_projectendo-d2z3rku.jpg'
	notbad: 'http://www.reactionface.info/sites/default/files/images/YvEN9.png'
	ohcrap: 'http://i1.kym-cdn.com/entries/icons/original/000/004/077/Raisins_Face.jpg'
	yuno: 'http://i1.kym-cdn.com/entries/icons/original/000/004/006/y-u-no-guy.jpg'
	fulloffuck: 'http://www.mememaker.net/static/images/templates/14288.jpg'
	okay: 'http://cache.ohinternet.com/images/e/e6/Okay_guy.jpg'
	no: 'http://stickerish.com/wp-content/uploads/2011/09/NoGuyBlackSS.png'

post-wrapper = QS '.post.general'
post-wrapper.removeChild post-wrapper.children[*-1] #remove span.clear

textarea = QS '#post-edit textarea'
return unless textarea

add-meme = (url) ->
	->
		textarea.value += (if textarea.value then "\n" else "") + url

append-meme = (name, url) ->
	ul.appendChild <| do
		document.createElement 'li'
			..innerHTML = name
			..onclick = add-meme url


memebox = template 'memebox'
ul = memebox.querySelector '#memes'
memebox.querySelector '#meme-search' .onkeyup = !->
	value = @value.replace /[\s_-]+/ ''
	ul.innerHTML = ''

	return unless value

	approximates = []; i = 0
	for name, url of memes
		switch name.indexOf value
		| -1 =>
		| 0  => append-meme name, url
		| _  => approximates.push [name, url]

		break if ++i > 10

	for [name, url] in approximates
		append-meme name, url




post-wrapper.appendChild memebox