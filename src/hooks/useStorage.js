import { useState, useEffect } from "react";
import { projectStorage, projectFirestore, timestamp } from "../firebase/config";

const useStorage = (file, formDetail) =>{

    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);


    useEffect(()=>{
        const storageRef = projectStorage.ref(file.name);
        const collectionRef = projectFirestore.collection('images');

        // attach on function that will fire even listener state changed
        // snapshot object in time of the upload of the moment
        // the third arg is if there's an error, and the forth one is after the action is completed
        storageRef.put(file).on('state_changed', (snap)=>{
            let percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
            setProgress(percentage);

        }, (err)=>{
            setError(err)
        }, async () =>{
            const url = await storageRef.getDownloadURL();
            const createdAt = timestamp();
            collectionRef.add({url, createdAt, formDetail});
            setUrl(url)
        })

    }, [file]);
    
    return {progress, url, error}

}

export default useStorage;