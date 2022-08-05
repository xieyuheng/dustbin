import type { AppProps } from "next/app"
import dynamic from "next/dynamic"
import "../styles/index.css"
import "../lib/mobx"
import "../lib/register-service-worker"

const PageLayout = dynamic(() => import("../layouts/page-layout/PageLayout"), {
  ssr: false,
})

declare global {
  var tailwind: any
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PageLayout>
      <Component {...pageProps} />
    </PageLayout>
  )
}
