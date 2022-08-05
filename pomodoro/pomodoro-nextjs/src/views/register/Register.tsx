import classes from "classnames"
import Head from "next/head"
import { useMount } from "ahooks"
import { autorun } from "mobx"
import { Observer } from "mobx-react-lite"
import { RegisterState as State } from "./RegisterState"
import RegisterStart from "./RegisterStart"
import RegisterVerifying from "./RegisterVerifying"

export default function Register() {
  const state = new State()

  return (
    <Observer>
      {() => (
        <>
          {!state.verifying && (
            <div className="mt-4 flex h-full flex-col items-center md:mt-10">
              <RegisterStart state={state} />
            </div>
          )}
          {state.verifying && (
            <div className="mt-12 flex h-full flex-col items-center md:mt-10">
              <RegisterVerifying state={state} verifying={state.verifying} />
            </div>
          )}
        </>
      )}
    </Observer>
  )
}
