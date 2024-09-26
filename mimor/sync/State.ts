import { User } from '../../models/user/User'
import { Connection } from './Connection'
import { Entry } from './Entry'

export type State = {
  username: string
  user: User
  entries: Array<Entry>
  isSearching?: boolean
  isFileSystemAccessSupported?: boolean
  connection?: Connection
  isRefreshing?: boolean
  lastRefreshedAt?: number
  isSavingNewTexts?: boolean
  latestDirectoryHandle?: FileSystemDirectoryHandle
}
