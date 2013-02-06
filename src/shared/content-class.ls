content = QS '#content'

content.className = switch
| topic => "topic"
| forum => "forum"
| otherwise => ""