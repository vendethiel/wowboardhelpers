# this only serves as a placeholder for reading & writing
require! <[forum topic]>
FavoriteHolder = require './favorite-holder'

forum-id = forum?dataset.id or topic.dataset.forum-id

module.exports = new FavoriteHolder forum-id