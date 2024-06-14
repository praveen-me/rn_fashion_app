// src/lib/firebase.ts
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

// Define interfaces for URL items and result structure
export interface URLItem {
  id: string;
  url: string | null;
  error?: boolean;
}

export interface StorageItemsResult {
  urls: URLItem[];
  success: boolean;
}

class FirebaseHelpers {
  /**
   * Login with email and password using Firebase Authentication.
   * @param email - User email address
   * @param password - User password
   * @returns Firebase user object on success, error object on failure
   */
  static async login(email: string, password: string) {
    try {
      const user = await auth().signInWithEmailAndPassword(email, password);
      return user;
    } catch (error) {
      console.error('Login failed', error);
      return {success: false, error};
    }
  }

  /**
   * Get all items from a specified Firebase Storage folder.
   * @param folder - The folder path in Firebase Storage
   * @returns Object containing URLs of items and success status { urls: [], success: true/false }
   */
  public static async getAllItems(folder: string): Promise<StorageItemsResult> {
    const storageRef = storage().ref(folder);

    try {
      const {items} = await storageRef.listAll();

      const urls = await Promise.all(
        items.map(async item => {
          try {
            const url = await item.getDownloadURL();
            return {id: item.fullPath, url};
          } catch (error) {
            console.error(
              `Failed to get download URL for ${item.fullPath}`,
              error,
            );
            return {id: item.fullPath, url: null, error: true};
          }
        }),
      );

      return {
        urls,
        success: true,
      };
    } catch (error) {
      console.error(
        `Failed to list or process items in folder ${folder}`,
        error,
      );
      return {
        urls: [],
        success: false,
      };
    }
  }
}

export default FirebaseHelpers;
