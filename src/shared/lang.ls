l = (document.location / '/')4

langs =
	fr:
		time-index: 3
		time-outdex: 0

		last-message: 'Dernier message'
		toggle-sticky: 'Afficher/Cacher les post-its'
		mar: 'Tout marquer comme lu'
	en:
		time-index: 0
		time-outdex: -1

		last-message: 'Last message'
		toggle-sticky: 'Show/Hide stickies'
		mar: 'Mark all as read'

export lang = langs[l]


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

/**
 * simplifies time based on table replacement
 */
export function simplify-time
	for [convert-from, convert-to] in time-table
		it .= replace convert-from, convert-to

	it