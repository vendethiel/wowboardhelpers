require! <[glob fs]>

read = -> fs.readFileSync it, \utf8
len = -> read(it)split(\\n)length

lines = 0
lines += len "metadata.js"
lines += len "Slakefile"

ignored = ->
	~it.indexOf "package.json"

err, files <- glob "src/**/*.*" {}
throw err if err?

for file in files
	unless ignored file
		lines += len file

err, files <- glob "lib/**/*.*" {}
throw err if err?

for file in files
	unless ignored file
		lines += len file

console.log "There's currently #lines lines => #{len "wowboardhelpers.user.js"} compiled (compiled CSS is one line)."