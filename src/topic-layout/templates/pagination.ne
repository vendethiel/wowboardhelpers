~ require! <[lib/lang]>

mixin item(page, text)
	li.cap-item: a(href="#{@url}?page=" + page)== text

if @page > 2
	+item(1, "#{lang.page-first}")

= @pagination

if (@max - @page) > 2
	+item("#{@max}", "#{lang.page-last}")