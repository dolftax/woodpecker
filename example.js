let woodpecker = require('./woodpecker')
let http = require('http')
let cluster = require('cluster')

// Woodpecker config
let config = {
  app: {
    port: 8080
  },
  woodpecker: {
    // 3 GB / 100 (Number of workers + master) in bytes
    maxRssSize: 32212254,
    refreshInterval: 5000
  }
}

let entry = function () {
  http.createServer(function (request, response) {
    // Allocate memory x per request which is reachable by GC
    let memAlloc = []
    for (let i = 0; i < 6e6; i++) {
      memAlloc.push(new Buffer(1))
      new Buffer(Buffer.poolSize - 2)
    }

    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.write(JSON.stringify({message: `I\'m from worker ${cluster.worker.id}`}))
    response.end()
  }).listen(config.app.port)
}

woodpecker.init(entry, config.woodpecker)
