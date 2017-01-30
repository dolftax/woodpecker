# woodpecker :deciduous_tree: :baby_chick:

Woodpecker is a  Worker manager.

> Note: This is an experiment. Use in production, at your own risk.

## What?

Woodpecker forks a number of defined workers (2 x num.of cores) + 1 and a master process managing them. When the resident set size increases the defined throttle (formula TBD), master removes the worker from the cluster gracefully, shuts it down, spawn a new fork, adds it back to the cluster.


## Why?

Instagram Engineering team wrote a neat article on dismissing garbage colletion in python - https://engineering.instagram.com/dismissing-python-garbage-collection-at-instagram-4dca40b29172 This experiment is to try the same by disabling GC completely and relying on the above defined architecture to run the application.

## Benchmarks

#### Woodpecker run

maxRssSize: 307200,
stats: {
  statuses: { '200': 10000 },
  min: 255,
  max: 1297,
  avg: 424.2977999999997,
  count: 10000,
  rate: 9.421882699444769,
  start: 1485696911427,
  total_time: 1061359
 }

#### With GC run
