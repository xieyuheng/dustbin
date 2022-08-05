import { Fragment } from "react"
import classes from "classnames"
import { observer } from "mobx-react-lite"
import { PageLayoutState as State } from "./PageLayoutState"
import { Menu, Transition } from "@headlessui/react"
import { XIcon, MenuIcon } from "@heroicons/react/outline"
import Link from "../../components/Link"

export default observer(function PageLayoutMenuMobile({
  state,
}: {
  state: State
}) {
  return (
    <Menu as="div" className="relative flex text-3xl">
      <Menu.Button>
        <MenuIcon className="h-5 w-5" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition duration-300"
        enterFrom="transform opacity-0 translate-x-6 rotate-45"
        enterTo="transform opacity-100 rotate-0"
        leave="transition duration-300"
        leaveFrom="transform opacity-100"
        leaveTo="transform opacity-0 translate-x-6"
      >
        <Menu.Items
          className={classes(
            "fixed top-0 right-0 h-screen w-screen border-4 p-4",
            `bg-${state.theme.name}-400 border-${state.theme.name}-300`
          )}
        >
          <div className={classes("flex justify-end")}>
            <Menu.Item>
              {({ active }) => (
                <XIcon
                  className={classes(
                    "h-10 w-10 text-right",
                    active && `border-4 border-${state.theme.name}-200`,
                    active && `text-${state.theme.name}-200`
                  )}
                />
              )}
            </Menu.Item>
          </div>

          <div className="py-10">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/register"
                  className={classes(
                    "flex justify-center p-2 font-semibold",
                    active && "underline decoration-6",
                    active && `text-${state.theme.name}-200`
                  )}
                >
                  {state.lang.zh && "注册"}
                  {state.lang.en && "Register"}
                </Link>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/login"
                  className={classes(
                    "flex justify-center p-2 font-semibold",
                    active && "underline decoration-6",
                    active && `text-${state.theme.name}-200`
                  )}
                >
                  {state.lang.zh && "登录"}
                  {state.lang.en && "Login"}
                </Link>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
})
