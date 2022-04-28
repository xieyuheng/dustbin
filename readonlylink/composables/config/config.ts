import { reactive } from "vue"
import { usePage } from "@inertiajs/inertia-vue3"
import axios from "axios"

export class Config {
  underlayingLang?: string

  get lang(): string | undefined {
    return this.underlayingLang
  }

  set lang(lang: string | undefined) {
    if (lang !== this.underlayingLang) {
      this.underlayingLang = lang
      if (lang) updateDocumentLang(lang)
      if (lang) syncLang(lang)
    }
  }

  langIs(lang: string | undefined): boolean {
    if (this.lang === undefined) return false

    return this.lang.startsWith("zh")
  }

  private knownLangs = ["zh"]

  langElse(): boolean {
    return !this.knownLangs.some((lang) => this.langIs(lang))
  }
}

function updateDocumentLang(lang: string): void {
  if (typeof window === "undefined") return

  document.documentElement.lang = lang
}

async function syncLang(lang: string): Promise<void> {
  try {
    await axios.patch("/user/config", { lang })
  } catch (error) {
    console.error({
      message: "Fail to synchronize lang with server.",
      error,
    })
  }
}

const config = reactive(new Config())

let initialized = false

export function useConfig() {
  if (initialized) return config

  const page: any = usePage()

  const lang = page.props.value.auth.user?.config.lang

  if (lang) {
    config.underlayingLang = lang
    initialized = true
    console.log({
      message: "Initialize lang",
      lang: config.lang,
    })
  }

  return config
}
