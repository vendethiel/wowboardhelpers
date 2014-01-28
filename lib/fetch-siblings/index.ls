/**
 * fetches `nextElementSibling`s
 */
module.exports = function fetch-siblings(elem, {slice = 0, index-by = 'className'} = {})
	{[elem[index-by]slice slice .split ' ' .[*-1]; elem] while elem?.=nextElementSibling}