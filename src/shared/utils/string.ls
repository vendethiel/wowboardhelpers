#FUCK YOU IDC I EXTEND NATIVE OBJECTS
String::pad = (len, str) ->
	return if @length >= len

	@ + "#str" * (len - @length)