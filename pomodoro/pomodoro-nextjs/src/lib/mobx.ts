import { enableStaticRendering } from "mobx-react-lite"
import { configure } from "mobx"

enableStaticRendering(isServer())

configure({
  enforceActions: "never",
})

// Use spec compliant transpilation for class properties
// - https://mobx.js.org/installation.html

if (
  !new (class {
    constructor(public x: string = "x") {}
  })().hasOwnProperty("x")
) {
  throw new Error("Transpiler is not configured correctly")
}

function isServer(): boolean {
  // there is no window object on the server
  return typeof window === "undefined"
}
