#include "index.h"

struct value_stack_t {
    size_t size;
    value_t *values;
    size_t cursor;
};

value_stack_t *
value_stack_new(size_t size) {
    value_stack_t *self = allocate(sizeof(value_stack_t));
    self->size = size;
    self->values = allocate_array(size, sizeof(value_t));
    self->cursor = 0;
    return self;
}

void
value_stack_destroy(value_stack_t **self_pointer) {
    assert(self_pointer);
    if (*self_pointer) {
        value_stack_t *self = *self_pointer;
        free(self->values);
        free(self);
        *self_pointer = NULL;
    }
}

value_t
value_stack_pop(value_stack_t *self) {
    assert(self->cursor > 0);
    self->cursor--;
    value_t value = self->values[self->cursor];
    return value;
}

void
value_stack_push(value_stack_t *self, value_t value) {
    self->values[self->cursor] = value;
    self->cursor++;
}

bool
value_stack_is_empty(value_stack_t *self) {
    return self->cursor == 0;
}
