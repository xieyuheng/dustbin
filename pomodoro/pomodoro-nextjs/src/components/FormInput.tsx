import { ReactNode } from "react"
import classes from "classnames"
import { observer } from "mobx-react-lite"
import { theme } from "../stores/theme"
import { lang } from "../stores/lang"

export default observer(function FormInput({
  name,
  type,
  required,
  label,
  footer,
}: {
  name: string
  type?: string
  required?: boolean
  label: ReactNode
  footer?: ReactNode
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="py-2 font-sans">
        {label}
      </label>

      <input
        id={name}
        name={name}
        className={classes(
          "w-full rounded-sm border-2 p-3 font-bold",
          `border-${theme.name}-200 text-${theme.name}-900`
        )}
        type={type || "text"}
        maxLength={32}
        spellCheck="false"
        required={required}
      />

      {footer}
    </div>
  )
})
