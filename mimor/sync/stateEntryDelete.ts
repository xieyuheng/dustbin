import { contentDelete } from '../../models/content'
import { removeFirst } from '../../utils/removeFirst'
import { Entry } from './Entry'
import { State } from './State'

export async function stateEntryDelete(
  state: State,
  entry: Entry,
): Promise<void> {
  await contentDelete(entry.content.src)
  removeFirst(state.entries, ({ content }) => content.src === entry.content.src)
}
