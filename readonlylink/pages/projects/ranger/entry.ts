import filesize from "filesize"

export interface EntryOption {
  path: string
  size: number
  lastModified: number
}

export abstract class Entry {
  path: string
  size: number
  lastModified: number

  abstract info: {
    content: string
    title: string
  }

  constructor(opts: EntryOption) {
    this.path = opts.path
    this.size = opts.size
    this.lastModified = opts.lastModified
  }

  isFile(): this is File {
    return this instanceof File
  }

  isDirectory(): this is Directory {
    return this instanceof Directory
  }

  is(that: Entry): boolean {
    return this.path === that.path
  }

  isChildOf(that: Directory): boolean {
    if (that.isRoot() && !(this.isDirectory() && this.isRoot())) return true
    return this.path.startsWith(that.path + "/")
  }

  get depth(): number {
    if (this.path === "") return 0
    return this.path.split("/").length
  }

  directSubName(directory: Directory): string {
    if (!this.isChildOf(directory)) {
      throw new Error(
        `The entry: ${this.path} is not a child of directory: ${directory.path}`
      )
    }

    const parts = directory.isRoot()
      ? this.path.split("/")
      : this.path.slice((directory.path + "/").length).split("/")

    return parts[parts.length - 1]
  }
}

export class File extends Entry {
  constructor(opts: EntryOption) {
    super(opts)
  }

  get info(): {
    content: string
    title: string
  } {
    const size = filesize(this.size)
    return {
      content: size,
      title: `${size} file size.`,
    }
  }
}

export class Directory extends Entry {
  length: number

  constructor(opts: EntryOption & { length: number }) {
    super(opts)

    this.length = opts.length
  }

  isRoot(): boolean {
    return this.path === ""
  }

  get info(): {
    content: string
    title: string
  } {
    return {
      content: this.length.toString(),
      title:
        this.length === 1 ? `${this.length} file.` : `${this.length} files.`,
    }
  }
}
