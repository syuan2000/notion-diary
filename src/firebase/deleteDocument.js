import { deleteDoc, doc } from 'firebase/firestore';
import { projectFirestore, auth } from './config';


const deleteDocument = async (collectionName, documentId) => {
  const user = auth.currentUser;
  if (!user) {
    alert('You must be logged in to delete this document.');
    return;
  }

  const idTokenResult = await user.getIdTokenResult();
  if (!idTokenResult.claims.admin) {
    alert('You are not authorized to delete this document.');
    return;
  }

  await deleteDoc(doc(projectFirestore, collectionName, documentId));
  alert('Document deleted successfully.');
};

export default deleteDocument;