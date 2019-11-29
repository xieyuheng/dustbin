import test from "ava"
import { RouteMap } from "../lib/RouteMap"

test ("RouteMap", t => {
  let routeMap = new RouteMap ()
  routeMap.registerHandler ("GET", "/1", "get1")
  routeMap.registerHandler ("GET", "/2", "get2")
  routeMap.registerHandler ("POST", "/1", "post1")
  routeMap.registerHandler ("POST", "/2", "post2")

  t.true (routeMap.findHandler ("GET", "/1") === "get1")
  t.true (routeMap.findHandler ("GET", "/2") === "get2")
  t.true (routeMap.findHandler ("POST", "/1") === "post1")
  t.true (routeMap.findHandler ("POST", "/2") === "post2")
})
