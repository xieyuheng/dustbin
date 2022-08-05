import dynamic from "next/dynamic"

const Pomodoro = dynamic(() => import("../views/pomodoro/Pomodoro"), {
  ssr: false,
})

export default function Home() {
  return <Pomodoro />
}
