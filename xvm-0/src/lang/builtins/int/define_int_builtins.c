#include "../../index.h"

void
define_int_builtins(vm_t *vm) {
    vm_define_primitive(vm, "int_print", _int_print);
    vm_define_primitive(vm, "eq", _eq);
    vm_define_primitive(vm, "gt", _gt);
    vm_define_primitive(vm, "lt", _lt);
    vm_define_primitive(vm, "gteq", _gteq);
    vm_define_primitive(vm, "lteq", _lteq);
    vm_define_primitive(vm, "add", _add);
    vm_define_primitive(vm, "sub", _sub);
    vm_define_primitive(vm, "mul", _mul);
}
