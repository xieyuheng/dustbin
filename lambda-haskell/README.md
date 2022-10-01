# Lambda Calculus in Haskell

> More restraint and more pure, <br>
> so functional and so reduced.
>
> -- Anonymous Bauhaus Student

An implementation of [(Untyped) Lambda Calculus](https://en.wikipedia.org/wiki/Lambda_calculus).

TODO Maybe no concrete syntax.

- Use [S-expression](https://github.com/cicada-lang/sexp) as overall syntax.
- Implement call-by-need lazy evaluation.
- Allow recursive in top-level definitions.
  - No mutual recursion, a name must be defined before used.
- A simple module system with only one API -- `(import)`.
  - It can import module from local file or remote URL.
- Two simple testing statements `(assert-equal)` and `(assert-not-equal)`.
  - They can handle beta and eta equivalence.

## Usage

TODO

## Examples

TODO

## Development

```
TODO
```

## Contributions

> Be polite, do not bring negative emotion to others.

- [TODO.md](TODO.md)
- [STYLE-GUIDE.md](STYLE-GUIDE.md)
- [CODE-OF-CONDUCT.md](CODE-OF-CONDUCT.md)
- When contributing, add yourself to [AUTHORS](AUTHORS)

## License

- [GPLv3](LICENSE)
