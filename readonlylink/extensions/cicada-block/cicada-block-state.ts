import { EditorView } from "@codemirror/view"
import { createEditorView } from "./create-editor-view"
import { Mod } from "@cicada-lang/cicada/lib/lang/mod"
import { cicadaLoadMod } from "./cicada-load-mod"
import { StmtOutput } from "@cicada-lang/cicada/lib/lang/stmt"

export class CicadaBlockState {
  outputs: Array<StmtOutput | undefined> = []
  error?: Error
  running: boolean = false
  active: boolean = false
  view?: EditorView

  constructor(
    public index: number,
    public info: string,
    public initCode: string
  ) {}

  init(element: Element) {
    this.view = createEditorView(this.initCode, element)
  }

  get code(): string {
    if (!this.view) return ""

    return this.view.state.doc.toString()
  }

  set code(code: string) {
    if (!this.view) return

    this.view.dispatch({
      changes: {
        from: 0,
        to: this.view.state.doc.length,
        insert: code,
      },
    })
  }

  async loadMod(): Promise<Mod> {
    return await cicadaLoadMod()
  }

  get extraInfo(): string | undefined {
    const prefix = "cicada "
    if (this.info.startsWith(prefix)) {
      return this.info.slice(prefix.length)
    } else {
      return undefined
    }
  }

  async run(): Promise<void> {
    this.outputs = []
    this.error = undefined
    this.running = true

    try {
      const mod = await this.loadMod()
      const block = mod.blocks.getOrFail(this.index)
      await block.run(mod, this.code)
      this.outputs = block.outputs.filter((output) => output)
    } catch (error) {
      if (error instanceof Error) {
        this.error = error
      } else {
        this.error = new Error(JSON.stringify(error))
      }
    }

    this.running = false
  }

  async reset(): Promise<void> {
    this.outputs = []
    this.error = undefined

    const mod = await this.loadMod()
    const block = mod.blocks.getOrFail(this.index)
    block.update(this.initCode)
    this.code = this.initCode
  }
}
