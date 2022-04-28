import { Link } from "../../../models/link"
import { FileStore } from "../../file-store"
import { config } from "../../../config"

export class MainFileStore extends FileStore {
  link: Link

  constructor(link: Link) {
    super()
    this.link = link
  }

  cd(path: string): MainFileStore {
    return new MainFileStore(this.link.resolve(path))
  }

  url(endpoint: string): string {
    return config.base_url + endpoint
  }

  async keys(): Promise<Array<string>> {
    const endpoint = this.link.root().format()

    const response = await fetch(this.url("/directories/" + endpoint))

    if (!response.ok) throw new Error(response.statusText)

    const paths: Array<string> = await response.json()

    if (!this.link.path) {
      return paths
    }

    const prefix = this.link.path + "/"

    return paths
      .filter((path) => path.startsWith(prefix))
      .map((path: string) => path.slice(prefix.length))
  }

  async getOrFail(path: string): Promise<string> {
    const endpoint = this.link.path
      ? this.link.format() + "/" + path
      : this.link.format() + "/-/" + path

    const response = await fetch(this.url("/files/" + endpoint))

    if (!response.ok) throw new Error(response.statusText)

    return await response.text()
  }
}
