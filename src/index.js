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

function whites2(g) {
    let whites = [];
    let i = 0;
    let j = 0;
    for (let v of g) {
        for (let p of v) {
            if (p) {
                whites.push([i, j]);
            };
            j++;
        }
        i++;
    }

    return whites
}

function whites3(g) {
    let whites = [];
    let n = g.length;
    let m = g[0].length;
    for (let i = 0; i < n; i++) {
        for (j = 0; j < m; j++) {
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

function generator(n = 182, m = 182) {
    return Array.apply(null, new Array(n)).map(() => {
        return Array.apply(null, new Array(m)).map(() => {
            return Math.round(Math.random());
        })
    })
}

console.log(generator(10, 10))

module.exports = {
    whites,
    whites2,
    whites3,
    generator,
}