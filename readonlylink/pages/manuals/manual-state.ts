import { History } from "../../models/history"
import { Content, Project, ProjectPaginator } from "../../models/project"

export class ManualState {
  project: Project
  sections: Record<string, Array<Content>>
  paginator?: ProjectPaginator

  text?: string

  constructor(opts: {
    project: Project
    sections: Record<string, Array<Content>>
    paginator?: ProjectPaginator
  }) {
    this.project = opts.project
    this.sections = opts.sections
    this.paginator = opts.paginator

    this.text = opts.paginator?.text
  }

  get firstPath(): string {
    if (typeof this.project.config.main === "string") {
      return this.project.config.main
    }

    const firstContent = this.project.contents[0]
    if (firstContent) {
      return firstContent.link.path
    }

    throw new Error("I can not find the first path of this manual.")
  }

  async saveHistory(): Promise<void> {
    if (this.paginator === undefined) return

    const history = await History.load()
    await history.prepend({
      kind: "Manual",
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
