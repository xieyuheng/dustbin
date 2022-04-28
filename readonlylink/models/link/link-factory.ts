import { Link } from "../../models/link"
import { FileStoreFactory } from "../../models/file-store"
import { RenderKind, renderKindFromPrefix } from "../../models/render-kind"
import { useExtensionStore } from "../../composables/extension-store"

export class LinkFactory {
  async createFromPathname(pathname: string): Promise<{
    link: Link
    kind: RenderKind
    src?: string
    attributes: Record<string, any>
  }> {
    const [username_and_project, path] = pathname.slice(1).split("/-/")
    const [prefix, username, project] = username_and_project.split("/")
    const link = new Link({ username, project: project ?? username, path })
    const kind = renderKindFromPrefix(prefix)

    let src = undefined
    let attributes: Record<string, any> = {}

    const files = new FileStoreFactory().createFromLink(link.root())

    switch (kind) {
      case "Article": {
        const text = await files.get(link.path)
        if (text) {
          const document = useExtensionStore().parser.parseDocument(text)
          attributes = document.attributes
        }
      }

      case "Book": {
        const config = await files.get("book.json")
        if (config) {
          attributes = JSON.parse(config)
          src = attributes["src"]
        }
      }

      case "Manual": {
        const config = await files.get("manual.json")
        if (config) {
          attributes = JSON.parse(config)
          src = attributes["src"]
        }
      }
    }

    return { link, kind, src, attributes }
  }

  createFromHostURL(url: URL): Link {
    const { host, pathname } = url

    const middle = pathname.includes("/-/")
      ? "/-/tree/master/" // NOTE for gitlab
      : "/tree/master/" // NOTE for gihub and some version of gitlab

    const [username_and_project, path] = pathname
      .slice(1)
      .replace("/blob/master/", "/tree/master/")
      .split(middle)

    const [username, project] = username_and_project.split("/")

    return new Link({ host, username, project, path })
  }

  formatHostURL(link: Link): string {
    if (link.host === undefined) {
      const { name, version, path } = link
      const tag = version || "master"
      return path ? `/projects/${name}/-/${path}` : `/projects/${name}`
    }

    switch (link.host) {
      case "github.com": {
        const { name, version, path } = link
        const tag = version || "master"
        return `https://github.com/${name}/tree/${tag}/${path}`
      }

      case "gitee.com": {
        const { name, version, path } = link
        const tag = version || "master"
        return `https://gitee.com/${name}/tree/${tag}/${path}`
      }

      case "gitlab.com": {
        const { name, version, path } = link
        const tag = version || "master"
        return `https://gitlab.com/${name}/-/tree/${tag}/${path}`
      }

      default: {
        throw new Error(`Unknown host: ${link.host}`)
      }
    }
  }
}
