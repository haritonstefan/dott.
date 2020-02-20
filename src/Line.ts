export default class Line extends Array<number> {
  constructor(args?: Array<number>) {
    let data = args ? args : [];
    super(...data);
  }
}
