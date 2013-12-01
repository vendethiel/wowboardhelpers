require! <[../topic ../forum]>
{$} = require 'lib/dom'

content = $ '#content'

classes = []

classes.push switch
| topic => 'topic'
| forum => 'forum'
| otherwise => ''

classes.push if $ '.login-msg'
	'logged-off'
else 'logged-in'

content.className = classes * ' '