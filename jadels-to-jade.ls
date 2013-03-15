entab = -> "\t" * it
blame = -> console.log it; process.exit!
require! jade

export compile = (src, filename) ->
  src .= replace /@/g 'locals.'

  src = convert src
  src .= replace /#{/g '{{'

  # sometimes we need jade interp
  # let's use %{} for that (only for the parser)
  src .= replace /%{/g '#{'

  # a(b=!{x}!)
  src .= replace /!{/g '"{{'
  src .= replace /}!/g '}"'

  try
    fn = jade.compile src, {+pretty}
  catch
    say src
    say "Jade Error compiling #filename : #e"
  
  fn = fn!
  
  # used for tag interpolation (`#{tag} text`)
  # WARNING : can not use ''
  fn .= replace /__/g '#{'
  fn .= replace /--/g '}'

  # clean a bit. Sadly no way to disable escaping
  fn .= replace /&quot;/g '"'

  wrap fn.replace /\{\{/g '#{'

export convert = ->
  it -= /\r/g # fuck
  src = []

  # tags to parse
  tags = <[if unless join while for]>

  # tags that must take on another
  chained-tags = <[else]>

  # tags that must be joined
  joinable-tags = <[while for]>
  
  # keep tracks on indent needed for tags
  # so that we can 
  indent-levels = []

  # keep tracks of real indent to insert
  # (same as indent-levels minus extra-level)
  real-indents = []

  var prev-indent
  for line in (it + "\n") / '\n'
    extra-level = indent-levels.length

    indent = if line.match /^\t+/
      that.0.length
    else 0

    [tag] = line.trim!split ' '

    # auto-close
    pop = null
    while indent < indent-levels[*-1]
      indent-levels.pop!
      #        INDENT            close the """ and nullcheck
      src.push entab(real-indents.pop!) + '| """) or ""}'
      --extra-level # decrease debt

    if tag in tags
      # insert the tag
      code = line.trim!

      if tag in joinable-tags
        code = "join <| #code"

      tabs = entab indent - extra-level
      line = tabs + '| #{(' + code + ' then """'

      # we're expecting an outdent
      indent-levels.push indent+1
      real-indents.push indent - extra-level
    else if tag in chained-tags
      # answer to another tag

      src.pop! # remove closing + nullcheck
      src.push '| """' # add only closing

      tabs = entab prev-indent
      line = tabs + '| ' + line.trim! + ' then """'

      # we're expecting an outdent
      indent-levels.push indent+1
      real-indents.push indent - extra-level
    else
      line .= slice extra-level
      trimmed = line.trim!

      if trimmed.charAt(0) is '='
        line = line.replace('=' '| #{') + '}'
      else if trimmed.slice(0 2) is '#{'
        # tag interpolation => #{tag} becomes should be #{"tag"}
        line .= replace '#{' '%{"__'
        line .= replace '}' '--"}'
      else if ~line.indexOf '= '
        # BAAH this is bad, it's gonna do bad things such as
        # a(foo= "bar")
        # but well...
        line = line.replace('= ' ' #{') + '}'

    src.push line
    prev-indent := indent - extra-level

  src *= '\n'

  src

export wrap = ->
  """
    require! lang
    join = -> it.join ''
    module.exports = (locals) ->
      document.createElement 'div'
        ..innerHTML = \"""
          #it
        \"""

        return ..firstElementChild
  """