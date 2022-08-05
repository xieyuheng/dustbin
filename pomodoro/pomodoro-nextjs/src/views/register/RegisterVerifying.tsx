import classes from "classnames"
import { observer } from "mobx-react-lite"
import { RegisterState as State } from "./RegisterState"
import { Verifying } from "./Verifying"
import Link from "../../components/Link"

export default observer(function RegisterVerifying({
  state,
  verifying,
}: {
  state: State
  verifying: Verifying
}) {
  return (
    <div className="text-xm overflow-x-auto py-1">
      <div className="flex flex-col items-center text-center">
        <div className="py-2 text-xl font-bold">
          {state.lang.zh && <div>等待邮件注册确认</div>}
          {state.lang.en && <div>Awaiting Register Email Confirmation</div>}
        </div>

        <div className="py-1 text-lg">
          {state.lang.zh && (
            <div>
              已向 <b>{verifying.email}</b> 发送了邮件
            </div>
          )}
          {state.lang.en && (
            <div>
              We just sent an email to <b>{verifying.email}</b>
            </div>
          )}
        </div>

        <div className="py-1 text-lg">
          {state.lang.zh && (
            <div>
              确认前，请比对 <b>识别码</b>：
            </div>
          )}
          {state.lang.en && (
            <div>
              Before verifying, please compare the <b>confirmation code</b>:
            </div>
          )}
        </div>

        <div className="py-2 text-lg">
          <p
            className={classes(
              "border-4 py-1 px-2 font-black",
              `border-${state.theme.name}-300 bg-${state.theme.name}-500`
            )}
          >
            {verifying.confirmation_code}
          </p>
        </div>

        <button
          className={classes(
            "my-2 font-sans font-bold",
            `text-${state.theme.name}-50 hover:text-${state.theme.name}-200`
          )}
        >
          {state.lang.zh && <div>撤销</div>}
          {state.lang.en && <div>REVOKE</div>}
        </button>
      </div>
    </div>
  )
})
