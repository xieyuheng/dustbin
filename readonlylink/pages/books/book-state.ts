import { History } from "../../models/history"
import { Project, ProjectPaginator } from "../../models/project"

export class BookState {
  project: Project
  text?: string
  paginator?: ProjectPaginator

  constructor(opts: { project: Project; paginator?: ProjectPaginator }) {
    this.project = opts.project
    this.paginator = opts.paginator
    this.text = opts.paginator?.text
  }

  async saveHistory(): Promise<void> {
    if (this.paginator === undefined) return

    const history = await History.load()
    await history.prepend({
      kind: "Book",
      link: this.project.link,
      attributes: {
        ...(this.project.link.path.endsWith(".md") &&
          this.paginator.document.attributes),
        title: this.project.config.title,
        subtitle: this.paginator.title,
      },
    })
  }
}
