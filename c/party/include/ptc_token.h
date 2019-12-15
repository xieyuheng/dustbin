#ifndef __ptc_token_h_included__
#define __ptc_token_h_included__

ptc_token_t *
ptc_token_new (void);

void
ptc_token_destroy (ptc_token_t **self_p);

void
ptc_token_test(bool verbose);

const char *
ptc_token_str(ptc_token_t *self);

void
ptc_token_set_str(ptc_token_t *self, const char *str);

#endif
