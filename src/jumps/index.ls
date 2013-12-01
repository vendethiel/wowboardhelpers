{$} = require 'lib/dom'

require './top'

# only if logged off
unless $ '.player-name'
	require './login'