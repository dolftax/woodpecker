let woodpecker = require('./woodpecker')
let http = require('http')

// Woodpecker config
let config = {
  app: {
    port: 8080
  },
  woodpecker: {
    refreshInterval: 1000
  }
}

let entry = function () {
  http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'})
    response.end('Tuk tuk\n')
  }).listen(config.app.port)
}

woodpecker.init(entry)
