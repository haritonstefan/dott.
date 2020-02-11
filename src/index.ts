const raw = `
1
3 4
0 0 0 1
0 0 1 1
0 1 1 0
`

type Tuple = [number, number]
type M = Array<Array<number>>

class Matrix extends Array<Array<number>> {
    constructor(data: M) {
        super();
        this
        for(let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].length; i++) {
                this[i][j] = data[i][j];
            }
        }
    }
}

const m = new Matrix([[1, 2], [3, 4]]);
console.log(m);