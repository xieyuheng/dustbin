import { contentSourceParse } from '../../models/content-source'
import * as fsa from '../../utils/fsa'
import { promiseAllFulfilled } from '../../utils/promiseAllFulfilled'
import { Connection } from './Connection'
import { Entry } from './Entry'
import { State } from './State'
import { readConnectionFileEntries } from './readConnectionFileEntries'

export async function stateConnectionDownload(
  state: State,
  connection: Connection,
): Promise<void> {
  connection.isDownloading = true

  connection.fileEntries = await readConnectionFileEntries(connection.handle)

  const report = { updatedFiles: [], createdFiles: [] }

  await promiseAllFulfilled(
    state.entries.map((entry) => writeEntry(connection, entry, report)),
  )

  connection.activities.unshift({
    name: 'Download',
    time: Date.now(),
    report,
  })

  connection.isDownloading = false
}

export async function writeEntry(
  connection: Connection,
  entry: Entry,
  report: { updatedFiles: Array<string>; createdFiles: Array<string> },
): Promise<void> {
  if (entry.content.text === undefined) {
    return
  }

  const parsed = contentSourceParse(entry.content.src)
  const fileEntry = connection.fileEntries.find(
    (fileEntry) => fileEntry.path === parsed.file,
  )

  if (fileEntry) {
    if (fileEntry.text !== entry.content.text) {
      await fsa.write(connection.handle, parsed.file, entry.content.text)
      report.updatedFiles.push(parsed.file)
    }
  } else {
    await fsa.write(connection.handle, parsed.file, entry.content.text)
    report.createdFiles.push(parsed.file)
  }
}
