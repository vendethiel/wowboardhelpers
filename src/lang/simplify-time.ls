time-table =
	* 'heures'  'h'
	* 'heure'   'h'
	* 'houres'  'h'
	* 'hour'    'h'

	* 'minutes' 'm'
	* 'minute'  'm'

	* 'jours'   'j'
	* 'jour'    'j'
	* 'days'    'd'
	* 'day'     'd'

	* 'secondes' 's'
	* 'seconds'  's'
	* 'second'   's'

/**
 * simplifies time based on table replacement
 */
module.exports = function simplify-time
	for [convert-from, convert-to] in time-table
		it .= replace convert-from, convert-to

	it