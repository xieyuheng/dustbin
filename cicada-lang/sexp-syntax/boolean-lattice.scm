 {define-class Boolean-Battice ()
  (claim Element type)

  (claim join (-> Element Element Element))
  (claim meet (-> Element Element Element))

  (claim complement (-> Element Element))

  (claim bottom Element)
  (claim top Element)

  (claim join-commutative
    (forall ((x Element)
             (y Element))
      (equal Element
             (join x y)
             (join y x))))

  meetcommutative(
                    x: Element,
                    y: Element,
                    ): equal(
                    Element,
                    meet(x, y),
                    meet(y, x),
                    )

    bottomidjoin(
                 x: Element
                 ): equal(
                 Element,
                 join(x, bottom),
                 x,
                 )

    topidmeet(
              x: Element
              ): equal(
              Element,
              meet(x, top),
              x,
              )

    joindistributemeet(
                       x: Element,
                       y: Element,
                       z: Element
                       ): equal(
                       Element,
                       join(x, meet(y, z)),
                       meet(join(x, y), join(x, z)),
                       )

    meetdistributejoin(
                       x: Element,
                       y: Element,
                       z: Element
                       ): equal(
                       Element,
                       meet(x, join(y, z)),
                       join(meet(x, y), meet(x, z)),
                       )

    complementjoinfortop(
                         x: Element
                         ): equal(
                         Element,
                         join(x, complement(x)),
                         top,
                         )

    complementmeetforbottom(
                            x: Element
                            ): equal(
                            Element,
                            meet(x, complement(x)),
                            bottom,
                            )
    }
