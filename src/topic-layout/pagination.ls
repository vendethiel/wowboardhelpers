# adds "first" and "last" if needed to pagination
{$$} = require 'lib/dom'
template-pagination = require './templates/pagination'
require! <[../topic]>

{page, url} = topic.dataset

uls = $$ 'ul.ui-pagination'
if uls.length
	[{innerHTML: pagination}:ul] = uls
	pagination-html = template-pagination {
		page, url, pagination,
		max: +$$('li:not(.cap-item) span', ul)[*-1]innerHTML
	}

	for uls => ..innerHTML = pagination-html