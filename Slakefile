require! <[fs LiveScript stylus haml-coffee]>

ls = -> ["#it/#file" for file in fs.readdirSync it]
flatten = -> []concat ...it # shallow flatten
camelcase = -> it.replace /-(.)/g -> it.1.toUpperCase!
join = -> flatten & .join \\n
read = -> fs.readFileSync it, \utf8

compiled = []
runtime = {}

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

  modules/jumps/
  modules/autolink

  fix/
  
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
        compiled.push file
        source.push read file

  nib source * '\n' .render cb

compile-templates = ->
  source = ["var templates = {};"]
  try
    for dir in ls \src
      if fs.existsSync "#dir/templates/"
        for filename in ls "#dir/templates/"
          filename .= replace \// \/ #windows??
          compiled.push filename

          name-parts = filename / '/' #<[src forum-topics templates author.hamlc]>
          [name, ext] = name-parts.3 / '.'

          full-name = "#{name-parts[1 3] * '/' - ".#ext"}" #no camelcasing : templates'abc/d-e'
          
          template = compile-templates[ext] filename
          source.push "templates.#{camelcase name} = templates['#full-name'] = #template"
  catch
    console.log e.stack
    throw new Error "#ext error on #filename : #{e.message}"

  source * \\n

compile-templates.hamlc = ->
  runtime.haml ?= "var c$ = " + (text) ->
    return text * " " if Array.isArray text

    switch text
    | null void  => ''
    | true false => '\u0093' + text
    | otherwise  => text

  name = camelcase (it / '/')[*-1]replace(/\..*$/ '')
  opts =
    format: 'xhtml'
    escape-html: false
    escape-attributes: false
    uglify: true
    customCleanValue: 'c$'
    placement: 'standalone'

  code = hamlCoffee.template read(it), name, "w.templates", opts
  code = (code.trim! / '\n')[1 to -2] * '\n'

  code = code #crappy hotfixes :(
    .replace do #return left from coffee's {-bare} wrapper
      'return function(context) {'
      'function(context) {'
    .replace /\n  /g '\n' #cut an indent level
    .replace do #we don't need this!
      '$o.join("\\n")'
      '$o.join("")'
    .trim!

compile = (it, options) ->
  try
    compiled.push it
    LiveScript.compile read(it), options
  catch
    throw new Error "Compiling #it:\n\t#{e.message}"

wrap = -> "
\nlet ##it
\n\t# console.time '#it'
\n\t#{read it .replace /\n/g '\n\t'}
\n\t# console.timeEnd '#it'"

# stuff each file into a `let` IEFE, and then compile, which
# avoids LiveScript's redefinition of boilerplate
compile-ls = (paths, css) ->
  source = []
  #disabled compile errors because they're failing on compound assign
  for path in paths
    if fs.existsSync "src/#path/"
      # directory
      for file in ls "src/#path/"
        compile file # detect compile errors
        source.push wrap file
    else
      # single file
      compile "src/#path.ls"
      source.push wrap "src/#path.ls"

  source *= \\n
  source .= replace '%css%' css - /\t/

  try
    spit outfile.replace("js" "ls"), source
    LiveScript.compile source, {+bare}
  catch
    throw new Error "Compiling all:\n\t#{e.message}"

nib = -> stylus it .use require(\nib)!

task \build 'build userscript' ->
  compiled.push \metadata.js
  err, css <- compile-styles
  try
    throw err if err
    
    templates = compile-templates! #process now to populate runtime

    fs.writeFileSync do
      outfile
      join do
        metadata
        """
var w;
w = typeof unsafeWindow != 'undefined' && unsafeWindow !== null ? unsafeWindow : window;
'use strict';

w.Cms || ( //let's detect this, 'tis something comin' from Blizzard Forums
  unsafeWindow = w = w.unsafeWindow = (function() {
    var el = document.createElement('p');
    el.setAttribute('onclick', 'return window;');
    return el.onclick();
  }())
);

console.time('wowboardhelpers');
(function () {
        """
        [v for , v of runtime] * ';\n'
        templates
        compile-ls sources, css
        """
}).call(this)
console.timeEnd('wowboardhelpers');
        """
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
  for it in compiled
    fs.watch it, interval: 1000, debounce 1000 (event, filename) ->
      console.log "#event event detected on #filename. rebuilding..."
      compiled := []
      invoke \build
