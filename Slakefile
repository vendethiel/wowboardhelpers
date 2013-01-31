require! <[fs LiveScript stylus]>

ls = -> ["#it/#file" for file in fs.readdirSync it]

flatten = -> []concat ...it # shallow flatten

join = -> flatten & .join \\n
read = -> fs.readFileSync it, \utf8

compile = (it, options) ->
  try
    LiveScript.compile do
      read it
      options
  catch
    throw new Error "Compiling #it:\n\t#{e.message}"

wrap = -> "let\n\t#{read it .replace /\n/g '\n\t'}"

compile-css = (cb) ->
  # XXX kind of relying on lexicographic ordering here
  source = [read .. for ls \style] * \\n
  nib source .render cb

wrap-css = ->
  return "" unless it
  nl = String.fromCharCode 10

  code = """
var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '#{it.replace("'" "\'") - /\n/g}';
document.head.appendChild(style);
  """

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
    LiveScript.compile source * \\n {+bare}
  catch
    throw new Error "Compiling all:\n\t#{e.message}"

nib = -> stylus it .use require(\nib)!

outfile = \script.js
metadata = read \metadata.js

task \build 'build userscript' ->
  err, css <- compile-css
  try
    throw err if err
    fs.writeFileSync do
      outfile
      join do
        "(function(){"
        '"use strict";'
        metadata
        compile-ls <[
          common
          lang
          update-count
          view-changer
          mar
          stickies
          last-updated
          current-forum
          improved-topic
        ]>
        wrap-css compile-css!
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
  for it in <[style src]>
    fs.watch it, interval: 1000, debounce 1000 (event, filename) ->
      console.log "#event event detected on #filename. rebuilding..."
      invoke \build
