require! '../cheatsheet/bind-key'
{$} = require 'lib/dom'

bind-key 't' 'page-top' !->
	$ '#logo' .scrollIntoView!