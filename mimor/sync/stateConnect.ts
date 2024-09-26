import { State } from './State'
import { stateConnectDirectoryHandle } from './stateConnectDirectoryHandle'

export async function stateConnect(state: State): Promise<void> {
  const directoryHandle = await window.showDirectoryPicker({
    mode: 'readwrite',
  })

  await stateConnectDirectoryHandle(state, directoryHandle)
}
