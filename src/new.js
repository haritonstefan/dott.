
function recurse(n, m, matrix) {
    const resultMatrix = Array.from(Array(n), () => Array.from(Array(m)))
    function compute(x, y) {
        if (
            (x < 0 || y < 0) ||
            (x >= n || y >= m)
        ) {
            return Infinity
        }
        if (resultMatrix[x][y]) {
            return resultMatrix[x][y]
        }

        if (matrix[x][y]) {
            resultMatrix[x][y] = 0;
            return 0;
        }

        const min = 1 + [
            compute(x + 1, y),
            compute(x, y + 1),
            compute(x + 1, y + 1),
        ].reduce((agg, v) => {
            return agg < v ? agg : v;
        }, Infinity);

        resultMatrix[x][y] = min;

        return min;
    }

    compute(0, 0);

    return resultMatrix;
}


const m = [
    [0, 0, 0, 1],
    [0, 0, 1, 1],
    [0, 1, 1, 0],
];

console.log(recurse(3, 4, m));
