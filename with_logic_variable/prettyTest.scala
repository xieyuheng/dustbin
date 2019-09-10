package xieyuheng.cicada.with_logic_variable

import xieyuheng.cicada.with_logic_variable.expDSL._
import xieyuheng.cicada.with_logic_variable.pretty._

object prettyTest extends App {
  val `pretty can make Exp pretty` = {

    println(s"------")

    val t = prettyExp(Type())

    println(s"t: ${t}")

    val three_zeros = prettyExp(
      "cons_t" ap %(
        "A" -> "nat_t",
        "head" -> "zero_t",
        "tail" -> ("cons_t" ap %(
          "A" -> "nat_t",
          "head" -> "zero_t",
          "tail" -> ("cons_t" ap %(
            "A" -> "nat_t",
            "head" -> "zero_t",
            "tail" -> "null_t"))))))

    println(s"three_zeros: ${three_zeros}")

    val fn = prettyExp(
      Fn(
        args = %(
          "x" -> "nat_t",
          "y" -> "nat_t"),
        ret = "nat_t",
        body = "zero_t"))

    println(s"fn: ${fn}")

    val nestedFn = prettyExp(
      Fn(
        args = %(
          "x" -> "nat_t",
          "y" -> "nat_t"),
        ret = Pi(
          args = %(
            "x" -> "nat_t",
            "y" -> "nat_t"),
          ret = "nat_t"),
        body = Fn(
          args = %(
            "x" -> "nat_t",
            "y" -> "nat_t"),
          ret = "nat_t",
          body = "zero_t")))

    println(s"nestedFn: ${nestedFn}")
    println(s"------")
  }
}
