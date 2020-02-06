export
interface TreeNode {
  id: string,
  label: string,
  children?: Array <TreeNode>,
}

export
function findNodeById (
  node: TreeNode,
  id: string,
): TreeNode | null {
  if (node.id === id) {
    return node
  } else {
    if (node.children) {
      for (let child of node.children) {
        let found = findNodeById (child, id)
        if (found !== null) {
          return found
        }
      }
    }
    return null
  }
}
