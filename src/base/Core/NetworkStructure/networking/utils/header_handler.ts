import { useUserStore } from "@/stores/user";

class HeaderHandler {
  private static _instance: HeaderHandler;

  private userStore = useUserStore();

  private constructor() { }

  static get Instance(): HeaderHandler {
    if (!this._instance) {
      this._instance = new HeaderHandler();
    }
    return this._instance;
  }

  getHeader(isAuth = false): { [key: string]: string } {
    const headers: { [key: string]: string } = {};
    const userStore = this.userStore; // Initialize the store here

    if (userStore?.user !== null) {
      const token: string | undefined = userStore?.user?.apiToken;
      if (isAuth) {
        headers["Authorization"] = "Bearer " + (token ?? "1|UgKKoMkiVaHKGufYYGGO8QeKVArm7gN8bkvTJpovb4f4021b");
      }
      else {
        headers["Authorization"] = "Bearer " + "1|qpZaF5bd6VuzEOAInA5nNjVJETOcnZRTKUdkOVmidb677908";
      }
    }

    const savedLocale = localStorage.getItem("lang");
    if (savedLocale) {
      headers["Accept-Language"] = savedLocale;
    }
    headers["Content-Type"] = "application/json";
    headers["Accept"] = "application/json";

    return headers;
  }
}

export default HeaderHandler;
