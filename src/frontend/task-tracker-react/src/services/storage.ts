export class StorageService {
  private prefix: string;

  constructor(prefix = 'task-tracker') {
    this.prefix = prefix;
  }

  private getKey(key: string): string {
    return `${this.prefix}_${key}`;
  }

  // LocalStorage methods
  setItem<T>(key: string, value: T): void {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(this.getKey(key), serialized);
    } catch (error) {
      console.error(`Failed to save ${key} to localStorage:`, error);
    }
  }

  getItem<T>(key: string, defaultValue?: T): T | undefined {
    try {
      const item = localStorage.getItem(this.getKey(key));
      if (item === null) {
        return defaultValue;
      }
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Failed to read ${key} from localStorage:`, error);
      return defaultValue;
    }
  }

  removeItem(key: string): void {
    try {
      localStorage.removeItem(this.getKey(key));
    } catch (error) {
      console.error(`Failed to remove ${key} from localStorage:`, error);
    }
  }

  clear(): void {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  }

  // SessionStorage methods
  setSessionItem<T>(key: string, value: T): void {
    try {
      const serialized = JSON.stringify(value);
      sessionStorage.setItem(this.getKey(key), serialized);
    } catch (error) {
      console.error(`Failed to save ${key} to sessionStorage:`, error);
    }
  }

  getSessionItem<T>(key: string, defaultValue?: T): T | undefined {
    try {
      const item = sessionStorage.getItem(this.getKey(key));
      if (item === null) {
        return defaultValue;
      }
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Failed to read ${key} from sessionStorage:`, error);
      return defaultValue;
    }
  }

  removeSessionItem(key: string): void {
    try {
      sessionStorage.removeItem(this.getKey(key));
    } catch (error) {
      console.error(`Failed to remove ${key} from sessionStorage:`, error);
    }
  }

  clearSession(): void {
    try {
      const keys = Object.keys(sessionStorage);
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          sessionStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Failed to clear sessionStorage:', error);
    }
  }

  // Cookie methods
  setCookie(name: string, value: string, days = 7): void {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${this.getKey(name)}=${value};${expires};path=/`;
  }

  getCookie(name: string): string | null {
    const nameEQ = `${this.getKey(name)}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  removeCookie(name: string): void {
    document.cookie = `${this.getKey(name)}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  }
}

// Default instance
export const storage = new StorageService();

// Task-specific storage keys
export const STORAGE_KEYS = {
  THEME: 'theme',
  USER_PREFERENCES: 'user_preferences',
  TASK_FILTERS: 'task_filters',
  TASK_SORT: 'task_sort',
  TASK_VIEW_MODE: 'task_view_mode',
} as const;