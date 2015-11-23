// Core modules
var sh = require('shelljs')

// Get command line args
var arg = process.argv.slice(2)

// HTTP Server
if(arg[0] == 'server') {
  if(arg[1] == 'src' || arg[1] === undefined) {
    sh.echo('Launching app server')
    sh.exec('http-server src -a localhost -p 8551 -c-1')
  }
  else if(arg[1] == 'build') {
    sh.echo('Launching build server')
    sh.exec('http-server build -a localhost -p 8551 -c-1')
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
// S3 Sync
else if(arg[0] == 'sync') {
  if(arg[1] === undefined) {
    sh.echo('Syncing to S3 bucket')
    sh.exec('aws s3 sync build/ s3://toshl/')
  }
  else if(arg[1] == 'dry') {
    sh.echo('Syncing to S3 bucket --dryrun')
    sh.exec('aws s3 sync build/ s3://toshl/ --dryrun')
  }
}
// Invalid
else {
  console.log('invalid operation %s', arg[0])
}
