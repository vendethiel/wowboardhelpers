entab = -> "\t" * it
require! jade

export compile = (src, filename) ->
  src .= replace /@/g 'locals.'

  src = convert src
  src .= replace /#{/g '{{'

  try
    fn = jade.compile src, {+pretty}
  catch
    say src
    say "Jade Error compiling #filename : #e"
  
  fn = fn!
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

  var prev-indent
  for line in (it + "\n") / '\n'
    extra-level = indent-levels.length

    indent = if line.match /^\t+/
      that.0.length
    else 0

    [tag] = line.trim!split ' '

    # auto-close
    if indent-levels[*-1]?
      while indent < indent-levels[*-1]
        indent-levels.pop!
        #        INDENT            close the """ and nullcheck
        src.push entab(prev-indent) + '| """) or ""}'
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
    else if tag in chained-tags
      # answer to another tag

      src.pop! # remove closing + nullcheck
      src.push '| """' # add only closing

      tabs = entab prev-indent
      line = tabs + '| ' + line.trim! + ' then """'

      # we're expecting an outdent
      indent-levels.push indent+1
    else
      line .= slice extra-level

      if line.trim!charAt(0) is '='
        line = line.replace('=' '| #{') + '}'
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