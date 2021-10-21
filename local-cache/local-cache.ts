import Dexie from "dexie"
import { Types } from "@forchange/sisuo-models"
import { Models } from "@forchange/sisuo-models"

type SessionData = {
  id: string
  created_at: number
  data: Models.SessionJson
}

export class LocalCache extends Dexie {
  sessions: Dexie.Table<SessionData, string>
  users: Dexie.Table<Types.User, string>
  items: Dexie.Table<Types.Item, string>

  constructor() {
    super("LocalCache")

    this.version(3).stores({
      sessions: "id, created_at",
      users: "id, email, created_at",
      items: "id, kind, created_at, user_id",
    })

    this.sessions = this.table("sessions")
    this.users = this.table("users")
    this.items = this.table("items")
  }

  async prepareSession(session: Models.Session): Promise<void> {
    const found = await this.sessions.get(session.id)

    if (!found) {
      await this.sessions.put({
        id: session.id,
        created_at: Date.now(),
        data: session.json(),
      })
    }

    console.log({
      message: "LocalCache.prepareSession",
      mode: found ? "found" : "create",
      id: session.id,
    })
  }
}
