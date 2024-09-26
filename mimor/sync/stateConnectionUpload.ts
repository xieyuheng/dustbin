import {
  contentSourceFormat,
  contentSourceParse,
} from '../../models/content-source'
import { Connection, ConnectionFileEntry } from './Connection'
import { State } from './State'
import { readConnectionFileEntries } from './readConnectionFileEntries'

export async function stateConnectionUpload(
  state: State,
  connection: Connection,
): Promise<void> {
  connection.isUploading = true

  connection.fileEntries = await readConnectionFileEntries(connection.handle)

  const report = { updatedFiles: [], createdFiles: [] }

  for (const fileEntry of connection.fileEntries) {
    saveConnectionFileEntry(state, fileEntry, report)
  }

  connection.activities.unshift({
    name: 'Upload',
    time: Date.now(),
    report,
  })

  connection.isUploading = false
}

function saveConnectionFileEntry(
  state: State,
  fileEntry: ConnectionFileEntry,
  report: { updatedFiles: Array<string>; createdFiles: Array<string> },
): void {
  const found = state.entries.find(
    (entry) => contentSourceParse(entry.content.src).file === fileEntry.path,
  )

  if (found) {
    if (found.content.text !== fileEntry.text) {
      found.content.updatedAt = fileEntry.updatedAt
      report.updatedFiles.push(fileEntry.path)
      found.isModifiedByUploading = true
    }

    found.newText = fileEntry.text
  } else {
    report.createdFiles.push(fileEntry.path)
    state.entries.push({
      content: {
        src: contentSourceFormat({
          isExternal: false,
          isPublic: true,
          origin: state.username,
          file: fileEntry.path,
        }),
        text: fileEntry.text,
        size: fileEntry.size,
        createdAt: fileEntry.updatedAt,
        updatedAt: fileEntry.updatedAt,
      },
      isModifiedByUploading: true,
      newText: fileEntry.text,
    })
  }
}
