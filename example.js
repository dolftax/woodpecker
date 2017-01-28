let woodpecker = require('./woodpecker')
let http = require('http')
let cluster = require('cluster')

// Woodpecker config
let config = {
  app: {
    port: 8080
  },
  woodpecker: {
    // 3 GB / 10 (Number of workers + master) in bytes
    maxRssSize: 322122547,
    refreshInterval: 1000
  }
}

let entry = function () {
  http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.write(JSON.stringify({message: `I\'m from worker ${cluster.worker.id}`}))
    response.end()
  }).listen(config.app.port)
}

woodpecker.init(entry, config.woodpecker)
