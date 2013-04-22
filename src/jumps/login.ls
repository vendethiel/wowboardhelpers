require! <[../cheatsheet/bind-key ../w]>

# todo check if we're not logged in currently
bind-key 'l' 'login' !->
	w.Login.open 'https://eu.battle.net/login/login.frag'