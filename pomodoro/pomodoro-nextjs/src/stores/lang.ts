import { Lang } from "../states/Lang"
import { autorun } from "mobx"

function createLang() {
  const tag = localStorage.getItem("Lang")
  return new Lang(tag || "en")
}

export const lang = createLang()

autorun(() => localStorage.setItem("Lang", lang.tag))
