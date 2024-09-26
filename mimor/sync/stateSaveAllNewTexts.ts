import { contentSourceParse } from '../../models/content-source'
import { promiseAllFulfilled } from '../../utils/promiseAllFulfilled'
import { ConnectionActivityReport } from './Connection'
import { State } from './State'
import { stateEntrySaveNewText } from './stateEntrySaveNewText'

export async function stateSaveAllNewTexts(state: State): Promise<void> {
  state.isSavingNewTexts = true

  const report: ConnectionActivityReport = {
    updatedFiles: [],
    createdFiles: [],
  }

  await promiseAllFulfilled(
    state.entries.map(async (entry) => {
      const file = contentSourceParse(entry.content.src).file

      if (entry.content.text === undefined && entry.newText !== undefined) {
        report.createdFiles.push(file)
      }

      if (
        entry.content.text !== undefined &&
        entry.newText !== undefined &&
        entry.newText !== entry.content.text
      ) {
        report.updatedFiles.push(file)
      }

      return await stateEntrySaveNewText(state, entry)
    }),
  )

  if (state.connection) {
    state.connection.activities.unshift({
      name: 'Save',
      time: Date.now(),
      report,
    })
  }

  state.isSavingNewTexts = false
}
