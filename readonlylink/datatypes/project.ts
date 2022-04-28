import ty, { Schema } from "@xieyuheng/ty"

export type FileEntry = {
  path: string
  size: number
  lastModified: number
}

export type ProjectData = {
  name: string
  allFileEntries: Array<FileEntry>
  allDirectories: Array<string>
  configs: Array<{
    kind: string
    file: string
    config: any
  }>
}

export const ProjectSchema: Schema<ProjectData> = ty.object({
  name: ty.string(),
  allFileEntries: ty.array(
    ty.object({
      path: ty.string(),
      size: ty.number(),
      lastModified: ty.number(),
    })
  ),
  allDirectories: ty.array(ty.string()),
  configs: ty.array(
    ty.object({
      kind: ty.string(),
      file: ty.string(),
      config: ty.any(),
    })
  ),
})
