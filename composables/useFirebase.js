import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { useMainStore } from '/stores/MainStore';

//TODO, rerun middleware + set step to user in store

export const createUser = async (username, email, password) => {
  const store = useMainStore();
  const auth = getAuth();
  const router = useRouter();
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
        const res = await getDBUser();
        if(res === false) {
          console.error('Could not get step of user')
          return 
        }
        reloadMiddleware();
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
  const auth = getAuth();
  const router = useRouter();
  const res = await signInWithEmailAndPassword(auth, email, password);
  try {
    if (res) {
      store.setUser(auth.currentUser);
      const res = await getDBUser();
      if(res === false) {
        console.error('Could not get step of user')
        return 
      }
      useRouter().push('/')
      reloadMiddleware();
      return true;
    }
  } catch (error) {
    return error;
  }
};

export const initUser = async () => {
  const store = useMainStore();
  const auth = getAuth();
  const router = useRouter();
  onAuthStateChanged(auth, async (user) => {
    if (user === null) {
      store.setUser(false);
    } else {
      store.setUser(auth.currentUser);
      const res = await getDBUser();
      if(res === false) {
        console.error('Could not get step of user')
        return 
      }
      reloadMiddleware();
    }
  });
};

export const signOutUser = async () => {
  const auth = getAuth();
  const result = await auth.signOut();
  const router = useRouter();
  router.push('/');
  return result;
};