import { contentPut } from '../../models/content'
import { Entry } from './Entry'
import { State } from './State'

export async function stateEntrySaveNewText(
  state: State,
  entry: Entry,
): Promise<void> {
  const who = 'stateEntrySaveNewText'

  if (entry.newText === undefined) return

  // Should only save modified.

  if (
    entry.newText === entry.content.text &&
    !entry.isNotInTheCloud &&
    !entry.isModifiedByUploading
  ) {
    return
  }

  entry.isSaving = true

  console.log({ who, entry })

  await contentPut(entry.content.src, entry.newText)

  entry.content.text = entry.newText
  entry.isSaving = false
  entry.isModifiedByUploading = false
  entry.isNotInTheCloud = false
}
