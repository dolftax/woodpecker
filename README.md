# woodpecker :deciduous_tree: :baby_chick:

> Note: This is a weekend experiment project. Use in production, at your own risk.

## What?

Woodpecker forks a number of defined workers (2 x num.of cores) + 1 and a master process managing them. When the resident set size increases the defined throttle, master removes the worker from the cluster gracefully, shuts it down, spawn a new fork, adds it back to the cluster.


## Why?

Instagram Engineering team wrote a neat article on dismissing garbage colletion in python - https://engineering.instagram.com/dismissing-python-garbage-collection-at-instagram-4dca40b29172 This experiment is to try the same by disabling GC (https://github.com/nodejs/help/issues/462) and relying on the above defined pattern to run the application.

## Benchmarks

#### System Information

- Concurrency: 4
- Number of requests: 100000
- Number of cores: 4 vCPUs per VM
- RAM: 3.6 GB per VM
- Allocating 55150 bytes / 0.4412 MB per request
- RSS throttle size: 80000 bytes / 0.64 per worker

> Note: Web server and stress test script were run on different machines (Google Cloud / Virtual)

#### Default GC config

- Statuses: { '200': 100000 }
- Minimum time to respond: 1ms
- Maximum time to respond: 1942ms
- Average time to respond: 5.5311600000000025ms
- Rate: 612.8089323029973
- Total time: 163183ms

###### Process watch

[![asciicast](https://asciinema.org/a/5cjsd6myj8g0fgyq8cgbz80ta.png)](https://asciinema.org/a/5cjsd6myj8g0fgyq8cgbz80ta)

#### Without Mark Sweep

- Statuses: {'200': 100000 }
- Minimum time to respond: 1ms
- Maximum time to respond: 2863ms
- Average time to respond: 5.001519999999979ms
- Rate: 712.6872585771912ms
- Total time: 140314ms

##### Process Watch

 [![asciicast](https://asciinema.org/a/531whaoe5ctudx0jd1rw0fzzh.png)](https://asciinema.org/a/531whaoe5ctudx0jd1rw0fzzh)
