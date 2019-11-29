export
type adder_t = (x: number) => number

export
function add (
  a: number,
  b?: number,
): number | adder_t {
  if (b) {
    return a + b
  } else {
    return x => a + x
  }
}
