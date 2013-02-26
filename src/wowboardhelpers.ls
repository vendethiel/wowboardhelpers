console.log 'Ahhhh…greetings ! Want to help on this ? Head over to http://github.com/Nami-Doc/wowboardhelpers !'
console.time 'wowboardhelpers'

require 'board/content-class'
require 'board/css'

require 'modules/jumps/all'
require 'fix/all'

if require 'topic'
	require 'topic-characters/all'
	require 'topic-posts/all'

	if require 'textarea'
		require 'reply/all'


if require 'forum'
	require 'forum/all'
	require 'forum-topics/all'

console.timeEnd 'wowboardhelpers'