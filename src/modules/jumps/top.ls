return unless topic

#XXX jumps/ ?

bind-key 't' 'page-top' !->
	QS '#logo' .scrollIntoView!