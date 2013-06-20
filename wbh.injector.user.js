/**
// ==UserScript==
// @name WoW Board Helpers (Injector Helper)
// @description UserScript for the official WoW forum
// @match http://eu.battle.net/wow/fr/forum/*
// @match http://eu.battle.net/wow/en/forum/*
// @match http://us.battle.net/wow/en/forum/*
// @author Tel
// @version 0.0.1
// @run-at document-start
// ==/UserScript==
*
* This file is an injector for Wow Board Helpers.
* Basically, Chrome 27+ forbids us to mess with
* real window "because security" (crbug.com/222652).
* Which is stupid since FF/Grease got no problems.
* Anyway, this is a pain for me (Tel) because I
* need to paste the script into my dropbox
* everytime I edit it (symlinks won't work).
*/

setTimeout(function () {
	// not sure if I should be using salt.
	// Kinda breaks caching, eh.
	var salt = Math.round(Math.random() * 1000000)

	var script = document.createElement('script')
	script.src = "https://dl.dropboxusercontent.com/u/105712836/wbh/wowboardhelpers.user.js?"+salt

	document.head.insertBefore(script, document.head.firstChild)
}, 100);