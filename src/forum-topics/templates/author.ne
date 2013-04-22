span(class='#{["poster", "own-poster" if @own, "type-blizzard" if @cm] * " "}')
	if @cm
		img(src="/wow/static/images/layout/cms/icon_blizzard.gif", alt="CM")
	= @name