require! w

# fixes Blizzard's menu
# which seems to think js has autovivification
# NOTE : that will still fail when the extension hasn't been loaded yet

old = w.Menu.show
w.Menu.show = (, , options = {}) ->
	w.Menu.dataIndex[x=options.set ? 'base'] ?= []

	old ...