content = QS '#content'

content.className = switch
| topic => "topic"
| posts => "forum"
| otherwise => ""