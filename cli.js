// Core modules
var sh = require('shelljs')

// Get command line args
var arg = process.argv.slice(2)

// Server
if(arg[0] == 'server') {
  if(arg[1] == 'app' || arg[1] === undefined) {
    sh.echo('Launching app server')
    sh.exec('http-server app -a localhost -p 1337 -c-1 -o')
  }
  else if(arg[1] == 'backend') {
    sh.echo('Launching backend server')
    sh.exec('node backend/server.js')
  }
  else if(arg[1] == 'forever') {
    sh.echo('Launching backend server forever')
    sh.exec('forever start -al toshl/forever.log backend/server.js')
  }
}
// LESS
else if(arg[0] == 'less') {
  sh.echo('Converting LESS to CSS')
  sh.exec('lessc -x app/css/style.less app/css/style.css')
}
// Invalid
else {
  console.log('invalid operation %s', arg[0])
}
