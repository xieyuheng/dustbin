import { useState } from "react"
import classes from "classnames"
import { observer } from "mobx-react-lite"
import { PomodoroState as State } from "./PomodoroState"
import { Task } from "./models/Task"
import { DotsVerticalIcon } from "@heroicons/react/outline"
import PomodoroTaskItemCount from "./PomodoroTaskItemCount"
import PomodoroTaskForm from "./PomodoroTaskForm"

export default observer(function PomodoroTaskItem({
  state,
  task,
}: {
  state: State
  task: Task
}) {
  const [active, setActive] = useState(false)
  const [inputTitle, setInputTitle] = useState(task.title)

  return (
    <div
      className={classes(
        "flex flex-col border-2 p-3 hover:border-white md:py-4",
        "text-xl font-semibold",
        state.classes.transition,
        `border-${state.theme.name}-200 bg-${state.theme.name}-100`,
        active ? `text-${state.theme.name}-500` : `text-${state.theme.name}-900`
      )}
    >
      {task.editing ? (
        <PomodoroTaskForm
          state={state}
          value={inputTitle}
          onChange={(event) => {
            setInputTitle(event.target.value)
          }}
          onDelete={() => {
            state.deleteTask(task.id)
            task.editing = false
          }}
          onCancel={() => {
            setInputTitle(task.title)
            task.editing = false
          }}
          onSave={() => {
            if (!inputTitle) {
              return alert(state.lang.zh ? "输入不能为空" : "Input required")
            }

            task.title = inputTitle
            task.editing = false
          }}
        />
      ) : (
        <div className={classes("flex items-start justify-between")}>
          <div
            className="text-xl font-semibold"
            onMouseLeave={() => {
              setActive(false)
            }}
            onClick={() => {
              if (!active) {
                setActive(true)
              } else {
                state.selectTask(task.id)
              }
            }}
          >
            {task.title}
          </div>

          <button
            className="shrink-0"
            onClick={() => {
              task.editing = true
            }}
          >
            <DotsVerticalIcon className="h-6 w-6" />
          </button>
        </div>
      )}

      <PomodoroTaskItemCount state={state} task={task} />
    </div>
  )
})
