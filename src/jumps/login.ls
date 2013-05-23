require! <[../cheatsheet/bind-key ../w]>

if w.Login # fuck chrome
	bind-key 'l' 'login' !->
		w.Login.open 'https://eu.battle.net/login/login.frag'