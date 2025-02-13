import { useState } from "react";
import { projectStorage, projectFirestore, timestamp } from "../firebase/config";

const useStorage = (file, formDetail) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const startUpload = async () => {
        if (!file || !formDetail) return;
        
        setIsUploading(true);
        try {
            const storageRef = projectStorage.ref(file.name);
            const collectionRef = projectFirestore.collection('images');

            // Upload file and track progress
            await new Promise((resolve, reject) => {
                storageRef.put(file).on('state_changed', 
                    (snap) => {
                        let percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
                        setProgress(percentage);
                    },
                    (err) => {
                        setError(err);
                        reject(err);
                    },
                    async () => {
                        try {
                            const url = await storageRef.getDownloadURL();
                            const createdAt = timestamp();
                            await collectionRef.add({ url, createdAt, formDetail });
                            setUrl(url);
                            resolve();
                        } catch (err) {
                            setError(err);
                            reject(err);
                        }
                    }
                );
            });
        } catch (err) {
            setError(err);
        } finally {
            setIsUploading(false);
        }
    };

    return { progress, url, error, startUpload, isUploading };
};

export default useStorage;