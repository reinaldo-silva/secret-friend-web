import Cookies from "js-cookie";
import { generateId } from ".";
import { User } from "../interfaces/user";

export class LocalUser {
  user: User | null;

  constructor(userName?: string) {
    const user = Cookies.get("userLocal");
    if (!user) {
      if (!userName) {
        this.user = null;
        return;
      }

      const newUser = { id: generateId("p_"), name: userName || "Usuário" };
      Cookies.set("userLocal", JSON.stringify(newUser));
      this.user = newUser;

      return;
    }

    this.user = JSON.parse(user);
  }
}
