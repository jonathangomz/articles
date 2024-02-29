import { User } from "./User.model";

export interface Auth {
  user: User | undefined,
  login: (credentials: User) => void,
  logout: () => void,
}