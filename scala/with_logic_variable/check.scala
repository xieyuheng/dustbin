package xieyuheng.cicada.with_logic_variable

object check {
  def check(exp: Exp, t: Val) = {
    ???

    // - target must be SumType,
    //   and clauses.keys == target.memberNames
    // - this means we should generate a eliminator
    //   (like `fold`) for every SumType
    //   (but we are using unification and `.field`
    //   instead of pattern matching)

    //   foreach name and body in clauses {
    //     sub <- ctx.loopupVal(name)
    //     ctx :- target :> sub
    //     ctx.unify(target, sub) :- body <: t
    //   }
    //   --------------------
    //   ctx :- Choice(target, clauses) <: t


    // - target can be MemberType or SumType

    //   ctx :- target.map.get(field_name) <: t
    //   ----------------
    //   ctx :- Dot(target, field_name) <: t


    // - Ap

    //   target can be Fn or Pi

    //   target can be SumType or MemberType

    //   ctx :- args <: target.args
    //   ctx.unify(args, target.args) :- target.ret <: t
    //   --------------------
    //   ctx :- Ap(target, args) <: t
  }
}
