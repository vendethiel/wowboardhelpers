{$} = require 'dom'

require './top'

# only if logged off
unless $ '.player-name'
	require './login'