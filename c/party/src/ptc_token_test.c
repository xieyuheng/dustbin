#include "ptc_classes.h"

int main() {
  printf("* ptc_token: ");
  ptc_token_t *token = ptc_token_new();
  ptc_token_destroy(&token);
  ptc_token_destroy(&token); // double destroy
  printf("OK\n");
}
