console.log 'Ahhhh…greetings ! Want to help on this ? Head over to http://github.com/Nami-Doc/wowboardhelpers !'
console.time 'wowboardhelpers'

console.time 'WBH: Sugar'
require 'sugar'
Object.extend!

Date.setLocale location.href.split('/')4
console.timeEnd 'WBH: Sugar'

require './board/content-classes'
require './board/css'

require './jumps'
require './fix'

if require './topic'
	require './topic-characters'
	require './topic-posts'

	if require './textarea'
		require './reply'


if require './forum'
	require './forum-actions'
	require './forum-layout'
	require './forum-topics'
	require './forum-layout/hide-mar'

require './cheatsheet'

console.timeEnd 'wowboardhelpers'