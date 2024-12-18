#include "../index.h"

void
test_builtin_string(void) {
    printf("<test_builtin_string>\n");

    vm_t *vm = vm_init();

    {
        program_t *program = vm_build_program(vm, "test_string_print");
        program_append_literal_string(program, string_clone("hello, world!"));
        program_append_call(program, vm_word(vm, "string_print"));
        program_append_call(program, vm_word(vm, "newline"));

        vm_load_program(vm, program);
        vm_run(vm);
    }

    {
        program_t *program = vm_build_program(vm, "test_string_append");
        program_append_literal_string(program, string_clone("hello, "));
        program_append_literal_string(program, string_clone("world!"));
        program_append_call(program, vm_word(vm, "string_append"));
        program_append_call(program, vm_word(vm, "string_clone"));
        program_append_call(program, vm_word(vm, "string_clone"));
        program_append_call(program, vm_word(vm, "string_append"));
        program_append_call(program, vm_word(vm, "string_print"));
        program_append_call(program, vm_word(vm, "newline"));
        program_append_call(program, vm_word(vm, "string_length"));
        program_append_call(program, vm_word(vm, "int_print"));
        program_append_call(program, vm_word(vm, "newline"));

        vm_load_program(vm, program);
        vm_run(vm);
    }

    {
        const char *code =
            "\"abc\" string_print newline \n"
            "\"123\" string_print // comment \n"
            "newline \n";

        vm_interpret_code(vm, code);
    }

    vm_destroy(&vm);

    printf("</test_builtin_string>\n");
}
