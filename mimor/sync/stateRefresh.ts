import { contentSourceParse } from '../../models/content-source'
import { ConnectionActivityReport } from './Connection'
import { State } from './State'
import { stateLoad } from './stateLoad'

export async function stateRefresh(state: State): Promise<void> {
  state.isRefreshing = true

  const newState = await stateLoad(state)

  state.user = newState.user
  state.lastRefreshedAt = Date.now()
  stateUpdateEntries(state, newState)
  stateMarkNotInTheCloudEntries(state, newState)

  state.isRefreshing = false
}

function stateUpdateEntries(state: State, newState: State): void {
  const report: ConnectionActivityReport = {
    updatedFiles: [],
    createdFiles: [],
  }

  for (const newEntry of newState.entries) {
    const found = state.entries.find(
      (entry) => entry.content.src === newEntry.content.src,
    )
    if (found) {
      if (found.content.text !== newEntry.content.text) {
        report.updatedFiles.unshift(
          contentSourceParse(newEntry.content.src).file,
        )
      }

      found.content.text = newEntry.content.text
      found.content.createdAt = newEntry.content.createdAt
      found.content.updatedAt = newEntry.content.updatedAt
      found.isNotInTheCloud = false
    } else {
      report.createdFiles.unshift(contentSourceParse(newEntry.content.src).file)
    }
  }

  if (state.connection) {
    state.connection.activities.unshift({
      name: 'Refresh',
      time: Date.now(),
      report,
    })
  }
}

function stateMarkNotInTheCloudEntries(state: State, newState: State): void {
  for (const entry of state.entries) {
    const found = newState.entries.find(
      (newEntry) => entry.content.src === newEntry.content.src,
    )

    if (!found) {
      entry.isNotInTheCloud = true
    }
  }
}
