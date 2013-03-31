require! '../cheatsheet/bind-key'
{$} = require 'dom'

bind-key 't' 'page-top' !->
	$ '#logo' .scrollIntoView!