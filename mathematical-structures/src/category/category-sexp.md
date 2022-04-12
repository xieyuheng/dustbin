---
title: Category Theory -- Sexp
author: Xie Yuheng
date: 2022-03-10
---

# Introduction

> Category theory formalizes mathematical structure and its concepts in
> terms of a labeled directed graph called a category, whose nodes are
> called objects, and whose labelled directed edges are called arrows
> (or morphisms). A category has two basic properties: the ability to
> compose the arrows associatively, and the existence of an identity
> arrow for each object.
>
> -- [Wikipedia / Category Theory](https://en.wikipedia.org/wiki/Category_theory)

# Set

Bishop's set theory:

> A set is not an entity which has an ideal existence.
> A set exists only when it has been defined.
>
> To define a set we prescribe, at least implicitly,
>
> 1. what we (the constructing intelligence) must do
>    in order to construct an element of the set,
> 2. and what we must do to show that
>    two elements of the set are equal.
>
> Errett Bishop, A Constructivist Manifesto

```scheme
(define-class Set ()
  (claim Element Type)
  (claim Eq (-> Element Element Type))
  (claim reflexive (Pi ((x Element)) (Eq x x)))

  (claim transitive
    (Pi (((implicit x) Element)
         ((implicit y) Element)
         ((Eq x y))
         ((implicit z) Element)
         ((Eq y z)))
      (Eq x z)))

  (claim symmetric
    (Pi (((implicit x) Element)
         ((implicit y) Element)
         ((Eq x y)))
      (Eq y x))))
```

# Category

To each species of mathematical structure,
there corresponds a category whose objects have that structure,
and whose morphisms respect [preserve] it.

```scheme
(define-class Category ()
  (claim Object Type)
  (claim Morphism (-> (Object Object) Type))
  (claim id (Pi ((x Object)) (Morphism x x)))

  (claim hom-set
    (Pi ((x Object)
         (y Object))
      (Set (Morphism x y))))

  (claim compose
    (Pi/implicit ((x Object) (y Object))
      (Pi ((f (Morphism x y)))
        (Pi/implicit ((z Object))
          (Pi ((g (Morphism y z)))
            (Morphism x z))))))

  (claim compose
    (Pi ([(implicit x) Object]
         [(implicit y) Object]
         [(f (Morphism x y))]
         [(implicit z) Object]
         [(g (Morphism y z))])
      (Morphism x z)))

  (claim id-left
    (Pi (((implicit x) Object)
         ((implicit y) Object)
         (f (Morphism x y)))
      (=> (hom-set x y)
        (Eq (compose (id x) f) f))))

  (claim id-right
    (Pi (((implicit x) Object)
         ((implicit y) Object)
         (f (Morphism x y)))
      (=> (hom-set x y)
        (Eq (compose f (id y)) f))))

  (claim compose-associative
    (Pi (((implicit x) Object)
         ((implicit y) Object)
         (f (Morphism x y))
         ((implicit z) Object)
         (g (Morphism y z))
         ((implicit w) Object)
         (h (Morphism z w)))
      (=> (hom-set x w)
        (Eq (compose f (compose g h))
            (compose (compose f g) h))))))
```

## A trivial category

```scheme
(claim trivial-category Category)
(define trivial-category
  (object
    (Object Trivial)
    ((Morphism dom cod) Trivial)

    ((hom-set x y)
     (object
       (Element Trivial)
       ((Eq x y) (Equal Trivial x y))
       ((reflexive x) refl)
       ((transitive x-eq-y y-eq-z) refl)
       ((symmetric x-eq-y) refl)))

    ((id x) sole)

    ((compose f g) sole)
    ((id-left f) refl)
    ((id-right f) refl)

    ((compose-associative f g h) refl)))
```

# Functor

To any natural construction on structures of one species,
yielding structures of another species,
there corresponds a functor
from the category of the first species
to the category of the second.

For example, in the category of types in a programming language,
type constructors are endo-functors,
and endo-functors are often containers.

Functor can also be called natural-construction,
which will let the term `NaturalTransformation` make sense.

```scheme
(define-class Functor ()
  (claim dom Category)
  (claim cod Category)
  (claim map (-> (=> dom Object) (=> cod Object)))

  (claim fmap
    (Pi (((implicit x) (=> dom Object))
         ((implicit y) (=> dom Object))
         (f (=> dom (Morphism x y))))
      (=> cod (Morphism (map x) (map y)))))

  (claim fmap-respect-compose
    (Pi (((implicit x) (=> dom Object))
         ((implicit y) (=> dom Object))
         (f (=> dom (Morphism x y)))
         ((implicit z) (=> dom Object))
         (g (=> dom (Morphism y z))))
      (=> cod
        (hom-set (map x) (map z))
        (Eq (fmap (=> dom (compose f g)))
            (=> cod (compose (fmap f) (fmap g)))))))

  (claim fmap-respect-id
    (Pi ([x (=> dom Object)])
      (=> cod
        (hom-set (map x) (map x))
        (Eq (fmap (=> dom (id x)))
            (=> cod (id (map x))))))))
```

# NaturalTransformation

To each natural translation,
from a construction `F : A -> B`,
to a construction `G : A -> B`,
there corresponds a natural transformation `F => G`.

This captures the concept of "natural translation".

The naturality condition of natural-transformation
state squares commute.

Which can be viewed as stating that
the arrows in the two embeddings
are "orthogonal" to the transforming arrows.

This concept was the historical origin of category theory,
since Eilenberg and MacLane (1945) used it to formalise
the notion of an equivalence of homology theories,

and then found that for this definition to make sense,
they had to define functors,

(A homology theory is a functor.)

and for functors to make sense,
they had to define categories.

(A homology theory is a functor,
from the category of topology spaces
to the category of abelian-groups.)

```cicada
class NaturalTransformation {
  dom: Category
  cod: Category

  // NOTE The following use of `Functor(dom, cod)`
  //  is an example of fulfilling type.
  src: Functor(dom, cod)
  tar: Functor(dom, cod)

  component(x: dom.Object): cod.Morphism(src.map(x), tar.map(x))

  naturality(
    implicit x: dom.Object,
    implicit y: dom.Object,
    f: dom.Morphism(x, y),
  ): cod.hom_set(src.map(x), tar.map(y)).Eq(
    cod.compose(component(x), tar.fmap(f)),
    cod.compose(src.fmap(f), component(y))
  )
}
```

# Epimorphism

```cicada
class Epimorphism {
  cat: Category
  dom: cat.Object
  cod: cat.Object
  morphism: cat.Morphism(dom, cod)

  cancel_left(
    implicit x: cat.Object,
    implicit f: cat.Morphism(cod, x),
    implicit g: cat.Morphism(cod, x),
    cat.hom_set(dom, x).Eq(
      cat.compose(morphism, f),
      cat.compose(morphism, g)),
  ): cat.hom_set(cod, x).Eq(f, g)
}
```

# Monomorphism

```cicada
class Monomorphism {
  cat: Category
  dom: cat.Object
  cod: cat.Object
  morphism: cat.Morphism(dom, cod)

  cancel_right(
    implicit x: cat.Object,
    implicit f: cat.Morphism(x, dom),
    implicit g: cat.Morphism(x, dom),
    cat.hom_set(x, cod).Eq(
      cat.compose(f, morphism),
      cat.compose(g, morphism)),
  ): cat.hom_set(x, dom).Eq(f, g)
}

// NOTE example:
//   mono: Monomorphism(cat, x, y)
//   mono.morphism: mono.cat.Morphism(x, y)
```

# Isomorphism

Two objects have the same structure iff they are isomorphic,
and an "abstract object" is an isomorphism class of objects.

```cicada
class Isomorphism {
  cat: Category
  dom: cat.Object
  cod: cat.Object
  morphism: cat.Morphism(dom, cod)
  inverse: cat.Morphism(cod, dom)

  inverse_left: cat.hom_set(dom, dom).Eq(
    cat.compose(morphism, inverse),
    cat.id(dom)
  )

  inverse_right: cat.hom_set(cod, cod).Eq(
    cat.compose(inverse, morphism),
    cat.id(cod)
  )
}
```

# Limit

A diagram D in a category C can be seen as a system of constraints,
and then a limit of D represents all possible solutions of the system.

TODO

# Adjoint

To any canonical construction from one species of structure to another
corresponds an adjunction between the corresponding categories.

This captures the concept of "canonical construction".

TODO

# Colimit

TODO

# Comma category

Comma categories are another basic construction that
first appeared in lawvere's thesis.

They tend to arise when morphisms are used as objects.

TODO
