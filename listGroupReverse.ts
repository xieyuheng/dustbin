type List<A> = Cons<A> | Null

type Cons<A> = {
  kind: 'Cons'
  head: A
  tail: List<A>
}

type Null = {
  kind: 'Null'
}

const emptyList: Null = {
  kind: 'Null',
}

function cons<A>(head: A, tail: List<A>): Cons<A> {
  return { kind: 'Cons', head, tail }
}

function listGroupReverse<A>(input: List<A>, size: number): List<A> {
  const groups = listGroupBy(input, size)
  const newGroups = listMap(groups, (group) => listReverse(group, emptyList))
  return listFlatMap(newGroups, (group) => group)
}

function listGroupReverse2<A>(
  input: List<A>,
  size: number,
  state: { count: number; result: List<A> },
): List<A> {
  const groups = listGroupBy(input, size)
  const newGroups = listMap(groups, (group) => listReverse(group, emptyList))
  const newState = state
  return listGroupReverse2()
}

function listGroupBy<A>(list: List<A>, size: number): List<List<A>> {
  if (list.kind === 'Null') {
    return emptyList
  }
  const rest = listRest(list, size)
  return cons(listTake(list, size), listGroupBy(rest, size))
}

function listTake<A>(list: List<A>, size: number): List<A> {
  switch (list.kind) {
    case 'Cons': {
      if (size === 0) {
        return emptyList
      } else {
        return cons(list.head, listTake(list.tail, size - 1))
      }
    }
    case 'Null': {
      return emptyList
    }
  }
}

function listRest<A>(list: List<A>, size: number): List<A> {
  switch (list.kind) {
    case 'Cons': {
      if (size === 0) {
        return list
      } else {
        return listRest(list.tail, size - 1)
      }
    }
    case 'Null': {
      return emptyList
    }
  }
}

function listMap<A, B>(list: List<A>, f: (x: A) => B): List<B> {
  switch (list.kind) {
    case 'Cons': {
      return cons(f(list.head), listMap(list.tail, f))
    }
    case 'Null': {
      return emptyList
    }
  }
}

function listAppend<A>(list: List<A>, rest: List<A>): List<A> {
  switch (list.kind) {
    case 'Cons': {
      return cons(list.head, listAppend(list.tail, rest))
    }
    case 'Null': {
      return rest
    }
  }
}

function listFlatMap<A, B>(list: List<A>, f: (x: A) => List<B>): List<B> {
  switch (list.kind) {
    case 'Cons': {
      return listAppend(f(list.head), listFlatMap(list.tail, f))
    }
    case 'Null': {
      return emptyList
    }
  }
}

function listReverse<A>(list: List<A>, result: List<A>): List<A> {
  switch (list.kind) {
    case 'Cons': {
      return listReverse(list.tail, cons(list.head, result))
    }
    case 'Null': {
      return result
    }
  }
}

console.dir(
  listGroupReverse(
    cons(
      1,
      cons(2, cons(3, cons(4, cons(5, cons(6, cons(7, cons(8, emptyList))))))),
    ),
    5,
  ),
  { depth: null },
)
