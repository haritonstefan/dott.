function print(m) {
    for (let v of m) {
        console.log(v.join(' '));
    }
}

function recurse(n, m, matrix) {
    const resultMatrix = Array.from(Array(n), () => Array.from(Array(m).fill(-1)));
    function compute(x, y, q = Infinity) {
        if (
            (x < 0 || y < 0) ||
            (x >= n || y >= m)
        ) {
            return Infinity
        }

        if (resultMatrix[x][y] > -1) {
            console.log('cache');
            return resultMatrix[x][y];
        }

        if (matrix[x][y] === 1) {
            resultMatrix[x][y] = 0;
            q = 0;
        }

        if (x === n - 1 && y === m -1) {
            resultMatrix[x][y] = q;
            return q;
        }

        const min = (q === 0 ? 0 : 1) + [
            q,
            compute(x + 1, y, q + 1),
            compute(x, y + 1, q + 1),
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

print(recurse(3, 4, m));

module.exports = {
    recurse,
    print
}
