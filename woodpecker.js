const cluster = require('cluster')
const numCPUs = require('os').cpus().length
const execSync = require('child_process').execSync

let woodpecker = {}

// `entry` should be a fuction which will be executed across
// master and workers
woodpecker.init = (entry, config) => {
  if (cluster.isMaster) {
    // If process is master, fork (2 x numCPUs) + 1 workers
    let numWorkers = (2 * numCPUs) + 1
    for (let i = 0; i < numWorkers; i++) {
      cluster.fork()
    }
    console.log(`${numWorkers} workers forked/spawned`)

    // Monitor the workers every 5000 ms
    setInterval(() => {
      for (const id in cluster.workers) {
        woodpecker.monitor(cluster.workers[id], config)
      }
    }, config.refreshInterval)
  } else {
    // Invoke entry function on all workers
    entry()
  }
}

// Fork a new worker
woodpecker.fork = () => {
  console.log('Fork/Spawn -ing a new worker')
  cluster.fork()
}

// Monitor function watches for RSS size
woodpecker.monitor = (worker, config) => {
  // There is no direct implementation to get memoryUsage of a worker process
  // Read more here - https://github.com/nodejs/help/issues/469
  let currentRss = execSync(`awk '/Rss:/{ sum += $2 } END { print sum }' /proc/${worker.process.pid}/smaps`).toString().trim()

  // Check if process RSS is more than defined max value (in bytes)
  if (currentRss >= config.maxRssSize) {
    // Gracefully disconnect the worker from master
    worker.disconnect()

    // Force kill the worker after 4000 ms if not disconnected
    setTimeout(() => {
      worker.kill('SIGTERM')
      console.log(`Worker ${worker.id} killed | RSS ${currentRss}`)
    }, 4000)

    // If worker disconnects graccefully, clear the `force kill` timeout
    worker.on('disconnect', () => {
      woodpecker.fork()
      console.log(`Worker ${worker.id} disconnected | RSS ${currentRss}`)
    })
  }
}

module.exports = woodpecker
