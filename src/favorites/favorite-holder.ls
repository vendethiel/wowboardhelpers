module.exports = class FavoriteHolder
	(@id) ->
		@list = JSON.parse localStorage"forum_#{@id}"

	remove: !->
		@list.splice @indexOf(topic.dataset.id), 1
		@save!

	add: !->
		@list.push topic.dataset.id
		@save!

	index-of: -> @list.indexOf it

	save: !->
		localStorage"forum_#{@id}" = JSON.stringify @list