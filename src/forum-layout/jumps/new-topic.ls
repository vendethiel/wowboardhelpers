require! <[bind-key w dom/$]>

# account disabled
unless $ 'a.button1.disabled'
	bind-key 'n' 'new-topic' !->
		document.location += "topic"