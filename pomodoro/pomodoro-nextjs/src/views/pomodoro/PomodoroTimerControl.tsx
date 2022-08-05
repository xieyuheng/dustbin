import { observer } from "mobx-react-lite"
import { PomodoroState as State } from "./PomodoroState"
import PomodoroTimerButton from "./PomodoroTimerButton"
import { callWithConfirm } from "../../utils/call-with-confirm"

export default observer(function PomodoroTimerControl({
  state,
}: {
  state: State
}) {
  return (
    <div className="flex justify-between py-2 px-2 font-semibold md:py-4 md:px-6">
      <div className="flex space-x-2">
        {!state.timer.isRunning && !state.timer.isFinished && (
          <PomodoroTimerButton
            state={state}
            name={state.lang.zh ? "开始" : "START"}
            onClick={() => state.start()}
          />
        )}

        {state.timer.isRunning && (
          <PomodoroTimerButton
            state={state}
            name={state.lang.zh ? "暂停" : "STOP"}
            onClick={() => state.timer.stop()}
          />
        )}

        {state.timer.isStarted && (
          <PomodoroTimerButton
            state={state}
            name={state.lang.zh ? "重置" : "RESET"}
            onClick={() =>
              callWithConfirm(() => state.timer.reset(), {
                when: !state.timer.isFinished,
                message: state.lang.zh
                  ? "计时器已经开始了，确定要重置吗？"
                  : "A timer has been started, are you sure to reset it?",
              })
            }
          />
        )}
      </div>
    </div>
  )
})
