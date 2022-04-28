import { ProjectData } from "../../datatypes/project"
import { UserData } from "../../datatypes/user"
import { Ranger } from "./ranger"

export class ProjectState {
  user: UserData
  project: ProjectData
  ranger: Ranger

  constructor(opts: { user: UserData; project: ProjectData }) {
    this.user = opts.user
    this.project = opts.project
    this.ranger = new Ranger({
      user: this.user,
      project: this.project,
    })
  }
}
