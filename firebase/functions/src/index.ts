import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

admin.initializeApp();

export const onUserCreate = functions.auth.user().onCreate(async (user) => {
  const { uid, email } = user;

  // You can perform any custom logic here, such as sending a welcome email
  // or writing additional user data to Firestore or Realtime Database.

  const initialUserData = {
    id: uid,
    email: email,
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

  await admin.firestore().collection("users").doc(uid).set(initialUserData);

  await admin
    .firestore()
    .collection("notifications")
    .doc(uid)
    .set(notificationsInitialData);
});
