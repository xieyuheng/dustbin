<template>
  <div class="px-4 py-6">
    <h1>dexie demo</h1>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import { DemoDb } from "./dexie-demo-db"

@Component({
  name: "dexie",
})
export default class extends Vue {
  db = new DemoDb()

  async mounted(): Promise<void> {
    {
      const id = await this.db.friends.put({ name: "Nicolas", age: 8 })
      console.log(id, await this.db.friends.get(id))
    }

    {
      const id = await this.db.friends.put({
        name: "Xie",
        age: 29,
        hobby: "Math",
      })
      console.log(id, await this.db.friends.get(id))
    }

    {
      const friends = await this.db.friends.where("age").above(0).toArray()
      console.log(friends)
    }

    {
      const friends = await this.db.friends.where("age").above(0).toArray()
      console.log(friends)
    }

    {
      const friends = await this.db.friends
        .filter((friend) => friend.name === "Xie")
        .toArray()
      console.log(friends)
    }
  }
}
</script>
