require! <[fs LiveScript nephrite stylus uglify-js acorn]>
{exec} = require 'child_process'
cjs = require 'commonjs-everywhere'

read = -> fs.readFileSync it
blame = -> say ...; process.exit!

##########
# CONFIG #
##########
outfile = 'wowboardhelpers.user.js'
stylefile = 'src/wowboardhelpers.styl'
modulefile = 'src/wowboardhelpers.ls'
metadata = slurp 'metadata.js'

errinfo = ->
  say it
  console.log '\007'

compile-styles = ->
  filename = stylefile
  nib read(filename)+'' {filename} .render!

nib = -> stylus ... .use require(\nib)!

ls-parse = (src, filename) ->
  try LiveScript.compile src, {+bare, filename}
  catch {message} => errinfo "LiveScript (#filename): #message"

en-ast = (fn) -> (src, filename) ->
  try acorn.parse fn src.toString!, filename
  catch {message} => errinfo "Acorn (#filename): #message"


cjs-options =
  export: null
  node: false
  handlers:
    '.styl': ->
      # trap it, triggered when last-changed is a .styl

    '.ne': en-ast (src, filename) -> # TODO make it composable ?
      try
        src = nephrite src, filename
        ls-parse src, filename
      catch {message} => errinfo "Nephrite (#filename): #message"

    '.ls': en-ast ls-parse

    '.js': en-ast (it, filename) -> it

processed = {}
entry-point = modulefile
last-changed = entry-point

traverse-deps = cjs~traverseDependencies
bundle = cjs~bundle

var ast, css, css-change

ast-node = uglify-js.AST_Node
task 'build' 'build userscript' !->
  if css-change or not css # recompile css if first time OR css changed
    console.time 'CSS'
    try
      css := compile-styles!trim!replace /\n/g '\\\n' .replace /"/g '\\"'
    catch {message}
      return errinfo "Stylus: #message"
    console.timeEnd 'CSS'

  unless css-change
    try
      console.time 'CJS'
      new-deps = traverse-deps last-changed, __dirname, cjs-options
      for file of new-deps => processed[file] = new-deps[file]

      ast := bundle processed, entry-point, __dirname, cjs-options
      console.timeEnd 'CJS'

      console.time 'gen'
      code = ast-node
        .from_mozilla_ast ast
        .print_to_string {+beautify}
      console.timeEnd 'gen'
    catch {message, stack}
      errinfo "Compilation: #message\n#stack"
      return

  spit outfile, "// Generated by WBH:Slakefile\n#metadata\n
    #{code.replace '%css%' css}"
  say "compiled script to #outfile"

task 'watch' 'watch for changes and rebuild automatically' !->
  invoke 'build'

  <-! require('gaze') <[metadata.js src/**/* lib/**/* Slakefile]>
  say 'Watching files for changes.'
  (ev, file) <-! @on 'all'
  css-change := ~file.indexOf '.styl'

  if ev is 'deleted'
    # `last-changed := entry-point unless css-change` ?
    return

  return unless fs.statSync file .isFile!
  last-changed := file

  file .= slice __dirname.length + 1 # leading (back)slash
  if file is 'Slakefile'
    say 'Slakefile changed.'
    process.exit!

  say "Event #ev on #file. Rebuilding."

  invoke 'build'