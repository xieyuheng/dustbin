import test from "ava"
import { findNodeById } from "../lib/findNodeById"

test ("findNodeById", t => {
  let node = {
    id: "1",
    label: "first",
    children: [
      {
        id: "2",
        label: "second"
      },
      {
        id: "3",
        label: "third",
        children: [
          {
            id: "4",
            label: "fourth"
          },
          {
            id: "5",
            label: "fifth"
          }
        ]
      }
    ]
  }

  t.true (findNodeById (node, "1") .label === "first")
  t.true (findNodeById (node, "2") .label === "second")
  t.true (findNodeById (node, "3") .label === "third")
  t.true (findNodeById (node, "4") .label === "fourth")
  t.true (findNodeById (node, "5") .label === "fifth")
  t.true (findNodeById (node, "6") === null)
})
