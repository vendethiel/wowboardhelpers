require! <[../topic ../forum]>
$ = require 'dom'

content = $ '#content'

content.className = switch
| topic => "topic"
| forum => "forum"
| otherwise => ""