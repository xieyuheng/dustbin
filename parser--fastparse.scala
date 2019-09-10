package xieyuheng.cicada

import fastparse._, NoWhitespace._

object parser {

  def space[_: P]: P[Unit] = P(
    (" " | "\t" | "\n").rep
  )

  def digits[_: P]: P[String] = P(
    CharIn("0-9").rep(1).!
  )

  def alphabets[_: P]: P[String] = P(
    CharIn("a-zA-Z").rep(1).!
  )

  def identifierOrDigits[_: P]: P[String] = P(
    CharIn("_0-9a-zA-Z\\-").rep(1).!
  )

  def identifier[_: P]: P[String] = P(
    identifierOrDigits.filter(_.exists(!_.isDigit)).!
  )

  // Def

  // Exp

  def pExp[_: P]: P[Exp] = P(
    pVar ~ !"."
      | pType
      // | pThe
      // | pCase
      | pDot
      // | pPi
      // | pFn
      // | pAp
  )

  def pVar[_: P]: P[Var] = P(
    identifier.!
  ).map(Var(_))

  def pType[_: P]: P[Type] = P(
    "type_t"
  ).map(_ => Type())

  def pThe[_: P]: P[The] = P(
    pExp
  ).map(The(_))

  // final case class Case(target: Exp, map: MultiMap[String, Exp]) extends Exp

  def pLetValue[_: P]: P[(String, Exp)] = P(
    identifier ~  space ~ "=" ~ space ~ pExp ~ space
  )

  def pLetType[_: P]: P[(String, Exp)] = P(
    identifier ~  space ~ ":" ~ space ~ pThe ~ space
  )

  def pLet[_: P]: P[(String, Exp)] = P(
    pLetValue | pLetType
  )

  // def pArgs[_: P]: P[MultiMap[String, Exp]] = P(
  //   "(" ~ space ~ pLet.rep.! ~ space ~ ")"
  // ).map(MultiMap.fromList(_))

  def pDot[_: P]: P[Dot] = P(
    pExp ~ space ~ "." ~ space ~ identifier
  ).map(Dot.tupled(_))

  // final case class Pi(args: MultiMap[String, Exp], ret: Exp) extends Exp

  // final case class Fn(args: MultiMap[String, Exp], ret: Exp, body: Exp) extends Exp
  // final case class Ap(target: Exp, args: MultiMap[String, Exp]) extends Exp
}

object parserTest extends App {
  // println(parse("", parser.space(_)))
  // println(parse("type_t", parser.pType(_)))
  // println(parse("ty__pe_t", parser.identifier(_)))
  // println(parse("_000000", parser.identifier(_)))
  // println(parse("nat_t", parser.pVar(_)))

  // println(parse("A.B", parser.pDot(_)))
  // println(parse("A.B", parser.pVar(_)))
  println(parse("x : A.B", parser.pLet(_)))

  // val failure = parse("x : A", parser.pLet(_)).asInstanceOf[Parsed.Failure]
  // println(failure.trace().longAggregateMsg)

}
