require! <[fs LiveScript stylus jade]>

ls = -> ["#it/#file" for file in fs.readdirSync it]

flatten = -> []concat ...it # shallow flatten

join = -> flatten & .join \\n
read = -> fs.readFileSync it, \utf8


##########
# CONFIG #
##########
outfile = \wowboardhelpers.user.js
metadata = read \metadata.js
#  current-forum
sources = <[
  dom-helpers
  common
  lang
  
  mar
  stickies
  move-actions

  last-updated
  move-redirects
  hide-topic

  update-count
  improve-topic
  remember-reply
  clear-textarea
  quick-quote
]>




compile-styles = (cb) ->
  # XXX kind of relying on lexicographic ordering here
  styles = ls \styles
  source = [read .. for styles] * \\n
  nib source .render cb

wrap-css = ->
  return "" unless it

  code = """
var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '#{it.replace "'" "\'" .replace /\n/g '\\n'}';
document.head.appendChild(style);
  """

compile-templates = ->
  source = ["var templates = {};"]
  try
    for filename in ls \templates
      #templates/do-it.jade => doIt
      name = filename.slice(10 -5)replace /-(.)/g -> it.1.toUpperCase!
      source.push "templates.#name = #{jade.compile read(filename), {+client, -compileDebug, filename}}"
  catch
    throw new Error "Jade error on #filename : #{e.message}"

  source * \\n

compile = (it, options) ->
  try
    LiveScript.compile read(it), options
  catch
    throw new Error "Compiling #it:\n\t#{e.message}"

wrap = -> "let\n\t#{read it .replace /\n/g '\n\t'}"

# stuff each file into a `let` IEFE, and then compile, which
# avoids LiveScript's redefinition of boilerplate
compile-ls = (paths) ->
  source = []
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

  try
#    fs.writeFileSync outfile + ".ls" source * \\n
    LiveScript.compile source * \\n {+bare}
  catch
    throw new Error "Compiling all:\n\t#{e.message}"

nib = -> stylus it .use require(\nib)!

task \build 'build userscript' ->
  err, css <- compile-styles
  try
    throw err if err
    fs.writeFileSync do
      outfile
      join do #can't use strict cause jade :(
        metadata
        "(function(){"
        wrap-css compile-styles!
        read "node_modules/jade/runtime.min.js"
        compile-templates!
        compile-ls sources
        "}).call(this)"
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
  for it in <[styles src templates metadata.js]>
    fs.watch it, interval: 1000, debounce 1000 (event, filename) ->
      console.log "#event event detected on #filename. rebuilding..."
      invoke \build
