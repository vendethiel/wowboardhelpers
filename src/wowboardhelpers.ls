c$ = '' + (text) ->
	return text * " " if Array.isArray text

	switch text
	| null void  => ''
	| true false => '\u0093' + text
	| otherwise  => text


w = unsafeWindow ? window
'use strict'

w.Cms or # let's detect this, 'tis something comin' from Blizzard Forums
	unsafeWindow = w = w.unsafeWindow = let
		el = document.createElement 'p'
		el.setAttribute 'onclick' 'return window;'
		el.onclick!

console.time 'wowboardhelpers'

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