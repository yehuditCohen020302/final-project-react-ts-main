
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import swal from "sweetalert";

const Config = {
    apiKey: "AIzaSyDooQ14f6eaCB07ie_P5bfQ8D5nUqoF_b0",
    authDomain: "final-waze-project.firebaseapp.com",
    projectId: "final-waze-project",
    storageBucket: "final-waze-project.appspot.com",
    messagingSenderId: "424994167736",
    appId: "1:424994167736:web:47cbe2342df78e02020d4d"
  };

const app = initializeApp(Config);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

const signInWithGoogle = async () => {
  try {
      const res = await signInWithPopup(auth, googleProvider);
      console.log(res.user.uid); 
      const user=res.user; 
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        
      });
    }
  } catch (err:any) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email:string, password:string) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res.user);
      swal(`Welcome to ${res.user} `)

  } catch (err:any) {
    console.error(err);
    alert(err.message);
  }
};
const registerWithEmailAndPassword = async (name:string,email:string, password:string, ) => {
  
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    console.log(res.user);
    //קבלת טוקן
// asnyc function callMyAPI() {
//   const token = await firebase.auth().currentUser.getIdToken()
//   // Write Axios Request here
//   // Add the authorization header here
// }
// //יצירת רולים
// //Set admin privilege on the user corresponding to uid.
// getAuth()
//   .setCustomUserClaims(uid, { admin: true })
//   .then(() => {
//     // The new custom claims will propagate to the user's ID token the
//     // next time a new one is issued.
//   });
    const user = res.user;
     await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err:any) {
    console.error(err);
    alert(err.message);
  }
};
const sendPasswordReset = async (email:string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err:any) {
    console.error(err);
    alert(err.message);
  }
};
const logout = () => {
  signOut(auth);
};
export {
  auth,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};

function firebaseConfig(firebaseConfig: any) {
    throw new Error("Function not implemented.");
  }
