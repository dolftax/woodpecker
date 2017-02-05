let woodpecker = require('./woodpecker')
let http = require('http')
let cluster = require('cluster')

// Woodpecker config
let config = {
  app: {
    port: 8080
  },
  woodpecker: {
    maxRssSize: 80000,
    refreshInterval: 5000
  }
}

let entry = function () {
  http.createServer(function (request, response) {
    // Allocate 55150 bytes per request (Reachable by GC)
    let memAlloc = []
    for (let i = 0; i < 6e3; i++) {
      memAlloc.push(new Buffer(1))
    }

    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.write(JSON.stringify({message: `I\'m from worker ${cluster.worker.id}`}))
    response.end()
  }).listen(config.app.port)
}

woodpecker.init(entry, config.woodpecker)
