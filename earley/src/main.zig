const std = @import("std");
const expect = @import("std").testing.expect;
const stdout = std.io.getStdOut().writer();
const stderr = std.io.getStdErr().writer();

const Exp = @import("./Exp.zig").Exp;

pub fn main() !void {
    try stdout.print("{any}\n", .{Exp.v});
}
