// src/lib/firebase.ts
import '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import type {IUserData} from '../@types';
import {Image} from 'react-native-compressor';

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
  private static async getAllDocsFromCollection(
    collectionName: string,
    orderByConfig?: {orderBy: string; direction: 'desc' | 'asc'},
  ) {
    if (orderByConfig) {
      const {orderBy, direction} = orderByConfig;
      const snapshots = await firestore()
        .collection(collectionName)
        .orderBy(orderBy, direction)
        .get();

      return snapshots.docs.map(doc => doc.data());
    }

    const snapshots = await firestore().collection(collectionName).get();

    return snapshots.docs.map(doc => doc.data());
  }

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

  /**
   * Creates a new user with the provided email and password.
   *
   * @param email - The email of the user.
   * @param password - The password of the user.
   * @returns A Promise that resolves to the response object containing the user information if successful, or an object with success set to false and the error if unsuccessful.
   */
  static async createUser(email: string, password: string) {
    try {
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      const {user} = response;

      const initialUserData = {
        id: user.uid,
        email: user.email,
        createdAt: firestore.FieldValue.serverTimestamp(),
        address: null,
        outfitSelection: null,
        preferredSizes: [],
        preferredColors: [],
        preferredBrands: [],
        name: null,
      };

      await firestore().collection('users').doc(user.uid).set(initialUserData);

      return response;
    } catch (error) {
      console.error('Create user failed', error);
      return {success: false, error};
    }
  }

  /**
   * Signs out the currently authenticated user.
   *
   * @returns A Promise that resolves when the sign out is successful, or throws an error if it fails.
   */
  static async signOut() {
    try {
      await auth().signOut();
    } catch (error) {
      console.error('Sign out failed', error);
      throw error;
    }
  }

  /**
   * Retrieves the currently authenticated user.
   *
   * @returns The currently authenticated user, or null if no user is authenticated.
   */
  static getCurrentAuthUser() {
    return auth().currentUser;
  }

  /**
   * Retrieves the user data for the specified user ID.
   *
   * @param uid - The ID of the user.
   * @returns A Promise that resolves to the user data if successful, or null if unsuccessful.
   * @throws If an error occurs during the retrieval process.
   */
  static async getCurrentUser(): Promise<IUserData | null> {
    try {
      const currentUser = FirebaseHelpers.getCurrentAuthUser();
      const user = (
        await firestore().collection('users').doc(currentUser?.uid).get()
      ).data();

      return user as IUserData;
    } catch (error) {
      console.error('Failed to get user', error);
      return null;
    }
  }

  /**
   * Updates the data of the currently authenticated user.
   *
   * @param data - The partial user data to update.
   * @throws If an error occurs during the update process.
   */
  static async updateCurrentUser(data: Partial<IUserData>): Promise<void> {
    const user = await FirebaseHelpers.getCurrentAuthUser();

    try {
      await firestore().collection('users').doc(user?.uid).update(data);
    } catch (error) {
      console.error('Failed to update user', error);
      throw error;
    }
  }

  static async getConstantsFromFirestore(): Promise<any> {
    try {
      const clothingBrands = await this.getAllDocsFromCollection(
        'clothingBrands',
      );

      const clothingSize = await this.getAllDocsFromCollection('clothingSize', {
        orderBy: 'createdAt',
        direction: 'asc',
      });

      const outfitSelections = await this.getAllDocsFromCollection(
        'outfitSelections',
      );

      const preferredColors = await this.getAllDocsFromCollection(
        'preferredColors',
      );

      return {
        clothingBrands,
        clothingSize,
        outfitSelections,
        preferredColors,
      };
    } catch (error) {
      console.error('Failed to get constants', error);
      return null;
    }
  }

  /**
   * Uploads a user avatar to the Firebase Storage.
   *
   * @param {string} userId - The ID of the user.
   * @param {string} avatar - The URL or base64-encoded representation of the avatar.
   * @param {string} extension - The file extension of the avatar.
   * @return {Promise<void>} A Promise that resolves when the avatar is uploaded successfully.
   * @throws {Error} If there is an error during the upload process.
   */
  static async uploadUserAvatar(
    userId: string,
    avatar: string,
    extension: string,
    progressCallback?: (progressPercentage: number) => void,
  ) {
    try {
      const compressedImage = await Image.compress(avatar);
      const response = await fetch(compressedImage);
      const blob = await response.blob();

      // Get base64 from blobr
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = () =>
          resolve((reader.result as string).split(',')[1] as string);
        reader.onerror = error => reject(error);
      });

      const imageReference = storage().ref(
        `user_avatars/${userId}${extension}`,
      );

      let contextType = base64.includes('image/png')
        ? 'image/png'
        : 'image/jpeg';

      const task = imageReference.putString(base64, 'base64', {
        contentType: contextType,
      });

      task.on('state_changed', taskSnapshot => {
        progressCallback?.(
          taskSnapshot.bytesTransferred / taskSnapshot.totalBytes,
        );
      });

      task.then(() => {
        console.log('Image uploaded to the bucket!');
      });
    } catch (error) {
      console.error('Failed to upload user avatar', error);
      throw error;
    }
  }
}

export default FirebaseHelpers;
