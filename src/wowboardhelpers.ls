console.log 'Ahhhh…greetings ! Want to help on this ? Head over to http://github.com/Nami-Doc/wowboardhelpers !'
console.time 'wowboardhelpers'

require './board/content-class'
require './board/css'

require './jumps'
require './fix'

if require './topic'
	require './topic-characters'
	require './topic-posts'

	if require './textarea'
		require './reply'


if require './forum'
	require './forum-layout'
	require './forum-topics'
	require './forum-layout/hide-mar'

require './cheatsheet'

console.timeEnd 'wowboardhelpers'