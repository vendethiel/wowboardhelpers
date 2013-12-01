{$$} = require 'lib/dom'

# get account's character names
characters = [...$$ '.char-wrapper .name']
if characters.length
	characters .= map 'innerHTML'

module.exports = characters