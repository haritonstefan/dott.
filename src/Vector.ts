export default class Vector extends Array<number> {
    constructor(args: Array<number>) {
        super(...args);
    }

    public min(): number {
        return this.reduce((foundMin: number, value: number) => {
            return foundMin < value ? foundMin : value
        }, Infinity)
    }
}
