import { initializeApp } from "firebase/app";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
    updateDoc,
    doc
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
const db = getFirestore(app);

const addNewRecipe = async (user, newRecipe) => {
    try {
        const q = query(collection(db, "recipes"), where("uid", "==", user?.uid));
        const docs = await getDocs(q);

        if (docs.docs.length === 0) {
            let recipeArr = [];
            recipeArr[0] = newRecipe;
            await addDoc(collection(db, "recipes"), {
                uid: user?.uid,
                recipes: recipeArr,
            });

            return "no errors";
        }

        const data = docs?.docs[0]?.data();
        let recipeArr = data.recipes;
        recipeArr.push(newRecipe);

        const docID = docs?.docs[0]?.id;
        const docRef = doc(db, "recipes", docID);

        await updateDoc(docRef, {
            // uid: data?.uid,
            recipes: recipeArr,
        });

        return "no errors";
    }
    catch (e) {
        console.log(e);
        return e;
    }
}

export {
    addNewRecipe,
};