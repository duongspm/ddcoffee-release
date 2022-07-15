import {collection, doc, getDocs, orderBy, query, setDoc} from "firebase/firestore";
import { firestore } from "../firebase.config";

//saving new item
export const saveItem = async(data) => {
    await setDoc(doc(firestore,"drinkItems", `${Date.now()}`), data,{
        merge: true,
    });
};

//get all
export const getALlDrinkItems = async () => {
    const items = await getDocs (
        query(collection(firestore, "drinkItems"), orderBy("id","desc"))
    );
    return items.docs.map((doc) => doc.data());
};