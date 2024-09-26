import { Connection } from './Connection'
import { State } from './State'

export async function stateConnectionToggleAutoUpdate(
  state: State,
  connection: Connection,
): Promise<void> {
  connection.isAutoUploadEnabled = !connection.isAutoUploadEnabled
}
