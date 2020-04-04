export
interface File {
  id: string,
  isDir: boolean,
  name: string,
  parentId?: string,
  content: string,
}

export
interface TreeNode {
  id: string,
  name: string,
  children?: Array <TreeNode>,
  content: string,
}

export
function createTreeFromArray (
  files: Array <File>,
): TreeNode {
  for (let file of files) {
    if (file.parentId === undefined) {
      return createTreeFromArrayWithParent (file, files)
    }
  }
  throw new Error ("no root")
}

export
function createTreeFromArrayWithParent (
  parent: File,
  files: Array <File>,
): TreeNode {
  return parent.isDir
    ? {
      id: parent.id,
      name: parent.name,
      children: files
        .filter (file => file.parentId === parent.id)
        .map (file => createTreeFromArrayWithParent (file, files)),
      content: parent.content,
    }
    : {
      id: parent.id,
      name: parent.name,
      content: parent.content,
    }
}
