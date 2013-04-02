require! <[../w autolink]>
{$} = require 'dom'

post-preview = $ '#post-preview'

# let's replace BML preview to add
# our autolink feature
old = w.BML~preview
w.BML.preview = !(content, target, callback) ->
	old content, target, !->
		callback! # old behavior
		autolink post-preview