#FUCK YOU IDC I EXTEND NATIVE OBJECTS
String::pad = (len, str) ->
	return if @length >= len

	@ + "#str" * (len - @length)

String::toCamelCase = ->
	@replace /[_-]([a-z])/g -> it.1.toUpperCase!