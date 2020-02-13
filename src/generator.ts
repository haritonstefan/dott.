export default function generator(n = 182, m = 182): Array<Array<number>> {
    return Array.apply(null, new Array(n)).map(() => {
        return Array.apply(null, new Array(m)).map(() => {
            return Math.round(Math.random() - 0.3);
        })
    });
}
