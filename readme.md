# Dott challenge

The challenge was to find the closest white pixel in a bitmap for each black pixel.
The current implementation is a naive, sub-optimal, brute-force implementation which is comprised of 2 steps:

1. Filter out the white pixels.
2. Find the closest out of the array extracted in p1.

The index file generates an 182 by 182 matrix, then runs the above algorithm to find the distances.

This would've been implemented better using Dijkstra or Floyd-Warshall algorithms, but there is a long time since I've implemented either, and I wasn't able to quickly clean the dust from that knowledge.