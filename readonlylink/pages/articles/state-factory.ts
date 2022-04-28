import { FileStoreFactory } from "../../models/file-store"
import { Link } from "../../models/link"
import { ArticleState } from "./article-state"
import { DirectoryState } from "./directory-state"

type State = ArticleState | DirectoryState

type Payload =
  | { kind: "Article"; text: string }
  | { kind: "Directory"; rootPaths: Array<string> }

export class StateFactory {
  create(link: Link, payload: Payload): State {
    switch (payload.kind) {
      case "Article":
        return new ArticleState({ link, ...payload })
      case "Directory":
        return new DirectoryState({ link, ...payload })
    }
  }

  async build(link: Link): Promise<State> {
    const files = new FileStoreFactory().createFromLink(link.root())

    const text = await files.get(link.path)
    if (text !== undefined) {
      return new ArticleState({ link, text })
    } else {
      return new DirectoryState({ link, rootPaths: await files.keys() })
    }
  }
}
