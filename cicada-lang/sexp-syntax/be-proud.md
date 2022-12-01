比如 cicada 主页的例子

https://cicada-lang.org

写成 sexp：

```scheme
(datatype Nat ()
  (zero Nat)
  (add1 ((prev Nat)) Nat))

(claim add (-> Nat Nat Nat))

(define (add x y)
  (recursion (x)
    (zero y)
    ((add1 prev almost) (add1 (=> almost prev)))))
```


```scheme
(claim add-is-commutative
  (Pi ((x Nat) (y Nat))
    (Equal Nat (add x y) (add y x))))

(define (add-is-commutative x y)
  (induction (x)
    motive (lambda (x) (Equal Nat (add x y) (add y x)))
    (zero (add-is-commutative-on-zero y))
    ((add1 prev almost)
     (equal-compose
      (equal-map (almost :prev) add1)
      (equal-swap (add-is-commutative-on-add1 y prev))))))
```

```scheme
(class Group (Monoid)
  (claim inv (-> Element Element))

  (claim inv-left
    (Pi ((x Element))
      (Equal Element (mul (inv x) x) id)))

  (claim inv-right
    (Pi ((x Element))
      (Equal Element (mul x (inv x)) id)))

  (claim div (-> Element Element Element))

  (define (div x y) (mul x (inv y))))
```
