#@todo add `...childs` ? slow downs a lot =(
module.exports = function node(tag, props = {})
	(document.createElement tag) <<< props