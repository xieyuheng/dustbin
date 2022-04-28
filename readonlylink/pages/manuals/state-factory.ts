import { FileStoreFactory } from "../../models/file-store"
import { Link } from "../../models/link"
import { Content, ProjectFactory, ProjectPaginator } from "../../models/project"
import { comparePath } from "../../ut/compare-path"
import { ManualState } from "./manual-state"

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

  create(link: Link, payload: Payload): ManualState {
    const { text } = payload

    const project = this.projectFactory.create(link, payload)
    const sections = createSections(project.contents, project.config)
    project.contents = Object.values(sections).flatMap((contents) => contents)

    return new ManualState({
      project,
      sections,
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

  async build(link: Link): Promise<ManualState> {
    const project = await this.projectFactory.build(link, "manual.json")
    const sections = createSections(project.contents, project.config)
    project.contents = Object.values(sections).flatMap((contents) => contents)

    const files = new FileStoreFactory().createFromLink(link.root())
    const text = await files.cd(project.config.src).get(link.path)

    return new ManualState({
      project,
      sections,
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

  updateLink(state: ManualState, link: Link): void {
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

function createSections(
  contents: Array<Content>,
  config: Record<string, any>
): Record<string, Array<Content>> {
  let sections: Record<string, Array<Content>> = {}

  for (const { link, attributes } of contents) {
    const name = attributes.section || "default"
    const entries = sections[name]
    const entry = { link, attributes }

    if (entries) {
      entries.unshift(entry)
    } else {
      sections[name] = [entry]
    }
  }

  const prescribed: Record<string, Array<Content>> = {}

  if (config.sections instanceof Array) {
    for (const name of config.sections) {
      if (sections[name]) {
        prescribed[name] = sections[name]
        delete sections[name]
      } else {
        prescribed[name] = []
      }
    }
  }

  sections = { ...prescribed, ...sections }

  for (const entries of Object.values(sections)) {
    entries.sort((left, right) => comparePath(left.link.path, right.link.path))
  }

  return sections
}
