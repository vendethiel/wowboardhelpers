return unless topic

return unless post-preview = QS '#post-preview'

# let's replace BML preview to add
# our autolink feature
old = w.BML.preview.bind w.BML
w.BML.preview = (content, target, c) ->
	# let's bind our autolink
	callback = ->
		c!
		el-autolink post-preview

	# and imitate old behavior
	old content, target, callback