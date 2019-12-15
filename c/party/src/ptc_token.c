#include "ptc_classes.h"

struct _ptc_token_t {
  char * str;
  size_t lo;
  size_t hi;
};

ptc_token_t *
ptc_token_new(void) {
  ptc_token_t *self = (ptc_token_t *)zmalloc(sizeof(ptc_token_t));
  assert(self);
  return self;
}

void
ptc_token_destroy(ptc_token_t **self_p) {
  assert(self_p);
  if (*self_p) {
    ptc_token_t *self = *self_p;
    free(self);
    *self_p = NULL;
  }
}

const char *
ptc_token_str(ptc_token_t *self) {
  assert(self);
  return self->str;
}

void
ptc_token_set_str(ptc_token_t *self, const char *str) {
  assert(self);
  free(self->str);
  self->str = strdup(str);
}
