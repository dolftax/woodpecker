# woodpecker :deciduous_tree: :baby_chick:

Woodpecker is a  Worker manager.

> Note: This is an experiment. Use in production, at your own risk.

## What?

Woodpecker forks a number of defined workers (2 x num.of cores) + 1 and a master process managing them. When the resident set size increases the defined throttle (formula TBD), master removes the worker from the cluster gracefully, shuts it down, spawn a new fork, adds it back to the cluster.


## Why?

Instagram Engineering team wrote a neat article on dismissing garbage colletion in python - https://engineering.instagram.com/dismissing-python-garbage-collection-at-instagram-4dca40b29172 This experiment is to try the same by disabling GC completely and relying on the above defined architecture to run the application.

## Benchmarks

TBD. Tentative plan is to send 10k concurrent requests to the server and see how it performs with GC enabled/disabled.
