import { observer } from "mobx-react-lite"
import { PomodoroState as State } from "./PomodoroState"
import PomodoroTaskCurrent from "./PomodoroTaskCurrent"
import PomodoroTaskItem from "./PomodoroTaskItem"
import PomodoroTaskInput from "./PomodoroTaskInput"

export default observer(function PomodoroTasks({ state }: { state: State }) {
  return (
    <div className="flex flex-col py-2">
      {state.currentTask && (
        <div className="py-3">
          <PomodoroTaskCurrent state={state} task={state.currentTask} />
        </div>
      )}

      <ul>
        {state.tasks.map((task) => (
          <li className="py-2" key={task.id}>
            <PomodoroTaskItem state={state} task={task} />
          </li>
        ))}
        <li className="py-2">
          <PomodoroTaskInput state={state} />
        </li>
      </ul>
    </div>
  )
})
