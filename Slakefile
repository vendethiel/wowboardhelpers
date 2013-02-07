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
#  current-forum
sources = <[
  shared/dom-helpers
  shared/common
  shared/lang
  shared/content-class

  utils/date
  
  forum/mar
  forum/stickies
  forum/move-actions
  forum/check-updates

  forum-topics/last-updated
  forum-topics/move-redirects
  forum-topics/hide-topic
  forum-topics/times

  topic/update-count
  topic/improve-topic
  topic/autolink
  
  reply/remember-reply
  reply/clear-textarea
  reply/quick-quote
  reply/memebox
]>

#FUCK YOU FIREFOX FUCK FUCK FUCK FUCK
base-source = """
var topic, forum, forum-options, tbody-regular
var node, replace-with, template, QSA, QS, fetch-siblings
var lang, simplify-time
"""




compile-styles = (cb) ->
  # XXX kind of relying on lexicographic ordering here
  source = []
  for dir in ls \src
    if fs.existsSync "#dir/styles/"
      for file in ls "#dir/styles/"
        compiled.push file
        source.push read file

  nib source * '\n' .render cb

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
    for dir in ls \src
      if fs.existsSync "#dir/templates/"
        for filename in ls "#dir/templates/"
          filename .= replace \// \/ #windows??
          compiled.push filename

          name-parts = filename / '/' #<[src forum-topics templates author.hamlc]>
          [name, ext] = name-parts.3 / '.'

          full-name = "#{name-parts.1}/#name" #no camelcasing : templates'abc/d-e'
          
          template = compile-templates[ext] filename
          source.push "templates.#{camelcase name} = templates['#full-name'] = #template"
  catch
    console.log e.stack
    throw new Error "#ext error on #filename : #{e.message}"

  source * \\n

/**XXX remove them since they're not used anymore??
compile-templates.html = ->
  code = read it
  """
  function (locals) {
    return '#code';
  }
  """

compile-templates.htmls = ->
  code = read it
  LiveScript.compile """
(locals) ->
  \"""
  #{String(code)replace '"""', '\\"\\"\\"'}
  \"""
  """ {+bare}
  .replace('this.' 'locals.')
*/

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
    .replace '$o.join("\\n").replace(/\s(?:id|class)=([\'"])(\1)/mg, "");' '$o.join("")'
    .replace 'return function(context) {' 'function(context) {'
    .trim!

compile = (it, options) ->
  try
    compiled.push "#it"
    LiveScript.compile read(it), options
  catch
    throw new Error "Compiling #it:\n\t#{e.message}"

wrap = -> "let\n\t#{read it .replace /\n/g '\n\t'}"

# stuff each file into a `let` IEFE, and then compile, which
# avoids LiveScript's redefinition of boilerplate
compile-ls = (paths) ->
  source = [base-source]
  #disabled compile errors because they're failing on compound assign
  for path in paths
    if fs.existsSync "src/#path/"
      # directory
      for file in ls "src/#path/"
        #compile file # detect compile errors
        source.push wrap file
    else
      # single file
      #compile "src/#path.ls"
      source.push wrap "src/#path.ls"

  try
#    fs.writeFileSync outfile + ".ls" source * \\n
    LiveScript.compile source * \\n {+bare}
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
        console.time('userscript');
        (function () {
        """
        wrap-css css
        [v for , v of runtime] * ';\n'
        templates
        compile-ls sources
        """
        }).call(w)
        console.timeEnd('userscript');
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
