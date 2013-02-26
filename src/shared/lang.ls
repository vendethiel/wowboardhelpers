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
		few: 'quelques' #[il y a]

		last-message: 'Message' #.last-post-th
		html-overrides:
			'.replies': 'REPS'
			'.poster': 'Dernier'

		other-characters: 'Autres personnages'

		cheatsheet: 'Raccourcis'
		jump-to-last-read: 'Aller au dernier message lu'
		quick-quote: 'Citer le bout de message sélectionné'

		page-top: 'Haut de page'
		page-bottom: 'Bas de page'
		login: 'Connexion'
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

		other-characters: 'Other characters'

		cheatsheet: 'Cheatsheet'
		jump-to-last-read: 'Jump to last read message'
		quick-quote: 'Quote the selected part'

		page-top: 'Go to top'
		page-bottom: 'Go to bottom'
		login: 'Login'

require! 'utils/toCamelCase'

module.exports = class lang # acts like a proxy to avoid unneeded keys
	import langs[l] ? langs.en
	-> return lang[it] ? lang[toCamelCase it] ? it

	@pluralize ?= (count, key) ~>
		"#{Math.round count} #{@ key}#{['s' if count > 1.5]}"

	@singularize ?= ->
		if it[*-1] is 's'
			it.slice 0 -1
		else
			it