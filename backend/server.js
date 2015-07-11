// Core modules
var http = require('http')
var https = require('https')
var url = require('url')
var querystring = require('querystring')

// App modules
var config = require('./config')
// util = require('./util')

// Create a server
http.createServer(function(req, res) {



  function response(res, output, content_type, status) {
    // Log the request
    console.log(status + ' ' + req.method + ' ' + req.url)

    // Write the headers
    res.writeHead(status =  status || 200, {
      'Content-Type': content_type || 'text/json',
      'Access-Control-Allow-Origin': '*'
    })

    // Send the result with output
    res.end(output)
  }

  // Parse the url to get query strings
  request = url.parse(req.url, true)

  if(request.pathname == '/token' && request.query.code) {
    output = 'Hello world'

    // Post Data
    var data = querystring.stringify({
      client_id: config.client_id,
      code: request.query.code,
      grant_type: 'authorization_code'
    })

    // Setup post request
    toshlReq = https.request({
      hostname: 'toshl.com',
      // port: 443,
      path: '/oauth2/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': data.length
      }
    }, function(toshlRes) {
      // If successful
      console.log('Response from Toshl: ' + toshlRes.statusCode)
      toshlRes.setEncoding('utf8')
      toshlRes.on('data', function(d) {

        // Redirect back to app
        redirectTo = config.app_url + '/#/auth/?' + querystring.stringify(JSON.parse(d))
        console.log(redirectTo)
        res.writeHead(302, {
          'Location': redirectTo
          //add other headers here...
        })
        res.end()
        // return response(res, d, toshlRes.statusCode, 'text/json')
      })

    })

    // On error
    toshlReq.on('error', function(e) {
      console.log('problem with request: ' + e.message)
      console.error(e)
    })

    toshlReq.write(data)
    toshlReq.end()


  }
  else if(request.pathname == '/token') {
    return response(res, 'Expecting a `code` query string', 'text/html', 404)
  }
  else {
    return response(res, '404 Page Not Found', 'text/html', 404)
  }

}).listen(config.server_port, config.server_address)

console.log('Server running at http://%s:%s/', config.server_address, config.server_port)
console.log('Close with CTRL + C')
