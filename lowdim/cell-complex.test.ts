import assert from "assert"

import { map_t } from "@cicadoidea/basic/lib/collection/map"

import * as cx from "./cell-complex"

let empty_cell_complex = new cx.cell_complex_t()

let empty_bound_map = new map_t<cx.cell_t, cx.bound_t>({
  key_eq: (x: cx.cell_t, y: cx.cell_t) => x.eq(y),
  value_eq: (x: cx.bound_t, y: cx.bound_t) => x.eq(y),
})

let empty_cmap = new cx.cmap_t({
  dom: empty_cell_complex,
  cod: empty_cell_complex,
  map: empty_bound_map,
})

let bin = new cx.cell_complex_t()

bin.attach_cmap(0, new cx.id_t("0"), empty_cmap)
bin.attach_cmap(0, new cx.id_t("1"), empty_cmap)

let interval = new cx.cell_complex_t()

interval.attach_cmap(0, new cx.id_t("0"), empty_cmap)
interval.attach_cmap(0, new cx.id_t("1"), empty_cmap)

interval.attach_cmap(
  1,
  new cx.id_t("inter"),
  new cx.cmap_t({
    dom: bin,
    cod: interval.dim_skeleton(0),
    map: new map_t<cx.cell_t, cx.bound_t>({
      key_eq: (x: cx.cell_t, y: cx.cell_t) => x.eq(y),
      value_eq: (x: cx.bound_t, y: cx.bound_t) => x.eq(y),
    }).set_array([
      [
        bin.cell(new cx.id_t("0")),
        new cx.bound_t({
          src: bin.cell(new cx.id_t("0")),
          tar: interval.dim_skeleton(0).cell(new cx.id_t("0")),
          cmap: empty_cmap,
        }),
      ],
      [
        bin.cell(new cx.id_t("1")),
        new cx.bound_t({
          src: bin.cell(new cx.id_t("1")),
          tar: interval.dim_skeleton(0).cell(new cx.id_t("1")),
          cmap: empty_cmap,
        }),
      ],
    ]),
  })
)

console.log(cx.cell_complex_repr.repr(interval))
