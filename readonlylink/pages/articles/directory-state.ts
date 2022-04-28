import { Link } from "../../models/link"

export class DirectoryState {
  link: Link
  rootPaths: Array<string>

  constructor(opts: { link: Link; rootPaths: Array<string> }) {
    this.link = opts.link
    this.rootPaths = opts.rootPaths
  }

  get allPaths(): Array<string> {
    if (this.link.path.length === 0) {
      return this.rootPaths
    }

    const prefix = this.link.path + "/"

    return this.rootPaths
      .filter((rootPath) => rootPath.startsWith(prefix))
      .map((rootPath) => rootPath.slice(prefix.length))
      .filter((path) => path.length > 0)
  }

  get paths(): Array<string> {
    return [...this.directories, ...this.files]
  }

  get directories(): Array<string> {
    const paths = this.allPaths
      .filter((path) => path.includes("/"))
      .map((path) => path.split("/")[0] + "/")

    return Array.from(new Set(paths))
  }

  get files(): Array<string> {
    const paths = this.allPaths.filter((path) => !path.includes("/"))

    return Array.from(new Set(paths))
  }

  get title(): string {
    return this.link.name + " | " + "/" + this.link.path
  }
}
