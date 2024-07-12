import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {FieldValue} from 'firebase-admin/firestore';

admin.initializeApp();

export const onUserCreate = functions.auth.user().onCreate(async user => {
  const email = user.email; // The email of the user.

  // You can perform any custom logic here, such as sending a welcome email
  // or writing additional user data to Firestore or Realtime Database.

  const initialUserData = {
    id: user.uid,
    email: user.email,
    createdAt: FieldValue.serverTimestamp(),
    address: null,
    outfitSelection: null,
    preferredSizes: [],
    preferredColors: [],
    preferredBrands: [],
    name: null,
  };

  const notificationsInitialData = {
    outfitIdeas: false,
    discounts: false,
    stock: false,
    newStuff: false,
  };

  await admin
    .firestore()
    .collection('users')
    .doc(user.uid)
    .set(initialUserData);

  await admin
    .firestore()
    .collection('notifications')
    .doc(user.uid)
    .set(notificationsInitialData);

  console.log('New user created:', user.uid, email);
});
