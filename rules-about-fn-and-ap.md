# Review rules about non-implicit `Fn` and `Ap`

``` typescript
Pi(name: string, arg_t: Exp, ret_t: Exp)
Fn(name: string, ret: Exp)
Ap(target: Exp, arg: Exp)

infer(ctx, Pi(name, arg_t, ret_t)) {
  arg_t_core = check(ctx, arg_t, Type)
  ret_t_core = check(ctx.extend(name, arg_t_core), ret_t, Type)
  [ Type, PiCore(name, arg_t_core, ret_t_core) ]
}

check(ctx, Fn(name, ret), Pi(name, arg_t, ret_t)) {
  check(ctx.extend(name, arg_t), ret, ret_t)
}

infer(ctx, Ap(target, arg)) {
  [ Pi(name, arg_t, ret_t), target_core ] = infer(ctx, target)
  arg_core = check(ctx.extend(name, arg_t), ret_t, Type)
  [ ret_t.solution(name, arg_core), ApCore(target_core, arg_core) ]
}
```

# The rules about implicit `Fn` and `Ap`

``` typescript
ImPi(given: { name: string, arg_t }, name: string, arg_t: Exp, ret_t: Exp)
ImFn(given: { name: string }, name: string, ret: Exp)
ImAp(target: Exp, arg: Exp)

infer(ctx, ImPi(given, name, arg_t, ret_t)) {
  ...
  [ Type, ImPiCore(given, name, arg_t_core, ret_t_core) ]
}

check(ctx, Fn(name, ret), ImPi(given, name, arg_t, ret_t)) {
  fn_core = check(ctx.extend(given.name, given.arg_t).extend(name, arg_t), ret, ret_t)
  ImFnCore(...)
}

infer(ctx, Ap(target, arg)) {
  [ ImPi(given, name, arg_t, ret_t), target_core ] = infer(ctx, target)
  [ arg_t_value, arg_core ] = infer(ctx, arg)
  solution = solve(arg_t_value, arg_t)
  arg_core = check(ctx.extend(name, arg_t), ret_t, Type)
  [ ret_t.solution(name, arg_core).reify(solution),
    ApCore(
      ImApCore(
        target_core,
        solution.find(given.name)),
      arg_core).reify(solution)
   ]
}
```
