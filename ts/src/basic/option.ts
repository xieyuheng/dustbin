export abstract class Option<T> {
  bind<X>(
    f:(x: T) => Option<X>,
  ): Option<X> {
    if (this instanceof Some) {
      return f(this.value)
    } else if (this instanceof None) {
      return new None<X>()
    } else {
      throw new Error(
        `unknown sub class: ${this.constructor.name}`
      )
    }
  }

  static none<X>(): Option<X> {
    return new None()
  }

  static some<X>(value: X): Option<X> {
    return new Some(value)
  }

  unwrap(): T {
    if (this instanceof Some) {
      return this.value
    } else if (this instanceof None) {
      throw new Error(
        `unwrap a None`
      )
    } else {
      throw new Error(
        `unknown sub class: ${this.constructor.name}`
      )
    }
  }

  unwrap_or_throw(error: Error): T {
    if (this instanceof Some) {
      return this.value
    } else if (this instanceof None) {
      throw error
    } else {
      throw new Error(
        `unknown sub class: ${this.constructor.name}`
      )
    }
  }

  none_or_throw(error: Error): void {
    if (this instanceof None) {
    } else if (this instanceof Some) {
      throw error
    } else {
      throw new Error(
        `unknown sub class: ${this.constructor.name}`
      )
    }
  }

  match<X, Y>(
    { some, none }: { some:(value: T) => X, none:() => Y }
  ): X | Y {
    if (this instanceof Some) {
      return some(this.value)
    } else if (this instanceof None) {
      return none()
    } else {
      throw new Error(
        `unknown sub class: ${this.constructor.name}`
      )
    }
  }
}

export class Some<T> extends Option<T> {
  value: T

  constructor(value: T) {
    super()
    this.value = value
  }
}

export class None<T> extends Option<T> {
  constructor() {
    super()
  }
}
