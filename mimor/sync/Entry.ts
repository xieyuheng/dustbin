import { Content } from '../../models/content'

export type Entry = {
  content: Content
  newText?: string
  isDeleting?: boolean
  isSaving?: boolean
  isModifiedByUploading?: boolean
  isNotInTheCloud?: boolean
}
