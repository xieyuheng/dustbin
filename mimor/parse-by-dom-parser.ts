import { h, XElement, XNode } from './index'

export class ParsingError extends Error {
  constructor(public message: string, public element: Element) {
    super()
  }
}

export function parseNodes(input: string): Array<XNode> {
  const domParser = new window.DOMParser()
  const dom = domParser.parseFromString(
    `<root>${input}</root>`,
    'application/xml'
  )

  const errorElement = dom.querySelector('parsererror')

  if (errorElement) {
    throw new ParsingError('x-node parsing error', errorElement)
  }

  const root = dom.childNodes[0]
  return fromNodes(root.childNodes)
}

function fromNodes(childNodes: NodeListOf<ChildNode>): Array<XNode> {
  const nodes = []
  for (const node of Array.from(childNodes)) {
    if (node.nodeType === 1) nodes.push(fromElement(node as Element))
    if (node.nodeType === 3) nodes.push(fromText(node as Text))
  }

  return nodes
}

function fromText(node: Text): string {
  return node.wholeText
}

function fromElement(node: Element): XElement {
  const attributes: Record<string, string> = {}
  for (const attribute of Array.from(node.attributes)) {
    attributes[attribute.name] = attribute.value
  }

  return h(node.tagName, attributes, fromNodes(node.childNodes))
}
