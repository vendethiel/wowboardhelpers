return unless topic
return unless textarea

post-preview = QS '#post-preview'

# let's replace BML preview to add
# our autolink feature
old = w.BML.preview.bind w.BML
w.BML.preview = (content, target, callback) ->
	old content, target, !->
		callback! # old behavior
		el-autolink post-preview