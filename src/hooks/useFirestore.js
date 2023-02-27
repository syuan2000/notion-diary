import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

const useFirestore = (collection) =>{

    const [doc, setDoc] = useState([]);

    useEffect(()=>{
        const unsub = projectFirestore.collection(collection)
        .orderBy('createdAt', 'desc')
        .onSnapshot((snap)=>{
            let document = [];
            snap.forEach(doc =>{
                document.push({...doc.data(),id:doc.id})
            });
            setDoc(document);
        })

        return () => unsub();

    }, [collection])

    return {doc};

}

export default useFirestore;