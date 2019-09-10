package xieyuheng.cicada

import scala.util.parsing.combinator._

object parser extends RegexParsers {
  override def skipWhitespace = true
  override val whiteSpace = "[ \t\r\f]+".r

  def identifier: Parser[String] = {
    "[a-zA-Z_][a-zA-Z0-9_]*".r
  }

  // Def

  // Exp

  def pExp: Parser[Exp] = (
    pDot
      | pType
      // | pThe
      // | pCase
      | pVar
      // | pPi
      // | pFn
      // | pAp
  )

  def pVar: Parser[Var] = {
    identifier ^^ { Var(_) }
  }

  def pType: Parser[Type] = {
    "type_t" ^^ { _ => Type() }
  }

  def pThe: Parser[The] = {
    pExp ^^ { The(_) }
  }

  // // final case class Case(target: Exp, map: MultiMap[String, Exp]) extends Exp

  def pLetValue: Parser[(String, Exp)] = {
    identifier ~ "=" ~ pExp ^^ {
      case name ~ _ ~ exp =>
        (name, exp)
    }
  }

  def pLetType: Parser[(String, Exp)] = {
    identifier ~ ":" ~ pExp ^^ {
      case name ~ _ ~ exp =>
        (name, exp)
    }
  }

  def pLet: Parser[(String, Exp)] = (
    pLetValue | pLetType
  )

  // // def pArgs: Parser[MultiMap[String, Exp]] = P(
  // //   "(" ~ space ~ pLet.rep.! ~ space ~ ")"
  // // ).map(MultiMap.fromList(_))

  def pDot: Parser[Dot] = {
    pExp ~ "." ~ identifier ^^ {
      case target ~ _ ~ fieldName =>
        Dot(target, fieldName)
    }
  }


  // // final case class Pi(args: MultiMap[String, Exp], ret: Exp) extends Exp

  // // final case class Fn(args: MultiMap[String, Exp], ret: Exp, body: Exp) extends Exp
  // // final case class Ap(target: Exp, args: MultiMap[String, Exp]) extends Exp
}

object parserTest extends App {

  println(parser.parse(parser.identifier, "ty__pe_t"))
  println(parser.parse(parser.identifier, "_0"))
  // println(parser.parse(parser.identifier, "0_"))

  println(parser.parse(parser.pType, "type_t"))
  println(parser.parse(parser.pVar, "nat_t"))

  println(parser.parse(parser.pDot, "A.B"))
  println(parser.parse(parser.pVar, "A.B"))
  println(parser.parse(parser.pLet, "x : A.B"))

  // val failure = parse("x : A", parser.pLet(_)).asInstanceOf[Parsed.Failure]
  // println(failure.trace().longAggregateMsg)
}
