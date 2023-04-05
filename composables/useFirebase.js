import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { useMainStore } from '/stores/MainStore';

export const createUser = async (username, email, password) => {
  const store = useMainStore();
  const auth = getAuth();
  const credentials = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  )
    .then(async () => {
      updateProfile(auth.currentUser, { displayName: username, step: 2 });
      store.setUser(auth.currentUser);
      const res = await fetch('/api/register/addUser', {
        method: 'POST',
        body: JSON.stringify({
          id: auth.currentUser.uid,
          username: username,
        }),
      });
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      return error;
    });
  return credentials;
};

export const signInUser = async (email, password) => {
  const store = useMainStore();
  const router = useRouter();
  const auth = getAuth();
  const res = await signInWithEmailAndPassword(auth, email, password);
  try {
    if (res) {
      store.setUser(auth.currentUser);
      return true;
    }
  } catch (error) {
    return error;
  }
};

export const initUser = async () => {
  const store = useMainStore();
  const router = useRouter();
  const auth = getAuth();
  onAuthStateChanged(auth, async (user) => {
    if (user === null) {
      store.setUser(false);
    } else {
      store.setUser(auth.currentUser);
    }
  });
};

export const signOutUser = async () => {
  const auth = getAuth();
  const router = useRouter();
  const result = await auth.signOut();
  router.push('/')
  return result;
};
