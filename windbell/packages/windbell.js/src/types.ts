export type ViewMode = "split" | "edit" | "preview"

export type SignKind = "user" | "assistant" | "tool" | "file" | "approval"

export type SignState = "pending" | "approved" | "rejected"

export type Sign = {
  id: string
  kind: SignKind
  title: string
  body?: string
  time: string
  meta?: string
  tool?: string
  diff?: string
  state?: SignState
}

export type FileEntry = {
  name: string
  path: string
  type: "file" | "directory"
  depth: number
}
