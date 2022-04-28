import { FileStoreFactory } from "../../models/file-store"
import { Link } from "../../models/link"
import { comparePath } from "../../ut/compare-path"
import { ProjectFactory, ProjectPaginator } from "../../models/project"
import { BookState } from "./book-state"

export type Payload = {
  config: Record<string, any>
  contents: Array<{
    path: string
    attributes: Record<string, string>
  }>
  text?: string
}

export class StateFactory {
  projectFactory = new ProjectFactory()

  create(link: Link, payload: Payload): BookState {
    const { text } = payload

    const project = this.projectFactory.create(link, payload)

    project.contents.sort((left, right) =>
      comparePath(left.link.path, right.link.path)
    )

    return new BookState({
      project,
      paginator:
        text === undefined
          ? undefined
          : new ProjectPaginator({
              path: link.path,
              text,
              contents: project.contents,
            }),
    })
  }

  async build(link: Link): Promise<BookState> {
    const project = await this.projectFactory.build(link, "book.json")

    project.contents.sort((left, right) =>
      comparePath(left.link.path, right.link.path)
    )

    const files = new FileStoreFactory().createFromLink(link.root())
    const text = await files.cd(project.config.src).get(link.path)

    return new BookState({
      project,
      paginator:
        text === undefined
          ? undefined
          : new ProjectPaginator({
              path: link.path,
              text,
              contents: project.contents,
            }),
    })
  }

  updateLink(state: BookState, link: Link): void {
    state.project.link = link

    if (this.projectFactory.cachedTexts === undefined) {
      throw new Error("Expect cachedTexts")
    }

    if (link.path) {
      state.paginator = new ProjectPaginator({
        path: link.path,
        text: this.projectFactory.cachedTexts[link.path],
        contents: state.project.contents,
      })
    }
  }
}
