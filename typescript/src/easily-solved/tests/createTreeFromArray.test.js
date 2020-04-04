import test from "ava"
import * as ut from "../lib/util"
import { createTreeFromArray } from "../lib/createTreeFromArray"

test ("createTreeFromArray", t => {
  let node = createTreeFromArray ([
    {"id": 1,
     "isDir": false,
     "name": "file1",
     "parentId": 2,
     "content": "hi"},
    {"id": 2,
     "isDir": true,
     "name": "bin"},
    {"id": 3,
     "isDir": false,
     "name": "file3",
     "parentId": 2,
     "content": "hi"},
    {"id": 4,
     "isDir": true,
     "name": "usr",
     "parentId": 2},
    {"id": 5,
     "isDir": false,
     "name": "file5",
     "parentId": 4},
  ])

  ut.log (node)
  t.pass ()
})
