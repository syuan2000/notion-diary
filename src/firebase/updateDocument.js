import { updateDoc, doc } from 'firebase/firestore';
import { projectFirestore } from './config';

const updateDocument =  (collectionName, documentId, updateformDetail) => {
    console.log(updateformDetail)
    const docRef = doc(projectFirestore, collectionName, documentId);
    return updateDoc(docRef, {formDetail: updateformDetail});

};

export default updateDocument;