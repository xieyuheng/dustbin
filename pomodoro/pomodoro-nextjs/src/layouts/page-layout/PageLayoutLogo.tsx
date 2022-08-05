import { observer } from "mobx-react-lite"
import { PageLayoutState as State } from "./PageLayoutState"
import Link from "../../components/Link"

export default observer(function PageLayoutLogo({ state }: { state: State }) {
  return (
    <Link href="/" className="font-logo text-3xl font-bold hover:underline">
      {state.appName}
    </Link>
  )
})
