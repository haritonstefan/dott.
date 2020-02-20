# Dott challenge

The challenge was to find the closest white pixel (marked with 1) in a bitmap for each black pixel (marked with 0).

There are 2 algorithms implemented to solve this challenge:
* Simple iteration over each points, with subsequent iteration of the "whites" points in order to compute the shortest distance
* An approach based on BFS

The project has 2 entry points:
* `npm run start` Will pop-up a prompt with questions about the test input, and the will use the BFS based algorithm
* `npm run start:random <n> <m>` Will generate a random bitmap, of size `n*m` and will attempt it to solve using both methods 
and compare their results and execution time.

Additionally there are unit tests written closing to 100% coverage.
