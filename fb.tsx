import Constants from "expo-constants";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: Constants!.manifest!.extra!.apiKey,
  authDomain: Constants!.manifest!.extra!.authDomain,
  projectId: Constants!.manifest!.extra!.projectId,
  storageBucket: Constants!.manifest!.extra!.storageBucket,
  messagingSenderId: Constants!.manifest!.extra!.messagingSenderId,
  appId: Constants!.manifest!.extra!.appId
};
initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// export default database = getFirestore()