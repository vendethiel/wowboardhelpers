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


compile-styles = ->
  # XXX kind of relying on lexicographic ordering here
  source = []
  for dir in ls \src
    if fs.existsSync "#dir/styles/"
      for file in ls "#dir/styles/"
        source.push read file

  nib source * '\n' .render!

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

task \build "build userscript" ->
  try
    css = compile-styles!
    
    console.time "Total  "

    cjs-time-base = Date.now!
    ls-time = 0
    hamlc-time = 0
    esprima-time = 0

    root = __dirname + "/src"
    
    ast = cjsify "src/wowboardhelpers.ls", root,
      export: null
      handlers:
        '.hamlc': (it, filename) ->
          c = Date.now!
          src = compile-hamlc it.toString!, filename
          hamlc-time += Date.now! - c
          src = """
          var lang = require('lang');
          var fn=#src

          module.exports = function (locals) {
            var div = document.createElement('div');
            div.innerHTML = fn(locals);
            return div.firstElementChild;
          }
          """

          c = Date.now!
          ast = compile-js src, filename
          esprima-time += Date.now! - c

          ast
        '.ls': (it, filename) ->
          it .= toString!replace '%css%' css

          c = Date.now!
          src = LiveScript.compile it, {+bare, filename}
          ls-time += Date.now! - c

          c = Date.now!
          ast = compile-js src, filename
          esprima-time += Date.now! - c

          ast

    console.profileEnd!

    console.log "cjsify : #{Date.now! - cjs-time-base - ls-time - hamlc-time - esprima-time}ms"
    console.log "ls     : #{ls-time}ms"
    console.log "hamlc  : #{hamlc-time}ms"
    console.log "esprima: #{esprima-time}ms"

    console.time "AST->JS"
    gen = require "escodegen" .generate ast,
      sourceMapRoot: __dirname + '/src'
    console.timeEnd "AST->JS"

    fs.writeFileSync do
      outfile
      join do
        metadata
        '"use strict";'
        "var c$ = " + (text) ->
          return text.join " " if Array.isArray text

          switch text
          | null void  => ""
          | true false => "\u0093" + text
          | otherwise  => text
        ";"
        gen
    console.timeEnd "Total  "
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
