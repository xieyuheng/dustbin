import classes from "classnames"
import { observer } from "mobx-react-lite"
import { PageLayoutState as State } from "./PageLayoutState"
import { Menu, Transition } from "@headlessui/react"
import { MenuIcon } from "@heroicons/react/outline"

export default observer(function PageLayoutMenu({ state }: { state: State }) {
  return (
    <Menu as="div" className="relative flex text-xl">
      <Menu.Button>
        <MenuIcon className="h-5 w-5" />
      </Menu.Button>

      <Menu.Items
        className={classes(
          "absolute top-8 right-0 min-w-max border-2",
          `bg-${state.theme.name}-400 border-${state.theme.name}-300`
        )}
      >
        <Menu.Item>
          {({ active }) => (
            <div
              className={classes(
                "flex min-w-max items-center p-2",
                active && `bg-${state.theme.name}-500`
              )}
            >
              Hi
            </div>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <div
              className={classes(
                "flex min-w-max items-center p-2",
                active && `bg-${state.theme.name}-500`
              )}
            >
              Hi
            </div>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  )
})
