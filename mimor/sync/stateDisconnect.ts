import { State } from './State'

export async function stateDisconnect(state: State): Promise<void> {
  delete state.connection
}
