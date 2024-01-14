比如 cicada 主页的例子

https://cicada-lang.org

写成 sexp：

```scheme
(datatype nat ()
  (zero nat)
  (add1 ((prev nat)) nat))

(claim add (-> nat nat nat))

(define (add x y)
  (recursion (x)
    (zero y)
    ((add1 prev almost) (add1 (=> almost prev)))))
```


```scheme
(claim add-is-commutative
  (pi ((x nat) (y nat))
    (equal nat (add x y) (add y x))))

(define (add-is-commutative x y)
  (induction (x)
    motive (lambda (x) (equal nat (add x y) (add y x)))
    (zero (add-is-commutative-on-zero y))
    ((add1 prev almost)
     (equal-compose
      (equal-map (almost :prev) add1)
      (equal-swap (add-is-commutative-on-add1 y prev))))))
```

```scheme
(class group (monoid)
  (claim inv (-> element element))

  (claim inv-left
    (pi ((x element))
      (equal element (mul (inv x) x) id)))

  (claim inv-right
    (pi ((x element))
      (equal element (mul x (inv x)) id)))

  (claim div (-> element element element))

  (define (div x y) (mul x (inv y))))
```
