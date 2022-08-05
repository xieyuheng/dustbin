import dynamic from "next/dynamic"

const Register = dynamic(() => import("../views/register/Register"), {
  ssr: false,
})

export default function Home() {
  return <Register />
}
