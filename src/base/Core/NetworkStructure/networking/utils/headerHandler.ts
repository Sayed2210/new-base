import { useUserStore } from "@/stores/user";

class HeaderHandler {
  private static _instance: HeaderHandler;

  private userStore = useUserStore();

  private constructor() {}

  static get Instance(): HeaderHandler {
    if (!this._instance) {
      this._instance = new HeaderHandler();
    }
    return this._instance;
  }

  getHeader(isAuth = false): { [key: string]: string } {
    const headers: { [key: string]: string } = {};
    const userStore = this.userStore; // Initialize the store here

    const token: string | undefined =
      userStore?.user?.apiToken ||
      "$2y$12$w/mwklNIYDADIa7V/2qzhOeKMyQyYPsJji9f5ATBps/CJEXzkypT2";
    if (userStore?.user !== null) {
      if (isAuth) {
        headers["Authorization"] = "Bearer " + token;
      } else {
        headers["Authorization"] = "Bearer " + token;
      }
    }

    const savedLocale = localStorage.getItem("lang");
    if (savedLocale) {
      headers["Accept-Language"] = savedLocale;
    }
    headers["Content-Type"] = "application/json";
    headers["Accept"] = "application/json";
    headers["Authorization"] = "Bearer " + token;
    return headers;
  }
}

export default HeaderHandler;
