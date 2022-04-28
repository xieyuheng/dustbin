import { History } from "../../models/history"

export class HistoryState {
  history: History

  constructor(opts: { history: History }) {
    this.history = opts.history
  }

  static async build(): Promise<HistoryState> {
    return new HistoryState({
      history: await History.load(),
    })
  }
}
