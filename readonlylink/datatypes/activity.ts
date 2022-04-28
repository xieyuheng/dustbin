import ty, { Schema } from "@xieyuheng/ty"

export type ActivityData = {
  name: string
  username: string
  content: string
  created_at: Date
  updated_at?: Date
}

export const ActivitySchema: Schema<ActivityData> = ty.object({
  name: ty.string(),
  username: ty.string(),
  content: ty.string(),
  created_at: ty.instanceof(Date),
  updated_at: ty.optional(ty.instanceof(Date)),
})
