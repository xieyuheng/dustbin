import { autocompletion, completionKeymap } from "@codemirror/autocomplete"
import { closeBrackets, closeBracketsKeymap } from "@codemirror/closebrackets"
import { defaultKeymap } from "@codemirror/commands"
import { commentKeymap } from "@codemirror/comment"
import { foldGutter, foldKeymap } from "@codemirror/fold"
import { lineNumbers } from "@codemirror/gutter"
import { defaultHighlightStyle } from "@codemirror/highlight"
import { history, historyKeymap } from "@codemirror/history"
import { indentOnInput } from "@codemirror/language"
import { lintKeymap } from "@codemirror/lint"
import { bracketMatching } from "@codemirror/matchbrackets"
import { rectangularSelection } from "@codemirror/rectangular-selection"
import { highlightSelectionMatches, searchKeymap } from "@codemirror/search"
import { EditorState } from "@codemirror/state"
import {
  drawSelection,
  dropCursor,
  EditorView,
  highlightSpecialChars,
  keymap,
} from "@codemirror/view"

export function createEditorView(text: string, parent: Element): EditorView {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }

  const editorState = createEditorState(text)
  return new EditorView({ state: editorState, parent })
}

function createEditorState(doc: string): EditorState {
  return EditorState.create({
    doc: doc,
    extensions: [
      EditorView.editable.of(false),
      lineNumbers(),
      highlightSpecialChars(),
      history(),
      foldGutter(),
      drawSelection(),
      dropCursor(),
      EditorState.allowMultipleSelections.of(true),
      indentOnInput(),
      defaultHighlightStyle.fallback,
      bracketMatching(),
      closeBrackets(),
      autocompletion(),
      rectangularSelection(),
      highlightSelectionMatches(),
      keymap.of([
        ...closeBracketsKeymap,
        ...defaultKeymap,
        ...searchKeymap,
        ...historyKeymap,
        ...foldKeymap,
        ...commentKeymap,
        ...completionKeymap,
        ...lintKeymap,
      ]),
    ],
  })
}
