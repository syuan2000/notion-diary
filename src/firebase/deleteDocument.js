import { deleteDoc, doc } from 'firebase/firestore';
import { projectFirestore } from './config';

const deleteDocument = (collectionName, documentId) => {
  return deleteDoc(doc(projectFirestore, collectionName, documentId));
};

export default deleteDocument;