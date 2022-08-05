import dynamic from "next/dynamic"

const Login = dynamic(() => import("../views/login/Login"), {
  ssr: false,
})

export default function Home() {
  return <Login />
}
