const cluster = require('cluster')
const numCPUs = require('os').cpus().length

let woodpecker = {}

// `entry` should be a fuction which will be executed across
// master and workers
woodpecker.init = (entry, config) => {
  // If process is master, fork (2 x numCPUs) + 1 workers
  if (cluster.isMaster) {
    for (let i = 0; i < ((2 * numCPUs) + 1); i++) {
      cluster.fork()
    }
  } else {
    // Invoke entry function on all workers
    entry()
  }

  setInterval(() => {
    woodpecker.monitor()
  }, 5000)
}

// Monitor function watches for RSS size
woodpecker.monitor = () => {
  if (!cluster.Master) {
    console.log(cluster.worker)
  }
}

module.exports = woodpecker
