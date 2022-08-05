import { makeAutoObservable } from "mobx"
import { lang } from "../../stores/lang"
import { theme } from "../../stores/theme"
import { Verifying, VerifyingJson } from "./Verifying"

export class RegisterState {
  lang = lang
  theme = theme

  verifying: Verifying | null = null

  constructor() {
    makeAutoObservable(this)
  }

  verify(json: VerifyingJson) {
    this.verifying = new Verifying(json)
  }
}
