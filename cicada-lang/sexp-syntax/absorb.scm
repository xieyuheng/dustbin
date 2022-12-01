(import "BooleanLattice.cic" BooleanLattice)
(import "dual.cic" dual)
(import "bound.cic" topBound bottomBound)
(import "../equality/index.cic" equalMap equalSwap equalCompose)

// Absorption law

// - https://en.wikipedia.org/wiki/Absorption_law
// - https://en.wikipedia.org/wiki/Absorption_(logic)

// The terminology, which might be introduced
// by Russell and Whitehead, is very confusing.

(claim joinAbsorbMeet
  (Pi ([lattice BooleanLattice]
       [x (lattice :Element)]
       [y (lattice :Element)])
    (Equal
     (lattice :Element)
     (lattice :join x (lattice :meet x y))
     x)))
(define (joinAbsorbMeet lattice x y)
  (equivalent
   (lattice :Element)

   (lattice :join x (lattice :meet x y))
   (lattice :join (lattice :meet x (lattice :top)) (lattice :meet x y))
   (equalSwap lattice.meetDistributeJoin(x, lattice.top, y))
   = lattice.meet(x, lattice.join(lattice.top, y))
   -- equalMap(
               (z: (lattice :Element)) => lattice.meet(x, z),
               lattice.joinCommutative(lattice.top, y),
               )
   = lattice.meet(x, lattice.join(y, lattice.top))
   -- equalMap(
               (z: (lattice :Element)) => lattice.meet(x, z),
               topBound(lattice, y),
               )
   = lattice.meet(x, lattice.top)
   -- lattice.topIdMeet(x)
   = x
   )

  )


function meetAbsorbJoin(
  lattice: BooleanLattice,
  x: (lattice :Element),
  y: (lattice :Element),
): Equal(
  (lattice :Element),
  lattice.meet(x, lattice.join(x, y)),
  x,
) {
  return joinAbsorbMeet(dual(lattice), x, y)
}
