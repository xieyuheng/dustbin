import test from "ava"
import {
  leastComplementNumber,
  getIncName,
} from "../lib/getIncName"

test ("leastComplementNumber", t => {
  t.true (leastComplementNumber ([0, 1, 2]) === 3)
  t.true (leastComplementNumber ([1, 2]) === 0)
  t.true (leastComplementNumber ([0, 2]) === 1)
})

test ("getIncName", t => {
  let node = {
    id: "1",
    type: "View",
    name: "view",
    children: [
      {
        id: "2",
        type: "Button",
        name: "button",
      },
      {
        id: "3",
        type: "View",
        name: "view_1",
        children: [
          {
            id: "4",
            type: "Button",
            name: "button_1",
          },
          {
            id: "5",
            type: "View",
            name: "view_2",
          }
        ]
      }
    ]
  }

  let node_without_button_1 = {
    id: "1",
    type: "View",
    name: "view",
    children: [
      {
        id: "2",
        type: "Button",
        name: "button",
      },
      {
        id: "3",
        type: "View",
        name: "view_1",
        children: [
          {
            id: "4",
            type: "Button",
            name: "button_10",
          },
          {
            id: "5",
            type: "View",
            name: "view_2",
          }
        ]
      }
    ]
  }

  t.true (getIncName ("button", node) === "button_2")
  t.true (getIncName ("field", node) === "field")
  t.true (getIncName ("button", node_without_button_1) === "button_1")
})
