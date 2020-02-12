function whites(g) {
    return g.reduce((vectorAgg, vector, i) => {
        vectorAgg.push(...(
            vector.reduce((pointAgg, point, j) => {
                if (point) {
                    pointAgg.push([i, j]);
                }
                return pointAgg;
            }, [])
        ))
        return vectorAgg;
    }, [])
}

function whites3(g) {
    let whites = [];
    let n = g.length;
    let m = g[0].length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (g[i][j]) {
                whites.push([i, j])
            }
        }
    }
    return whites;
}

function sorter(g) {
    return g.reduce((vectorAgg, vector, i) => {
        vector.reduce((agg, point, j) => {
            vectorAgg[point].push([i, j]);
        })
        return vectorAgg;
    }, [[], []])
}

function distance(a, b) {
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1])
}

function inline(matrix) {
    const whiteSpots = whites(matrix);
    for (let i = 0; i < matrix.length; i++) {
        let line = [];
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j]) {
                line.push(0);
            } else {
                line.push(whiteSpots.reduce((agg, white) => {
                    let dist = distance([i, j], white)
                    return agg < dist ? agg : dist;
                }, Infinity))
            }
        }
        // console.log(line.join(' '));
    }
}

function recurse(n, m, matrix) {
    const matrix2 = Array.from(Array(n), () => Array.from(Array(m)));
    const cache = {};
    function closest(p = [0, 0]) {
        const x = p[0];
        const y = p[1];
        const cacheKey = `${x}:${y}`;
        if (cache.hasOwnProperty(cacheKey)) {
            return cache[cacheKey]
        }
        if (
            (x < 0 || y < 0) ||
            (x > n-1 || y > n-1)
        ) {
            return Infinity;
        }
        if (matrix[x][y]) {
            matrix2[x][y] = 0;
            return 0;
        }

        let min = 1 + [
            closest([x, y + 1]),
            closest([x + 1, y]),
            closest([x + 1, y + 1]),
        ].reduce((agg, v) => {
            return v < agg ? v : agg
        }, Infinity);

        matrix2[x][y] = min;

        return min
    }

    const results = closest();

    console.log(matrix2);

    return results
}

function generator(n = 182, m = 182) {
    return Array.apply(null, new Array(n)).map(() => {
        return Array.apply(null, new Array(m)).map(() => {
            return Math.round(Math.random());
        })
    })
}

// const m = generator(15, 15);
//

const m = [
    [0, 0, 0, 1],
    [0, 0, 1, 1],
    [0, 1, 1, 0]
]
recurse(3, 4, m);

module.exports = {
    whites,
    whites3,
    generator,
}
