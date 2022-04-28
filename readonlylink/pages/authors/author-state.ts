import { UserData } from "../../datatypes/user"
import { ProjectData } from "../../datatypes/project"
import { AuthorConfig, AuthorConfigSchema } from "../../datatypes/author-config"
import { Nodes } from "@xieyuheng/postmark"
import { Link } from "../../models/link"
import { useExtensionStore } from "../../composables/extension-store"

export class AuthorState {
  constructor(
    public user: UserData,
    public project: ProjectData,
    public tabName: string | null,
    public indexFile: string,
    public tabFiles: Record<string, string>
  ) {
  }

  get authorConfig(): AuthorConfig {
    const entry = this.project.configs.find(
      (entry) => entry.file === "author.json"
    )

    if (entry === undefined) {
      throw new Error("Can not find author.json")
    }

    return AuthorConfigSchema.validate(entry.config)
  }

  get link(): Link {
    return new Link({
      username: this.user.username,
      project: this.user.username,
    })
  }

  get text(): string {
    if (!this.tabName) return this.indexFile

    const text = this.tabFiles[this.tabName]
    if (text === undefined) {
      throw new Error(`Can not find text for tab: ${this.tabName}`)
    }

    return text
  }

  get document(): Nodes.Document {
    return useExtensionStore().parser.parseDocument(this.text)
  }
}
