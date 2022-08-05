import classes from "classnames"
import { observer } from "mobx-react-lite"
import { PageLayoutState as State } from "./PageLayoutState"
import { Menu, Transition } from "@headlessui/react"
import { MenuIcon } from "@heroicons/react/outline"
import Link from "../../components/Link"

export default observer(function PageLayoutLure({ state }: { state: State }) {
  return (
    <div className="flex space-x-1 text-xl font-semibold">
      <Link href="/register" className="hover:underline">
        {state.lang.zh && "注册"}
        {state.lang.en && "Register"}
      </Link>
      <div>/</div>
      <Link href="/login" className="hover:underline">
        {state.lang.zh && "登录"}
        {state.lang.en && "Login"}
      </Link>
    </div>
  )
})
