#include "../../index.h"

void _int_print(const vm_t *vm) {
    int_t value = vm_value_stack_pop(vm);
    printf("%ld", value);
}

void _eq(const vm_t *vm) {
    int_t right = vm_value_stack_pop(vm);
    int_t left = vm_value_stack_pop(vm);
    vm_value_stack_push(vm, left == right);
}

void _gt(const vm_t *vm) {
    int_t right = vm_value_stack_pop(vm);
    int_t left = vm_value_stack_pop(vm);
    vm_value_stack_push(vm, left > right);
}

void _lt(const vm_t *vm) {
    int_t right = vm_value_stack_pop(vm);
    int_t left = vm_value_stack_pop(vm);
    vm_value_stack_push(vm, left < right);
}

void _gteq(const vm_t *vm) {
    int_t right = vm_value_stack_pop(vm);
    int_t left = vm_value_stack_pop(vm);
    vm_value_stack_push(vm, left >= right);
}

void _lteq(const vm_t *vm) {
    int_t right = vm_value_stack_pop(vm);
    int_t left = vm_value_stack_pop(vm);
    vm_value_stack_push(vm, left <= right);
}

void _add(const vm_t *vm) {
    int_t x = vm_value_stack_pop(vm);
    int_t y = vm_value_stack_pop(vm);
    vm_value_stack_push(vm, x + y);
}

void _sub(const vm_t *vm) {
    int_t x = vm_value_stack_pop(vm);
    int_t y = vm_value_stack_pop(vm);
    vm_value_stack_push(vm, y - x);
}

void _mul(const vm_t *vm) {
    int_t x = vm_value_stack_pop(vm);
    int_t y = vm_value_stack_pop(vm);
    vm_value_stack_push(vm, x * y);
}
