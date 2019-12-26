def subtype_class(
  ctx: Ctx,
  s_defined: ListMap[String, (Value, Value)], s_map: ListMap[String, Exp], s_env: Env,
  t_defined: ListMap[String, (Value, Value)], t_map: ListMap[String, Exp], t_env: Env,
): Unit = {
  var local_env = t_env
  t_defined.foreach {
    case (name, (t, v)) =>
      s_defined.get(name) match {
        case Some((s, u)) =>
          subtype(ctx, s, t)
          equivalent(ctx, u, v)
        case None =>
          v match {
            // NOTE a chance to give free variable proof
            //   but this is not good
            //   we need bi-directional type checking
            case free_variable: NeutralVar =>
              s_map.get(name) match {
                case Some(s) =>
                  subtype(ctx, eval(s_env, s), t)
                  equivalent(ctx, free_variable, v)
                case None =>
                  throw Report(List(
                    s"subtype_class can not find field in defined: ${name}\n"
                  ))
              }
            case _ =>
              throw Report(List(
                s"subtype_class can not find field in defined: ${name}\n"
              ))
          }
      }
  }
  t_map.foreach {
    case (name, t) =>
      s_map.get(name) match {
        case Some(s) =>
          subtype(ctx, eval(s_env, s), eval(local_env, t))
        case None =>
          s_defined.get(name) match {
            case Some((s, u)) =>
              local_env = local_env.ext(name, u)
              subtype(ctx, s, eval(local_env, t))
            case None =>
              throw Report(List(
                s"subtype_class can not find field in telescope: ${name}\n"
              ))
          }
      }
  }
}
