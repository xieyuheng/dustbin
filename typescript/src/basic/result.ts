export abstract class Result<T, E> {
  bind<X> (
    f: (x: T) => Result<X, E>,
  ): Result<X, E> {
    if (this instanceof Ok) {
      return f (this.value)
    } else if (this instanceof Err) {
      return new Err (this.error)
    } else {
      throw new Error (
        `unknown sub class: ${this.constructor.name}`
      )
    }
  }

  static ok<X, Y> (value: X): Result<X, Y> {
    return new Ok (value)
  }

  static err<X, Y> (error: Y): Result<X, Y> {
    return new Err (error)
  }

  unwrap (): T {
    if (this instanceof Ok) {
      return this.value
    } else if (this instanceof Err) {
      throw new Error (
        `unwrap an Err`
      )
    } else {
      throw new Error (
        `unknown sub class: ${this.constructor.name}`
      )
    }
  }

  unwrap_err (): E {
    if (this instanceof Err) {
      return this.error
    } else if (this instanceof Ok) {
      throw new Error (
        `unwrap_err an Ok`
      )
    } else {
      throw new Error (
        `unknown sub class: ${this.constructor.name}`
      )
    }
  }

  unwrap_or_throw (error: Error): T {
    if (this instanceof Ok) {
      return this.value
    } else if (this instanceof Err) {
      throw error
    } else {
      throw new Error (
        `unknown sub class: ${this.constructor.name}`
      )
    }
  }

  unwrap_err_or_throw (error: Error): E {
    if (this instanceof Err) {
      return this.error
    } else if (this instanceof Ok) {
      throw error
    } else {
      throw new Error (
        `unknown sub class: ${this.constructor.name}`
      )
    }
  }

  match<X, Y> (
    { ok, err }: { ok: (value: T) => X, err: (error: E) => Y }
  ): X | Y {
    if (this instanceof Ok) {
      return ok (this.value)
    } else if (this instanceof Err) {
      return err (this.error)
    } else {
      throw new Error (
        `unknown sub class: ${this.constructor.name}`
      )
    }
  }
}

export class Ok<T, E> extends Result<T, E> {
  value: T

  constructor (value: T) {
    super ()
    this.value = value
  }
}

export class Err<T, E> extends Result<T, E> {
  error: E

  constructor (error: E) {
    super ()
    this.error = error
  }
}
