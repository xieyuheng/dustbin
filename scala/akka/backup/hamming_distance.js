/**
 * left close, right open integer interval.
 */
function* range (lo, hi) {
  let i = lo
  while (i < hi) {
    yield i
    i += 1
  }
}

function hamming_distance (x, y) {
  if (x.length === y.length) {
    let distance = 0
    let length = x.length
    for (let i of range (0, length)) {
      if (x [i] !== y [i]) {
        distance += 1
      }
    }
    return distance
  } else {
    throw new Error (`length not equal, x.length: ${x.length}, y.length: ${y.length}`)
  }
}
