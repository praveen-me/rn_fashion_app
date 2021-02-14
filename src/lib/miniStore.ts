import AsyncStorage from '@react-native-async-storage/async-storage';

class MiniStore {
  isLoggedIn: null | boolean | string | void = null;

  constructor() {
    this.getIsLogged();
  }

  async getIsLogged() {
    try {
      this.isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
    } catch (e) {
      this.isLoggedIn = null;
    }
  }

  async setIsLoggedIn(value: boolean) {
    try {
      this.isLoggedIn = await AsyncStorage.setItem(
        'isLoggedIn',
        value.toString(),
      );
    } catch (e) {
      this.isLoggedIn = null;
    }
  }
}

const miniStore = new MiniStore();

export default miniStore;
