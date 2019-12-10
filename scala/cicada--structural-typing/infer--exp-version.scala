package xieyuheng.cicada

import collection.immutable.ListMap

object infer {

  def infer(ctx: Ctx, exp: Exp): Either[Err, Exp] = {
    exp match {
      case Var(name: String) =>
        ctx.lookup_type(name) match {
          case Some(t) => Right(t)
          case None => Left(Err(s"can not find var: ${name} in ctx"))
        }

      case Type() =>
        Right(Type())

      case Pi(arg_map: ListMap[String, Exp], return_type: Exp) =>
        Right(Type())

      case Fn(arg_map: ListMap[String, Exp], body: Exp) =>
        for {
          return_type <- infer(ctx.ext_map(arg_map), body)
        } yield Pi(arg_map, return_type)

      case Ap(target: Exp, arg_list: List[Exp]) =>
        // TODO
        // infer the target and normalize to a pi
        ???

      case Cl(type_map: ListMap[String, Exp]) =>
        Right(Type())

      case Obj(value_map: ListMap[String, Exp]) =>
        for {
          type_map <- util.list_map_map_maybe_err(value_map) {
            case (_name, exp) => infer(ctx, exp)
          }
        } yield Cl(type_map)

      case Dot(target: Exp, field: String) =>
        // TODO
        // normalize(ctx, )
        // after we infer target we will get an exp
        //   we need to eval the exp, and expect to get a ValCl
        //   but we do not have env to call eval
        // maybe we can generate a env from ctx
        //   but the result of eval will be a Val instead of Exp
        //   maybe we already need readback here?
        ???

      case Block(let_map: ListMap[String, Exp], body: Exp) =>
        var local_ctx = ctx
        for {
          _ <- util.list_map_map_maybe_err(let_map) {
            case (name, exp) =>
              infer(ctx, exp).map {
                case t =>
                  local_ctx = local_ctx.ext(name, t)
                  t
              }
          }
          result <- infer(local_ctx, body)
        } yield result
    }
  }

}
