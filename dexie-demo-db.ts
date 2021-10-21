import Dexie from "dexie"

export type FriendData = {
  id: number
  name: string
  age: number
  hobby?: string
}

export class DemoDb extends Dexie {
  friends: Dexie.Table<Omit<FriendData, "id">, number>

  constructor() {
    super("DemoDb")

    this.version(1).stores({
      friends: "++id, name, age",
    })

    this.version(2).stores({
      friends: "++id, name, age, hobbies",
    })

    this.version(3).stores({
      friends: "++id, name, age, hobby",
    })

    this.friends = this.table("friends")
  }
}
