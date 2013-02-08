l = (document.location / '/')4

langs =
	fr:
		time-index: 3
		time-outdex: 0

		toggle-sticky: 'Afficher/Cacher les post-its'
		mar: 'Tout marquer comme lu'
		new-messages: 'Il y a des nouveau(x) message(s)'
		checking-new: 'Vérification des nouveaux messages ...'
		no-new: 'Pas de nouveau message.'

		few-seconds-ago: 'il y a quelques secondes'
		#table FR to EN for time parsing
		seconde: 'second'
		second: 'seconde'
		heure: 'hour'
		hour: 'heure'
		jour: 'day'
		day: 'jour'

		last-message: 'Message' #.last-post-th
		html-overrides:
			'.replies': 'REPS'
			'.poster': 'Dernier'
	en:
		time-index: 0
		time-outdex: -1

		last-message: 'Last'
		toggle-sticky: 'Show/Hide stickies'
		mar: 'Mark all as read'
		few-seconds-ago: 'few seconds ago'
		new-messages: 'There are new message(s)'
		checking-new: 'Checking new messages ...'
		no-new: 'No new message.'

export lang = langs[l] ? langs.en

for k in <[minute hour day year]>
	lang[k] ?= k

lang.pluralize ?= (count, key) ->
	"#{Math.round count} #{@[key]}#{['s' if count > 1.5]}"

lang.singularize ?= ->
	if it[*-1] is 's'
		it.slice 0 -1
	else
		it

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
	* 'seconds' 's'
	* 'second' 's'

/**
 * simplifies time based on table replacement
 */
export function simplify-time
	for [convert-from, convert-to] in time-table
		it .= replace convert-from, convert-to

	it