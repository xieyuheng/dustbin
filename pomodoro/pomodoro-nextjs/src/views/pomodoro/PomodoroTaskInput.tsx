import classes from "classnames"
import { observer } from "mobx-react-lite"
import { PomodoroState as State } from "./PomodoroState"
import { PlusIcon } from "@heroicons/react/outline"
import PomodoroTaskForm from "./PomodoroTaskForm"

export default observer(function PomodoroTaskInput({
  state,
}: {
  state: State
}) {
  return state.editing ? (
    <div
      className={classes(
        "flex w-full flex-col border-2 p-3 md:py-4",
        "text-xl font-semibold",
        state.classes.transition,
        `border-${state.theme.name}-200 bg-${state.theme.name}-100  text-${state.theme.name}-900`
      )}
    >
      <PomodoroTaskForm
        state={state}
        placeholder={state.lang.zh ? "新的任务" : "Create a new task"}
        onChange={(event) => {
          state.inputTaskTitle = event.target.value
        }}
        onCancel={() => {
          state.inputTaskTitle = null
          state.editing = false
        }}
        onSave={() => {
          if (!state.inputTaskTitle) {
            state.editing = false
          } else {
            state.createTask()
            state.editing = false
          }
        }}
      />
    </div>
  ) : (
    <button
      onClick={() => {
        state.editing = true
      }}
      className={classes(
        "flex w-full flex-col border-2 border-dashed p-3 md:py-4",
        "items-center justify-center",
        state.classes.transition,
        `border-${state.theme.name}-300 bg-${state.theme.name}-400 hover:bg-${state.theme.name}-500`
      )}
    >
      <PlusIcon
        className={classes(
          "h-10 w-10",
          state.classes.transition,
          `text-${state.theme.name}-300`
        )}
      />
    </button>
  )
})
