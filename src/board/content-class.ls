require! <[dom/$ topic forum]>

content = $ '#content'

content.className = switch
| topic => "topic"
| forum => "forum"
| otherwise => ""