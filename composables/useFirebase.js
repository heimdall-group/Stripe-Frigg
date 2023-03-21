import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { useMainStore } from '/stores/MainStore';

export const createUser = async (username, email, password, plan) => {
  const store = useMainStore();
  const auth = getAuth();
  const credentials = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  )
    .then(async () => {
      updateProfile(auth.currentUser, { displayName: username });
      store.setUser(auth.currentUser);
      console.log({ 
        id: auth.currentUser.uid,
        username: username,
        plan: plan,
      })
      const res = await fetch('/api/register/addUser', {
        method: 'POST',
        body: JSON.stringify({ 
          id: auth.currentUser.uid,
          username: username,
          plan: plan,
        }),
      });
      if( res.status === 200) {
        return true;
      } else {
        return false
      }
    })
    .catch((error) => {
      return error;
    });
  return credentials;
};

export const signInUser = async (email, password) => {
  const store = useMainStore();
  const auth = getAuth();
  const credentials = await signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      store.setUser(auth.currentUser);
      return true;
    })
    .catch((error) => {
      return error;
    });
  return credentials;
};

export const initUser = async () => {
  const store = useMainStore();
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user === null) {
      store.setUser(false);
    } else {
      store.setUser(auth.currentUser);
    }
  });
};

export const signOutUser = async () => {
  const auth = getAuth();
  const result = await auth.signOut();
  return result;
};
