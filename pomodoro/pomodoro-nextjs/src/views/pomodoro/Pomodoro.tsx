import classes from "classnames"
import PomodoroTimer from "./PomodoroTimer"
import PomodoroTasks from "./PomodoroTasks"
import Head from "next/head"
import { useMount } from "ahooks"
import { autorun } from "mobx"
import { Observer } from "mobx-react-lite"
import { usePomodoroState } from "./hooks/usePomodoroState"

export default function Pomodoro() {
  const [state, saveState] = usePomodoroState()

  autorun(() => saveState(state))

  useMount(() => state.setupNotification())

  return (
    <Observer>
      {() => (
        <>
          <Head>
            <title>{state.formatTitle()}</title>
            <meta name="theme-color" content={state.theme.color} />
          </Head>

          <PomodoroTimer state={state} />
          <PomodoroTasks state={state} />
        </>
      )}
    </Observer>
  )
}
