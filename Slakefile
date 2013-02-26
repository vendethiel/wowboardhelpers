require! <[fs LiveScript stylus haml-coffee esprima glob]>

{cjsify} = require 'commonjs-everywhere'

ls = -> ["#it/#file" for file in fs.readdirSync it]
flatten = -> []concat ...it # shallow flatten
camelcase = -> it.replace /-(.)/g -> it.1.toUpperCase!
join = -> flatten & .join \\n
read = -> fs.readFileSync it, \utf8

##########
# CONFIG #
##########
outfile = \wowboardhelpers.user.js
metadata = read \metadata.js

# shared/ contains various utils
# shared/utils contains wow-unrelated things & native class overrides
# fix/ fixes some of the BROKEN wow behaviors
#  (might be used for behavior overrides? fix/{reply,...}?)
# forum contains forum-related things such as look etc (but not the table.#posts)
# forum-topics contains topiclist-related things
# topic contains viewtopic-related things
# reply contains reply-related (textarea) thingss

sources = <[
  shared/helpers/
  shared/common
  shared/css
  shared/lang
  shared/content-class
  shared/utils/
  
  forum/mar
  forum/stickies
  forum/move-actions
  forum/check-updates

  forum-topics/last-updated
  forum-topics/move-redirects
  forum-topics/hide-topic
  forum-topics/times

  topic-characters/improve-topic
  topic-characters/multi-chars
  topic-characters/context-links

  topic-posts/jump
  topic-posts/autolink
  topic-posts/update-count
  
  reply/remember-reply
  reply/clear-textarea
  reply/quick-quote
  reply/memebox
  reply/preview

  modules/cheatsheet
]>
### REMOVED FEATURES
# Please see removed/README.md
# - topic-characters/context-links




compile-styles = (cb) ->
  # XXX kind of relying on lexicographic ordering here
  source = []
  for dir in ls \src
    if fs.existsSync "#dir/styles/"
      for file in ls "#dir/styles/"
        source.push read file

  nib source * '\n' .render cb

compile-hamlc = (it, name) ->
  opts =
    format: 'xhtml'
    escape-html: false
    escape-attributes: false
    uglify: true
    customCleanValue: 'c$'
    placement: 'standalone'

  code = hamlCoffee.template it, name, "w.templates", opts
  code = (code.trim! / '\n')[1 to -2] * '\n'

  code #crappy hotfixes :(
    .replace do #return left from coffee's {-bare} wrapper
      'return function(context) {'
      'function(context) {'
    .replace /\n  /g '\n' #cut an indent level
    .replace do #we don't need this!
      '$o.join("\\n")'
      '$o.join("")'
    .trim!

compile-js = (it, filename) ->
  try
    esprima.parse it
  catch {message}
    console.log "Error on #filename : #message"

nib = -> stylus it .use require(\nib)!

task \build 'build userscript' ->
  err, css <- compile-styles
  try
    throw err if err

    ast = cjsify 'src/wowboardhelpers.ls', __dirname + '/src',
      export: 'wowboardhelpers'
      root: __dirname + '\\src'
      handlers:
        '.hamlc': (it, filename) ->
          src = compile-hamlc it.toString!, filename
          compile-js src, filename
        '.ls': (it, filename) ->
          src = LiveScript.compile it.toString!, {+bare, filename}
          compile-js src, filename
            

    gen = require 'escodegen' .generate ast,
      sourceMapRoot: __dirname + '/src'
      sourceMapWithCode: true
      sourceMap: true

    fs.writeFileSync do
      outfile
      join do
        metadata
        gen.code
    console.log "compiled script to #outfile"
  catch
    console.error e.message

debounce = (delay, fn) ->
  var timeout
  !->
    ctx = this
    args = arguments
    clearTimeout timeout
    timeout := setTimeout do
      !-> fn.apply ctx, args
      delay

task \watch 'watch for changes and rebuild automatically' ->
  invoke \build
  err, files <- glob "src/**/*.*" {}
  throw err if err?

  for file in files
    fs.watch file, interval: 1000, debounce 1000 (event, filename) ->
      console.log "#event event detected on #filename. rebuilding..."
      invoke \build
