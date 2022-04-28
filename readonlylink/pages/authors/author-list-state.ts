import { UserData } from "../../datatypes/user"

export class AuthorListState {
  users: Array<UserData>

  constructor(users: Array<UserData>) {
    this.users = users.sort((x, y) =>
      new Date(x.created_at) < new Date(y.created_at) ? 1 : -1
    )
  }
}
