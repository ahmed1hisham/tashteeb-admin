import firestore from '@react-native-firebase/firestore';

export const getActiveRequests = async () => {
  const RequestsRef = firestore().collection('Requests');
  let firestoreCollection = await RequestsRef.where('status', '==', 'pending')
    .orderBy('createdAt', 'desc')
    .get()
    .catch(error => {
      console.log(error);
      result = error.message;
      throw error.message;
    });

  if (firestoreCollection) {
    const requests = firestoreCollection.docs;
    for (const index in requests) {
      requests[index] = {id: requests[index].id, ...requests[index].data()};
    }
    console.log(requests);
    return requests;
  } else {
    return null;
  }
};
export const getRequests = async userId => {
  const RequestsRef = firestore().collection('Requests');
  let firestoreCollection = await RequestsRef.where('requesterId', '==', userId)
    .orderBy('createdAt', 'desc')
    .get()
    .catch(error => {
      console.log(error);
      result = error.message;
      throw error.message;
    });

  if (firestoreCollection) {
    const requests = firestoreCollection.docs;
    for (const index in requests) {
      requests[index] = {id: requests[index].id, ...requests[index].data()};
    }
    console.log(requests);
    return requests;
  } else {
    return null;
  }
};
export const getOldRequests = async () => {
  const RequestsRef = firestore().collection('Requests');
  let firestoreCollection = await RequestsRef.where('status', '!=', 'pending')
    .orderBy('status', 'asc')
    .orderBy('createdAt', 'desc')
    .get()
    .catch(error => {
      console.log(error);
      result = error.message;
      throw error.message;
    });

  if (firestoreCollection) {
    const requests = firestoreCollection.docs;
    for (const index in requests) {
      requests[index] = {id: requests[index].id, ...requests[index].data()};
    }
    console.log(requests);
    return requests;
  } else {
    return null;
  }
};

export const changeRequestStatus = async (uid, status) => {
  const RequestRef = firestore().collection('Requests').doc(uid);
  return await RequestRef.update({
    status: status,
    updatedAt: firestore.FieldValue.serverTimestamp(),
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      console.log(error);
      throw error.message;
    });
};

export const addRequest = async data => {
  const RequestsRef = firestore().collection('Requests');

  return await RequestsRef.add({
    ...data,
    createdAt: firestore.FieldValue.serverTimestamp(),
  });
};
