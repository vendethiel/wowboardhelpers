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

    root = __dirname + '\\src'
    ast = cjsify 'src/wowboardhelpers.ls', root,
      export: 'wowboardhelpers'
      handlers:
        '.hamlc': (it, filename) ->
          src = compile-hamlc it.toString!, filename
          src = """
          var lang = require('lang');
          var fn=#src

          module.exports = function (locals) {
            var node = div = document.createElement('div');
            div.innerHTML = fn(locals);
            return div.firstElementChild;
          }
          """
          compile-js src, filename
        '.ls': (it, filename) ->
          it .= toString!replace '%css%' css
          src = LiveScript.compile it, {+bare, filename}
          compile-js src, filename
            

    gen = require 'escodegen' .generate ast,
      sourceMapRoot: __dirname + '/src'
      sourceMapWithCode: true
      sourceMap: true

    fs.writeFileSync do
      outfile
      join do
        metadata
        '"use strict";'
        'var c$ = ' + ((text) ->
          return text.join " " if Array.isArray text

          switch text
          | null void  => ''
          | true false => '\u0093' + text
          | otherwise  => text) + ';'
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
