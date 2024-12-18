#include "index.h"
#include "../lang/index.h"

static int run(char **args);

void
repl_command(const commander_t *runner) {
    command_t *command = command_new("repl");
    command->description = "start the read-eval-print-loop";
    command->run = run;
    commander_add(runner, command);
}

int
run(char **args) {
    (void) args;

    printf("%s\n", X_VERSION);

    return 0;
}
