import { generateId } from ".";
import { User } from "../interfaces/user";
import { LocalStorage } from "./localstorage";

export class LocalUser {
  user: User | null;

  constructor(private localStorage: LocalStorage, userName?: string) {
    const user = this.localStorage.get<string>("localUser");
    if (!user) {
      if (!userName) {
        this.user = null;
        return;
      }

      const newUser = { id: generateId("p_"), name: userName || "Usuário" };
      this.localStorage.set("localUser", JSON.stringify(newUser));
      this.user = newUser;

      return;
    }

    this.user = JSON.parse(user);
  }
}
