import assert from "assert"
import { Rule } from "@forchange/partech/lib/rule"
import * as AST from "@forchange/partech/lib/tree"
import * as ptc from "@forchange/partech/lib/predefined"
import { ap as $ } from "@forchange/partech/lib/predefined"
import * as Exp from "../script/exp"
import * as Pattern from "../script/pattern"
import * as ScriptTop from "./script-top"

const preserved = [
  "let",
  "fn",
]

const identifier = ptc.identifier_with_preserved("identifier", preserved)

export function top(): Rule {
  return new Rule(
    "top", {
      "let_exp": [ "$", identifier, "=", rhs_exp ],
      "let_fn": [ "$", identifier, "(", $(ptc.non_empty_list, pattern_entry), ")", "=", rhs_exp ],
      "mount_exp_inline": [ "@", "mount", "(", exp, ")", ptc.newline ],
      "mount_exp_headline": [ "@", "mount", ":", exp, ptc.newline ],
    })
}

export const top_matcher =
  AST.Node.matcher_with_span<ScriptTop.ScriptTop>(
    span => [
      "top", {
        "let_exp": ([, name, , rhs_exp ]) =>
          new ScriptTop.LetExp(AST.Leaf.word(name), rhs_exp_matcher(rhs_exp)),
        "let_fn": ([, name, , pattern_entry_list, , , rhs_exp ]) =>
          new ScriptTop.LetExp(
            AST.Leaf.word(name),
            new Exp.Fn(
              ptc.non_empty_list_matcher(pattern_entry_matcher)(pattern_entry_list),
              rhs_exp_matcher(rhs_exp))),
        "plain_var": ([ , name ]) =>
          new ScriptTop.MountExp(new Exp.Var(AST.Leaf.word(name))),
        "plain_var_newline": ([ , name, ]) =>
          new ScriptTop.MountExp(new Exp.Var(AST.Leaf.word(name))),
        "mount_exp_inline": ([ , , , exp, , ]) =>
          new ScriptTop.MountExp(exp_matcher(exp)),
        "mount_exp_headline": ([ , , , exp, ]) =>
          new ScriptTop.MountExp(exp_matcher(exp)),
      }
    ])

export function rhs_exp(): Rule {
  return new Rule(
    "rhs_exp", {
      "exp": [ exp, ptc.newline ],
      "suite": [ ptc.newline, suite ],
    })
}

export const rhs_exp_matcher: (tree: AST.Tree) => Exp.Exp =
  AST.Node.matcher_with_span<Exp.Exp>(
    span => [
      "rhs_exp", {
        "exp": ([ exp,  ]) => exp_matcher(exp),
        "suite": ([ , suite ]) => suite_matcher(suite),
      }
    ])

export function suite(): Rule {
  return new Rule(
    "suite", {
      "suite": [ ptc.indent, $(ptc.non_empty_list, suite_entry), ptc.dedent ],
    })
}

export const suite_matcher =
  AST.Node.matcher_with_span<Exp.Suite>(
    span => [
      "suite", {
        "suite": ([ , suite_entry_list, ]) =>
          new Exp.Suite(ptc.non_empty_list_matcher(suite_entry_matcher)(suite_entry_list))
      }
    ])

export function suite_entry(): Rule {
  return new Rule(
    "suite_entry", {
      "let_exp": [ "let", "$", identifier, "=", rhs_exp ],
      "exp": [ exp ],
      "exp_newline": [ exp, ptc.newline ],
    })
}

export const suite_entry_matcher =
  AST.Node.matcher_with_span<Exp.SuiteEntry>(
    span => [
      "suite_entry", {
        "let_exp": ([ , , name, , rhs_exp ]) =>
          new Exp.SuiteEntryLetExp(AST.Leaf.word(name), rhs_exp_matcher(rhs_exp)),
        "exp": ([ exp ]) =>
          new Exp.SuiteEntryExp(exp_matcher(exp)),
        "exp_newline": ([ exp, ]) =>
          new Exp.SuiteEntryExp(exp_matcher(exp)),
      }
    ])

export function block_args(): Rule {
  return new Rule(
    "block_args", {
      "block_args": [ ptc.indent, $(ptc.non_empty_list, block_args_entry), ptc.dedent ],
    })
}

export const block_args_matcher =
  AST.Node.matcher_with_span<Array<Exp.Exp>>(
    span => [
      "block_args", {
        "block_args": ([ , block_args_entry_list, ]) =>
          ptc.non_empty_list_matcher(block_args_entry_matcher)(block_args_entry_list)
      }
    ])

export function block_args_entry(): Rule {
  return new Rule(
    "block_args_entry", {
      "exp": [ exp ],
      "exp_newline": [ exp, ptc.newline ],
    })
}

export const block_args_entry_matcher =
  AST.Node.matcher_with_span<Exp.Exp>(
    span => [
      "block_args_entry", {
        "exp": ([ exp ]) =>
          exp_matcher(exp),
        "exp_newline": ([ exp, ]) =>
          exp_matcher(exp),
      }
    ])

export function exp(): Rule {
  return new Rule(
    "exp", {
      "var": [ "$", identifier ],
      "str": [ ptc.double_quoted_string ],
      "num": [ ptc.digit ],
      "fn": [ "fn", "(", $(ptc.non_empty_list, pattern_entry), ")", "=", ">", rhs_exp ],
      "ap_inline": [ exp, "(", $(ptc.non_empty_list, arg_entry), ")" ],
      "ap_block": [ exp, ":", ptc.newline, block_args ],
      "data_cons": [ identifier ],
    })
}

export const exp_matcher: (tree: AST.Tree) => Exp.Exp =
  AST.Node.matcher_with_span<Exp.Exp>(
    span => [
      "exp", {
        "var": ([ , name ]) =>
          new Exp.Var(AST.Leaf.word(name)),
        "str": ([ str ]) => {
          let s = AST.Leaf.word(str)
          return new Exp.Str(s.slice(1, s.length - 1))
        },
        "num": ([ digit ]) => {
          let s = AST.Leaf.word(digit)
          return new Exp.Num(Number.parseInt(s))
        },
        "fn": ([ , , pattern_entry_list, , , , rhs_exp ]) =>
          new Exp.Fn(
            ptc.non_empty_list_matcher(pattern_entry_matcher)(pattern_entry_list),
            rhs_exp_matcher(rhs_exp)),
        "ap_inline": ([ target, , arg_entry_list, ]) =>
          new Exp.Ap(
            exp_matcher(target),
            ptc.non_empty_list_matcher(arg_entry_matcher)(arg_entry_list)),
        "ap_block": ([ target, , , block_args ]) =>
          new Exp.Ap(
            exp_matcher(target),
            block_args_matcher(block_args)),
        "data_cons": ([ name ]) =>
          new Exp.DataCons(AST.Leaf.word(name)),
      }
    ])

function arg_entry(): Rule {
  return new Rule(
    "arg_entry", {
      "arg": [exp],
      "arg_comma": [exp, ","],
    })
}

const arg_entry_matcher =
  AST.Node.matcher_with_span<Exp.Exp>(
    span => [
      "arg_entry", {
        "arg": ([exp]) => exp_matcher(exp),
        "arg_comma": ([exp, _]) => exp_matcher(exp),
      }
    ])

export function pattern(): Rule {
  return new Rule(
    "pattern", {
      "var": [ "$", identifier ],
      "data_no_children": [ identifier ],
      "data": [ identifier, "(", $(ptc.non_empty_list, pattern_entry), ")" ],
    })
}

export const pattern_matcher: (tree: AST.Tree) => Pattern.Pattern =
  AST.Node.matcher_with_span<Pattern.Pattern>(
    span => [
      "pattern", {
        "var": ([, name ]) =>
          new Pattern.Var(AST.Leaf.word(name)),
        "data_no_children": ([ name ]) =>
          new Pattern.Data(AST.Leaf.word(name)),
        "data": ([ name, , pattern_entry_list, ]) =>
          new Pattern.Data(
            AST.Leaf.word(name),
            ptc.non_empty_list_matcher(pattern_entry_matcher)(pattern_entry_list)),
      }
    ])

export function pattern_entry(): Rule {
  return new Rule(
    "pattern_entry", {
      "pattern": [ pattern ],
      "pattern_comma": [ pattern, "," ],
    })
}

export const pattern_entry_matcher: (tree: AST.Tree) => Pattern.Pattern =
  AST.Node.matcher_with_span<Pattern.Pattern>(
    span => [
      "pattern_entry", {
        "pattern": ([ pattern ]) => pattern_matcher(pattern),
        "pattern_comma": ([ pattern, ]) => pattern_matcher(pattern),
      }
    ])
