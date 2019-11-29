export
class RouteMap {
  map: Map <string, Map <string, string>>

  constructor (
    map: Map <string, Map <string, string>> = new Map (),
  ) {
    this.map = map
  }

  registerHandler (
    method: string,
    url: string,
    handlerName: string,
  ): void {
    let method_map = this.map.get (url)
    if (method_map !== undefined) {
      method_map.set (method, handlerName)
    } else {
      this.map.set (url, new Map ([
        [method, handlerName],
      ]))
    }
  }

  findHandler (
    method: string,
    url: string,
  ): string {
    let method_map = this.map.get (url)
    if (method_map) {
      let handlerName = method_map.get (method)
      if (handlerName) {
        return handlerName
      } else {
        throw new Error (
          `unknown url: ${url}`
        )
      }
    } else {
        throw new Error (
          `unknown method: ${method}`
        )
      }
  }
}
