import ty, { Schema } from "@xieyuheng/ty"

export type AccessTokenData = {
  name: string
  token: string
  abilities: string | null
  last_used_at: string | null
  created_at: string
  updated_at: string
}

export const AccessTokenSchema: Schema<AccessTokenData> = ty.object({
  name: ty.string(),
  token: ty.string(),
  abilities: ty.maybe(ty.string()),
  last_used_at: ty.maybe(ty.string()),
  created_at: ty.string(),
  updated_at: ty.string(),
})
