export class Repr<A> {
  repr: (x: A) => string

  constructor(the: {
    repr: (x: A) => string,
  }) {
    this.repr = the.repr
  }
}
