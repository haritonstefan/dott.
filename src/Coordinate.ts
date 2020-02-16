export default class Coordinate extends Array {
    public readonly x: number;
    public readonly y: number;
    constructor(x: number, y: number) {
        super(...[x,y]);
        this.x = x;
        this.y = y;
    }

    static distance(a: Coordinate, b: Coordinate): number {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }

    log() {
        console.log(`${this.x}${this.y}`);
    }
}
