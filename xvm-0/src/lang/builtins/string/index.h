#pragma once

void _string_print(const vm_t *vm);
void _string_clone(const vm_t *vm);
void _string_free(const vm_t *vm);
void _string_equal(const vm_t *vm);
void _string_length(const vm_t *vm);
void _string_append(const vm_t *vm);

void define_string_builtins(vm_t *vm);
