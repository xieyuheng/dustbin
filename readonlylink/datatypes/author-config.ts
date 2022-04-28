import ty, { Schema } from "@xieyuheng/ty"

export type AuthorConfig = {
  index: string
  tabs: Record<string, string>
}

export const AuthorConfigSchema: Schema<AuthorConfig> = ty.object({
  index: ty.string(),
  tabs: ty.dict(ty.string()),
})
