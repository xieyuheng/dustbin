import { FileStore } from "../file-store"
import * as FileStores from "../file-stores"
import { Link } from "../link"

type GitHubConfig = { cdn?: "jsdelivr" }

const defaultGitHubConfig = {} as const

export class FileStoreFactory {
  github: GitHubConfig

  constructor(opts?: { github?: GitHubConfig }) {
    this.github = opts?.github || defaultGitHubConfig
  }

  createFromLink(link: Link): FileStore {
    const { host, username, project, name, path: dir } = link

    if (host === "github.com" && this.github.cdn === "jsdelivr") {
      return new FileStores.JsdelivrGitHubFileStore(link)
    }

    switch (host) {
      case undefined:
        return new FileStores.MainFileStore(link)
      case "github.com":
        return new FileStores.GitHubFileStore(name, { dir })
      case "gitlab.com":
        return new FileStores.GitLabFileStore(name, { dir })
      case "gitee.com":
        return new FileStores.GiteeFileStore(name, { dir })
      default:
        throw new Error(`Unknown host: ${host}`)
    }
  }
}
