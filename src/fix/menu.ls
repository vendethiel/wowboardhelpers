# fixes Blizzard's menu
# which seems to think js has autovivification

old = w.Menu.show
w.Menu.show = (, , options = {}) ->
	w.Menu.dataIndex[options.set ? 'base'] ?= []

	old ...