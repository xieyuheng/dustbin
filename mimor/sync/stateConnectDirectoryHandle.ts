import { State } from './State'
import { connectionLoad } from './connectionLoad'
import { ensurePermission } from './ensurePermission'

export async function stateConnectDirectoryHandle(
  state: State,
  directoryHandle: FileSystemDirectoryHandle,
): Promise<void> {
  if (!(await ensurePermission(directoryHandle))) {
    return
  }

  state.latestDirectoryHandle = directoryHandle

  state.connection = await connectionLoad(state, directoryHandle)
  state.connection.activities.unshift({
    name: 'Connect',
    time: Date.now(),
  })
}
