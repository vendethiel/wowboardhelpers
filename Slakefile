require! <[fs LiveScript nephrite stylus esprima glob]>
{exec} = require 'child_process'
{cjsify-sync: cjsify} = require 'commonjs-everywhere'

ls = -> ["#it/#file" for file in fs.readdirSync it]
flatten = -> []concat ...it # shallow flatten
camelcase = -> it.replace /-(.)/g -> it.1.toUpperCase!
join = -> flatten & .join \\n
blame = -> say it if it?; process.exit!
shell = (command) ->
  err, sout, serr <- exec command
  process.stdout.write sout if sout
  process.stderr.write serr if serr
  say err if err

##########
# CONFIG #
##########
outfile = \wowboardhelpers.user.js
metadata = slurp \metadata.js


compile-styles = ->
  # XXX kind of relying on lexicographic ordering here
  source = []
  for dir in ls \src
    if fs.existsSync "#dir/styles/"
      for file in ls "#dir/styles/"
        source.push slurp file

  nib source * '\n' .render!

nib = -> stylus it .use require(\nib)!

task \npm "does npm related crap" !->
  libs = <[ajax autolink dom fetch-siblings lang parse-time]>
  cmds =
    "npm link #{["lib/#lib" for lib in libs] * ' '}"
    "npm install"
  for cmd in cmds
    shell cmd

task \build "build userscript" ->
  try
    css = compile-styles!
    
    console.time "Total  "

    cjs-time-base = Date.now!
    ls-time = 0
    jade-time = 0
    esprima-time = 0

    esprima-parse = (src, filename) ->
      c = Date.now!

      try
        ast = esprima.parse src
      catch {message}
        say "Esprima Error on #filename : #message"

      esprima-time += Date.now! - c

      ast

    ls-parse = (it, filename) ->
      c = Date.now!

      try
        src = LiveScript.compile it, {+bare, filename}
      catch {message}
        say it
        blame "LS error on #filename : #message"

      ls-time += Date.now! - c

      src

    ast = cjsify "src/wowboardhelpers.ls", __dirname,
      export: null
      handlers:
        '.jadels': (it, filename) ->
          it .= toString!

          c = Date.now!
          src = nephrite it, filename
          jade-time += Date.now! - c

          src = ls-parse src, filename
          esprima-parse src, filename

        '.ls': (it, filename) ->
          it .= toString!replace '%css%' css
          src = ls-parse it, filename
          esprima-parse src, filename

    say "cjsify : #{Date.now! - cjs-time-base - ls-time - esprima-time}ms"
    say "ls     : #{ls-time}ms"
    say "jadeLS : #{jade-time}ms"
    say "esprima: #{esprima-time}ms"

    console.time "codegen"
    code = require 'escodegen' .generate ast/*,
      sourceMapRoot: "/"
      sourceMapWithCode: true
      sourceMap: true*/
    console.timeEnd "codegen"

    # minify gives us nuttin'
    spit outfile, join do
      metadata
      code
    console.timeEnd "Total  "
    say "compiled script to #outfile"
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
  files = []

  err, _files <- glob "src/**/*.*" {}
  throw err if err?
  files ++= _files

  err, _files <- glob "lib/**/*.*" {}
  throw err if err?
  files ++= _files

  for file in files
    fs.watch file, interval: 1000, debounce 1000 (event, filename) ->
      say "#event event detected on #filename. rebuilding..."
      invoke \build
