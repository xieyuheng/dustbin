import { ReactNode } from "react"
import classes from "classnames"
import { observer } from "mobx-react-lite"
import { theme } from "../stores/theme"
import { lang } from "../stores/lang"

export default observer(function FormButton({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="flex flex-col">
      <button
        className={classes(
          "rounded-sm border-2 py-3 font-sans font-bold text-white",
          `border-${theme.name}-200 hover:bg-${theme.name}-500`
        )}
        type="submit"
      >
        {children}
      </button>
    </div>
  )
})
