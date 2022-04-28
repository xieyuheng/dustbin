import { FileStoreFactory } from "../../models/file-store"
import { Link } from "../../models/link"
import { useExtensionStore } from "../../composables/extension-store"
import { Project, Content } from "../project"

export type Payload = {
  config: Record<string, any>
  contents: Array<{
    path: string
    attributes: Record<string, string>
  }>
}

export class ProjectFactory {
  cachedTexts?: Record<string, string>

  create(link: Link, payload: Payload): Project {
    return new Project({
      link,
      config: payload.config,
      contents: payload.contents.map(({ path, attributes }) => ({
        link: link.root().resolve(path),
        attributes,
      })),
    })
  }

  async build(link: Link, configFile: string): Promise<Project> {
    const files = new FileStoreFactory().createFromLink(link.root())
    const config = JSON.parse(await files.getOrFail(configFile))
    const texts = await files.cd(config.src).all()

    this.cachedTexts = texts

    return new Project({
      link,
      config,
      contents: buildContentsFromTexts(link, texts),
    })
  }
}

function buildContentsFromTexts(
  link: Link,
  texts: Record<string, string>
): Array<Content> {
  const contents: Array<Content> = []
  // NOTE We only take `.md` documents that have a title.
  for (const [path, text] of Object.entries(texts)) {
    if (path.endsWith(".md")) {
      const document = useExtensionStore().parser.parseDocument(text)
      if (document.attributes.title) {
        contents.push({
          link: link.root().resolve(path),
          attributes: document.attributes,
        })
      }
    }
  }

  return contents
}
