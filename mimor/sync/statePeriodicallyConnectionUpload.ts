import { State } from './State'
import { stateConnectionUpload } from './stateConnectionUpload'

export function statePeriodicallyConnectionUpload(state: State): void {
  setInterval(async () => {
    if (!state.connection) return
    if (!state.connection.isAutoUploadEnabled) return

    await stateConnectionUpload(state, state.connection)
  }, 5000)
}
