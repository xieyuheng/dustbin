import test from "ava"
import { groupBy } from "../lib/groupBy"

test ("groupBy", t => {
  let students = [
    {name: "张三", score: 84},
    {name: "李四", score: 58},
    {name: "王五", score: 99},
    {name: "赵六", score: 69},
  ]

  t.deepEqual (groupBy (students), {
    "A": [
      {name: "张三", score: 84},
      {name: "王五", score: 99},
    ],
    "B": [
      {name: "赵六", score: 69},
    ],
    "C": [
      {name: "李四", score: 58}
    ],
  })
})
