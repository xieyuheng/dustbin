import classes from "classnames"
import Head from "next/head"
import { useMount } from "ahooks"
import { autorun } from "mobx"
import { LoginState as State } from "./LoginState"

export default function Login() {
  const state = new State()

  return <>Login</>
}
