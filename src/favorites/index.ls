# this only serves as a placeholder for reading & writing
# this is not done yet, I have to decide whether it'll be
#  - a thread watcher
#  - a bookmark system
require! <[forum topic]>
FavoriteHolder = require './favorite-holder'

forum-id = forum?dataset.id or topic.dataset.forum-id

module.exports = new FavoriteHolder forum-id