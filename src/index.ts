type Tuple = [number, number]
type M = Array<Array<number>>

class Matrix extends Array<Array<number>> {
    // private readonly matrix: M;
    // private _whites: Tuple;
    constructor(data: M) {
        super(...data);
        return this;
    }

}

const m = new Matrix([[1, 2], [3, 4]]);
console.log(m);
