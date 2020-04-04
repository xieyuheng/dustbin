import test from "ava"
import { topKFrequent } from "../lib/topKFrequent"

test ("topKFrequent", t => {
  t.deepEqual (
    topKFrequent ([1, 1, 1, 2, 2, 3], 3),
    [1, 2, 3],
  )

  t.deepEqual (
    topKFrequent ([1, 1, 2, 2, 2, 3], 2),
    [2, 1],
  )

  t.deepEqual (
    topKFrequent ([1, 1, 1, 2, 2, 3, 3, 3, 3], 1),
    [3],
  )
})
