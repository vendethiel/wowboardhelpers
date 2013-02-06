return unless forum

QS '.forum-options'
	..parentNode.removeChild ..

	QS '.content-trail' .appendChild ..