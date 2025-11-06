export class LocalStorage {
  private isClient() {
    return typeof window !== "undefined" && typeof localStorage !== "undefined";
  }

  set<T>(key: string, value: T) {
    if (!this.isClient()) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Erro ao salvar no localStorage:", error);
    }
  }

  get<T>(key: string): T | null {
    if (!this.isClient()) return null;
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } catch (error) {
      console.error("Erro ao ler do localStorage:", error);
      return null;
    }
  }

  remove(key: string) {
    if (!this.isClient()) return;
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Erro ao remover do localStorage:", error);
    }
  }
}
