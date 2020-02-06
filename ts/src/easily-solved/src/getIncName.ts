import * as ut from "./util"

export
interface TreeNode {
  id: string,
  type: string,
  name: string,
  children?: Array <TreeNode>,
}

export
function leastComplementNumber (
  numbers: Array <number>,
): number {
  let sorted = Array.from (numbers)
    .sort ((x, y) => x - y)
  if (sorted.length === 0) {
    return 0
  }
  if (sorted [0] > 0) {
    return 0
  }
  for (let i of ut.range (0, sorted.length - 1)) {
    if (sorted [i+1] - sorted [i] > 1) {
      return sorted [i] + 1
    }
  }
  return sorted [sorted.length - 1] + 1
}

/** side-effect on `numbers` */
function collectNumbers (
  name: string,
  node : TreeNode,
  numbers: Array <number>,
) {
  if (node.name.startsWith (name)) {
    let words = node.name.split ("_")
    if (words.length === 1) {
      numbers.push (0)
    } else {
      let postfix = words [words.length - 1]
      let n = Number (postfix)
      if (Number.isNaN (n)) {
        throw new Error (`postfix: ${postfix} is not a number`)
      } else {
        numbers.push (n)
      }
    }
  }
  if (node.children) {
    for (let child of node.children) {
      collectNumbers (name, child, numbers)
    }
  }
}

export
function getIncName (
  name: string,
  node : TreeNode,
): string {
  let numbers = new Array ()
  collectNumbers (name, node, numbers)
  let least = leastComplementNumber (numbers)
  if (least === 0) {
    return name
  } else {
    return name + "_" + least
  }
}
