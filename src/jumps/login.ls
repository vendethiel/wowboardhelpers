require! <[../cheatsheet/bind-key ../w]>

if w.Login
	bind-key 'l' 'login' !->
		w.Login.open 'https://eu.battle.net/login/login.frag'