import { PomodoroState } from "../PomodoroState"

export function usePomodoroState(): [
  PomodoroState,
  (state: PomodoroState) => void
] {
  const saveState = (state: PomodoroState) => {
    localStorage.setItem("PomodoroState", JSON.stringify(state.json()))
  }

  const found = localStorage.getItem("PomodoroState")
  const stateJson = found ? JSON.parse(found) : undefined

  if (stateJson?.version !== 1) {
    localStorage.removeItem("PomodoroState")
  }

  const state = stateJson?.version
    ? PomodoroState.create(stateJson)
    : new PomodoroState()

  return [state, saveState]
}
