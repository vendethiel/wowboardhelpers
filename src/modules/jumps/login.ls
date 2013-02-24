return if QS '.player-name'

bind-key 'l' 'login' !->
	w.Login.open 'https://eu.battle.net/login/login.frag'