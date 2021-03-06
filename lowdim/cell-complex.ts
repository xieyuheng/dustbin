import assert from "assert"

import { map_t } from "@cicadoidea/basic/lib/collection/map"
import { repr_t } from "@cicadoidea/basic/lib/class/repr"

// TODO
//   id must be structured (like expression)
//   because we will generate attachment based on existing skeleton
//   maybe just use any json as id
export class id_t {
  name: string

  constructor(name: string) {
    this.name = name
  }

  eq(that: id_t): boolean {
    return this.name === that.name
  }
}

export const id_repr = new repr_t<id_t>({
  repr(id: id_t): string {
    return id.name
  },
})

export class cell_complex_t {
  private map: map_t<id_t, cell_t>

  constructor() {
    this.map = new map_t({
      key_eq: (x, y) => x.eq(y),
      value_eq: (x, y) => x.eq(y),
    })
  }

  cell(id: id_t): cell_t {
    return this.map.get_unwrap(id)
  }

  *cells() {
    for (let cell of this.map.values()) {
      yield cell as cell_t
    }
  }

  eq(that: cell_complex_t): boolean {
    return this.map.weak_eq(that.map)
  }

  dim_skeleton(dim: number): cell_complex_t {
    let skeleton = new cell_complex_t()
    for (let [id, cell] of this.map) {
      if (cell.dim <= dim) {
        skeleton.map.set(id, cell)
      }
    }
    return skeleton
  }

  attach_cmap(dim: number, id: id_t, cmap: cmap_t): this {
    assert(cmap.cod.eq(this.dim_skeleton(dim - 1)))
    let cell = new cell_t({ dim, id, cmap })
    this.map.set(id, cell)
    return this
  }
}

export const cell_complex_repr = new repr_t<cell_complex_t>({
  repr(cell_complex: cell_complex_t): string {
    let s = ""
    // TODO
    return s
  },
})

export class cell_t {
  id: id_t
  dim: number
  cmap: cmap_t
  spherical_evidence?: spherical_evidence_t

  constructor(the: {
    id: id_t
    dim: number
    cmap: cmap_t
    spherical_evidence?: spherical_evidence_t
  }) {
    this.id = the.id
    this.dim = the.dim
    this.cmap = the.cmap

    if (the.spherical_evidence) {
      // TODO
      //   check the spherical_evidence
      this.spherical_evidence = the.spherical_evidence
    } else {
      // TODO
      //   try to generate spherical_evidence
      this.spherical_evidence = new spherical_evidence_t()
    }
  }

  *boundaries() {
    for (let index of this.cmap.dom.cells()) {
      let bound = this.cmap.map.get_unwrap(index)
      let boundary = bound.tar
      yield [index, boundary] as [cell_t, cell_t]
    }
  }

  boundary_map(): map_t<cell_t, cell_t> {
    let map: map_t<cell_t, cell_t> = new map_t({
      key_eq: (x, y) => x.eq(y),
      value_eq: (x, y) => x.eq(y),
    })
    return map.set_iter(this.boundaries())
  }

  eq(that: cell_t): boolean {
    return (
      this.id.eq(that.id) &&
      this.dim === that.dim &&
      this.cmap.eq_ignore_cod(that.cmap)
    )
  }
}

export class spherical_evidence_t {
  /**
   * [detail definition omitted]
   */
}

export class cmap_t {
  dom: cell_complex_t
  cod: cell_complex_t
  map: map_t<cell_t, bound_t>

  constructor(the: {
    dom: cell_complex_t
    cod: cell_complex_t
    map: map_t<cell_t, bound_t>
  }) {
    this.dom = the.dom
    this.cod = the.cod
    this.map = the.map

    /**
     * Check map is continuous.
     *   boundary(map(cell)) == map(boundary(cell))
     */
    for (let cell of the.dom.cells()) {
      let bound = the.map.get_unwrap(cell)
      let map_then_boundary: map_t<cell_t, cell_t> = this.cell_orientation(
        cell
      ).compose(bound.tar.boundary_map())
      let boundary_then_map: map_t<
        cell_t,
        cell_t
      > = cell
        .boundary_map()
        .endo_map_on_value((boundary) => the.map.get_unwrap(boundary).tar)
      assert(map_then_boundary.weak_eq(boundary_then_map))
    }
  }

  cell_orientation(cell: cell_t): map_t<cell_t, cell_t> {
    let orientation: map_t<cell_t, cell_t> = new map_t({
      key_eq: (x, y) => x.eq(y),
      value_eq: (x, y) => x.eq(y),
    })
    let bound = this.map.get_unwrap(cell)
    for (let index of bound.cmap.dom.cells()) {
      let tar = bound.cmap.map.get_unwrap(index).tar
      orientation.set(index, tar)
    }
    return orientation
  }

  eq(that: cmap_t): boolean {
    return (
      this.dom.eq(that.dom) &&
      this.cod.eq(that.cod) &&
      this.map.weak_eq(that.map)
    )
  }

  eq_ignore_cod(that: cmap_t): boolean {
    return this.dom.eq(that.dom) && this.map.weak_eq(that.map)
  }
}

export class bound_t {
  src: cell_t
  tar: cell_t
  cmap: cmap_t

  constructor(the: { src: cell_t; tar: cell_t; cmap: cmap_t }) {
    assert(the.cmap.dom === the.src.cmap.dom)
    assert(the.cmap.cod === the.tar.cmap.dom)

    this.src = the.src
    this.tar = the.tar
    this.cmap = the.cmap
  }

  eq(that: bound_t): boolean {
    return (
      this.src.eq(that.src) &&
      this.tar.eq(that.tar) &&
      this.cmap.eq_ignore_cod(that.cmap)
    )
  }
}
