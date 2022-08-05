import { forwardRef, ReactNode } from "react"
import Link from "next/link"
import { Menu } from "@headlessui/react"

// https://headlessui.com/react/menu#integrating-with-next-js

type Props = Record<string, any>

const MyLink = forwardRef<HTMLAnchorElement, Props>((props, ref) => {
  const { href, children, ...rest } = props
  return (
    <Link href={href}>
      <a ref={ref} {...rest}>
        {children}
      </a>
    </Link>
  )
})

export default MyLink
