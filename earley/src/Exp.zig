const String = []const u8;

pub const Exp = union(enum) {
    v: struct { name: String },
    bind: struct { name: String, exp: *const Exp },
    ap: struct { target: *const Exp, args: []const Exp },
    str: struct { value: String },
    grammar: struct { name: String, choices: []const Choice },
    // pattern: struct { label: String, value: String },
};

pub const Choice = struct { name: String, body: []const Exp };

pub fn v(name: String) Exp {
    return Exp{ .v = .{ .name = name } };
}

pub fn bind(name: String, exp: Exp) Exp {
    return Exp{ .bind = .{ .name = name, .exp = &exp } };
}

pub fn ap(target: Exp, args: []const Exp) Exp {
    return Exp{ .ap = .{ .target = &target, .args = args } };
}

pub fn str(value: String) Exp {
    return Exp{ .str = .{ .value = value } };
}

pub fn choice(name: String, body: []const Exp) Choice {
    return Choice{ .name = name, .body = body };
}

pub fn grammar(name: String, choices: []const Choice) Exp {
    return Exp{ .grammar = .{ .name = name, .choices = choices } };
}

const std = @import("std");
const stderr = std.io.getStdErr().writer();

test "shallow embedding" {
    const exp1 = ap(v("f"), &.{ v("x"), v("y") });
    try stderr.print("{}", .{exp1});

    const exp2 = grammar("sexp", &.{choice("var", &.{ bind("name", v("f")), v("x"), v("y") })});

    // defineGrammar(&mod, "sexp")
    //     .choice("var", &.{bind("name", v("x"))})
    //     .choice("list", &.{ str("("), v("sexp"), str(")") });

    try stderr.print("{}", .{exp2});
}
