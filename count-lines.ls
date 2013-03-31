require! <[glob fs]>

read = -> fs.readFileSync it, \utf8
len = -> read(it)split(\\n)length

lines = 0
lines += len "metadata.js"
lines += len "Slakefile"

err, files <- glob "src/**/*.*" {}
throw err if err?

for file in files
	lines += len file

err, files <- glob "lib/**/*.*" {}
throw err if err?

for file in files when not file.indexOf "node_modules"
	lines += len file

console.log "There's currently #lines lines"