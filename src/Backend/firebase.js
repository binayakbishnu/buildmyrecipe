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

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC8eWwTrZ40PUPFohdoWEP3DL62hL7O5gE",
    authDomain: "tastalchemy.firebaseapp.com",
    projectId: "tastalchemy",
    storageBucket: "tastalchemy.appspot.com",
    messagingSenderId: "1089082315024",
    appId: "1:1089082315024:web:7650979de04a6b031c5595",
    measurementId: "G-ZWCECN4VKY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });

            await addDoc(collection(db, "recipes"), {
                uid: user.uid,
                recipes: [],
            });
        }

        return "no errors";
    } catch (err) {
        console.error(err);
        return err;
    }
};

const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);

        return "no errors";
    } catch (err) {
        console.error(err);
        return err;
    }
};

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "manual",
            email,
        });

        await addDoc(collection(db, "recipes"), {
            uid: user.uid,
            recipes: [],
        });

        return "no errors";
    } catch (err) {
        console.error(err);
        return err;
    }
};

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");

        return "no errors";
    } catch (err) {
        console.error(err);
        return err;
    }
};

const logout = () => {
    signOut(auth);
};

export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
};