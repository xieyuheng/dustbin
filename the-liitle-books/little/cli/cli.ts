import { program } from "@caporal/core"
import * as cli_book from "./cli-book"
import * as ut from "../ut"

export function run(config: any): void {
  program.name("little")
  program.version(config.version)
  program.description("Command line interface of the-little-books.")

  program
    .command("help", "Print help message.")
    .default()
    .action(({}) => {
      program.exec(["help"]).catch((error) => {
        console.error(error)
      })
    })

  program
    .command("book", "Start a book server.")
    .argument("<file>", "A xml book file.")
    .option("--host <string>", "host")
    .option("--port <number>", "port")
    .action(({ args, options }) => cli_book.run(is_string(args.file), options))

  program.run()
}

function is_string(x: any): string {
  if (typeof x === "string") {
    return x
  } else {
    throw new Error(`Expecting string while find: ${ut.inspect(x)}.`)
  }
}
