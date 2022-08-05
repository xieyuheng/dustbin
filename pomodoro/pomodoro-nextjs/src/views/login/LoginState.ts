import { makeAutoObservable } from "mobx"
import { lang } from "../../stores/lang"
import { theme } from "../../stores/theme"

export class LoginState {
  lang = lang
  theme = theme

  constructor() {
    makeAutoObservable(this)
  }
}
