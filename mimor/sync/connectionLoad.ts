import { Connection } from './Connection'
import { State } from './State'
import { readConnectionFileEntries } from './readConnectionFileEntries'

export async function connectionLoad(
  state: State,
  handle: FileSystemDirectoryHandle,
): Promise<Connection> {
  const fileEntries = await readConnectionFileEntries(handle)

  return {
    handle,
    name: handle.name,
    fileEntries,
    activities: [],
  }
}
