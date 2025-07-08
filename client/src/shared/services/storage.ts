import { STORAGE_KEYS } from '@/src/shared/constants';
import { MMKV } from 'react-native-mmkv';

// Initialize MMKV storage
const mmkvStorage = new MMKV();

export class StorageService {
  private static instance: StorageService;
  private storage: MMKV;

  private constructor() {
    this.storage = mmkvStorage;
  }

  public static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  // Generic methods
  public set<T>(key: string, value: T): void {
    try {
      if (typeof value === 'string') {
        this.storage.set(key, value);
      } else if (typeof value === 'number') {
        this.storage.set(key, value);
      } else if (typeof value === 'boolean') {
        this.storage.set(key, value);
      } else {
        this.storage.set(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(`Error setting ${key}:`, error);
    }
  }

  public get<T>(key: string, defaultValue?: T): T | undefined {
    try {
      const value = this.storage.getString(key);
      if (value === undefined) {
        return defaultValue;
      }
      
      // Try to parse as JSON first
      try {
        return JSON.parse(value) as T;
      } catch {
        // If parsing fails, return as string
        return value as unknown as T;
      }
    } catch (error) {
      console.error(`Error getting ${key}:`, error);
      return defaultValue;
    }
  }

  public getString(key: string, defaultValue?: string): string | undefined {
    try {
      return this.storage.getString(key) ?? defaultValue;
    } catch (error) {
      console.error(`Error getting string ${key}:`, error);
      return defaultValue;
    }
  }

  public getNumber(key: string, defaultValue?: number): number | undefined {
    try {
      return this.storage.getNumber(key) ?? defaultValue;
    } catch (error) {
      console.error(`Error getting number ${key}:`, error);
      return defaultValue;
    }
  }

  public getBoolean(key: string, defaultValue?: boolean): boolean | undefined {
    try {
      return this.storage.getBoolean(key) ?? defaultValue;
    } catch (error) {
      console.error(`Error getting boolean ${key}:`, error);
      return defaultValue;
    }
  }

  public remove(key: string): void {
    try {
      this.storage.delete(key);
    } catch (error) {
      console.error(`Error removing ${key}:`, error);
    }
  }

  public clear(): void {
    try {
      this.storage.clearAll();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }

  public getAllKeys(): string[] {
    try {
      return this.storage.getAllKeys();
    } catch (error) {
      console.error('Error getting all keys:', error);
      return [];
    }
  }

  public contains(key: string): boolean {
    try {
      return this.storage.contains(key);
    } catch (error) {
      console.error(`Error checking if ${key} exists:`, error);
      return false;
    }
  }

  // Specific methods for app data
  public setAuthToken(token: string): void {
    this.set(STORAGE_KEYS.AUTH_TOKEN, token);
  }

  public getAuthToken(): string | undefined {
    return this.getString(STORAGE_KEYS.AUTH_TOKEN);
  }

  public removeAuthToken(): void {
    this.remove(STORAGE_KEYS.AUTH_TOKEN);
  }

  public setUserData(userData: any): void {
    this.set(STORAGE_KEYS.USER_DATA, userData);
  }

  public getUserData<T>(): T | undefined {
    return this.get<T>(STORAGE_KEYS.USER_DATA);
  }

  public removeUserData(): void {
    this.remove(STORAGE_KEYS.USER_DATA);
  }

  public setTheme(theme: string): void {
    this.set(STORAGE_KEYS.THEME, theme);
  }

  public getTheme(): string | undefined {
    return this.getString(STORAGE_KEYS.THEME);
  }

  public clearAuthData(): void {
    this.removeAuthToken();
    this.removeUserData();
  }
}

// Export singleton instance
export const storage = StorageService.getInstance(); 