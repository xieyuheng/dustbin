import axios from "axios"
import { UserData } from "../../datatypes/user"
import { ProjectData } from "../../datatypes/project"

type Statistic = {
  length: number
  size: number
  lastModified?: number
}

export class ProjectListState {
  user: UserData
  projects: Array<ProjectData & { statistic: Statistic }>

  constructor(opts: { user: UserData; projects: Array<ProjectData> }) {
    this.user = opts.user
    this.projects = opts.projects.map(enrichProject)
    this.sortProjects()
  }

  async createProject(
    name: string,
    opts: {
      template?: string
      onStart: () => void
      onFinish: () => void
      onError: (error: unknown) => void
    }
  ): Promise<void> {
    if (name.includes("/")) {
      return opts.onError(new Error("Project name should not includes '/'."))
      return
    }

    const found = this.projects.find((project) => project.name === name)
    if (found) {
      return opts.onError(new Error(`Project already exists: ${name}`))
    }

    opts.onStart()

    const url = opts.template
      ? `/projects/${this.user.username}/${name}?template=${opts.template}`
      : `/projects/${this.user.username}/${name}`

    const { data: project } = await axios.patch(url)

    this.projects.push(enrichProject(project))
    this.sortProjects()

    opts.onFinish()
  }

  async deleteProject(
    name: string,
    opts: {
      onStart: () => void
      onFinish: () => void
      onError: (error: unknown) => void
    }
  ): Promise<void> {
    if (name.includes("/")) {
      return opts.onError(new Error("Project name should not includes '/'."))
    }

    const found = this.projects.find((project) => project.name === name)
    if (found === undefined) {
      return opts.onError(new Error(`Project does not exists: ${name}`))
    }

    opts.onStart()

    const url = `/projects/${this.user.username}/${name}`

    await axios.delete(url)

    const index = this.projects.findIndex((project) => project.name === name)
    if (index > -1) {
      this.projects.splice(index, 1)
      this.sortProjects()
    }

    opts.onFinish()
  }

  sortProjects(): void {
    this.projects.sort((x, y) => {
      if (x.statistic.lastModified === undefined) {
        return -1
      }

      if (y.statistic.lastModified === undefined) {
        return 1
      }

      return x.statistic.lastModified > y.statistic.lastModified ? -1 : 1
    })
  }
}

function enrichProject(
  project: ProjectData
): ProjectData & { statistic: Statistic } {
  const length = project.allFileEntries.length
  const size = project.allFileEntries.reduce((sum, { size }) => sum + size, 0)

  const lastModified =
    project.allFileEntries.length > 0
      ? 1000 *
        Math.max(
          ...project.allFileEntries.map(({ lastModified }) => lastModified)
        )
      : undefined

  return {
    ...project,
    statistic: {
      length,
      size,
      lastModified,
    },
  }
}
