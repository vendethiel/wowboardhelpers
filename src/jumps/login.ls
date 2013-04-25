require! <[../cheatsheet/bind-key ../w]>

bind-key 'l' 'login' !->
	w.Login.open 'https://eu.battle.net/login/login.frag'