import { userContentFindAll } from '../../models/content'
import { userGetOrFail } from '../../models/user/userGetOrFail'
import { State } from './State'

export type StateOptions = {
  username: string
}

export async function stateLoad(options: StateOptions): Promise<State> {
  const { username } = options

  const user = await userGetOrFail(username)
  const contents = await userContentFindAll(username)
  const entries = contents.map((content) => ({ content }))

  return {
    username,
    user,
    entries,
    lastRefreshedAt: Date.now(),
    isFileSystemAccessSupported:
      typeof window.showOpenFilePicker === 'function',
  }
}
