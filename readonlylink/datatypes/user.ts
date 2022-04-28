import ty, { Schema } from "@xieyuheng/ty"

export type UserData = {
  name: string
  username: string
  created_at: string
}

export const UserSchema: Schema<UserData> = ty.object({
  username: ty.string(),
  name: ty.string(),
  created_at: ty.string(),
})

export type UserWithEmail = UserData & { email: string }

export const UserWithEmailSchema: Schema<UserWithEmail> = ty.intersection(
  UserSchema,
  ty.object({ email: ty.string() })
)
