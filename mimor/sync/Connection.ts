export type ConnectionFileEntry = {
  path: string
  size: number
  updatedAt: number
  text: string
}

export type ConnectionActivity = {
  name: string
  time: number
  report?: ConnectionActivityReport
}

export type ConnectionActivityReport = {
  updatedFiles: Array<string>
  createdFiles: Array<string>
}

export type Connection = {
  handle: FileSystemDirectoryHandle
  name: string
  isDownloading?: boolean
  isUploading?: boolean
  isAutoUploadEnabled?: boolean
  fileEntries: Array<ConnectionFileEntry>
  activities: Array<ConnectionActivity>
}
