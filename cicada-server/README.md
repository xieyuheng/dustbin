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

## Contributions

To make a contribution, fork this project and create a pull request.

Please read the [STYLE-GUIDE.md](STYLE-GUIDE.md) before you change the code.

Remember to add yourself to [AUTHORS](AUTHORS).
Your line belongs to you, you can write a little
introduction to yourself but not too long.

## License

[GPLv3](LICENSE)
