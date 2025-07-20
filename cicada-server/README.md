# Cicada Server

A serverless function that can run [**cicada**](https://github.com/cicada-lang/cicada) code.

## Usage

Run a file:

```bash
curl https://cic.run --data-binary @<file>
```

Run multiline text (bash and zsh):

```bash
curl https://cic.run --data-binary @-<< END

function id(T: Type, x: T): T {
  return x
}

compute id(String, "Hello, World!")

END
```

## License

[GPLv3](LICENSE)
