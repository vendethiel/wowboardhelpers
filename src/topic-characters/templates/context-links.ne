span.extra-links
	- links = {HF: 'achievement', PvP: 'statistic#21:152'}
	- for link, name in links
		a.link-first.extra-link(href="#{@link}" + link)== name