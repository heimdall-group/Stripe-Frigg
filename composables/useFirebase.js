import { useMainStore } from "~~/stores/mainStore"
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from 'firebase/auth';

export const createUser = async (username, email, password, number, dateOfBirth) => {
  const store = useMainStore();
  const auth = getAuth();
  const router = useRouter();
  const credentials = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  )
    .then(async () => {
      updateProfile(auth.currentUser, { displayName: username, step: 2 });
      store.setUser(auth.currentUser);
      const res = await fetch('/api/register/addUser', {
        method: 'POST',
        body: JSON.stringify({
          id: auth.currentUser.uid,
          username: username,
          number: number,
          dateOfBirth: dateOfBirth,
        }),
      });
      if (res.status === 200) {
        const res = await getUser();
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

export const verifyPassword = async (pwd) => {
  const store = useMainStore();
  const user = store.getUser;
  try {
    const credential = EmailAuthProvider.credential(
      user.email,
      pwd
    )
    const res = await reauthenticateWithCredential(
      user, 
      credential
    )
    return res.user.uid === user.uid
  } catch (err) {
    return err
  }
  
}

export const signInUser = async (email, password) => {
  const store = useMainStore();
  const auth = getAuth();
  const router = useRouter(); 
  try {
    const res = await signInWithEmailAndPassword(auth, email, password)
    if (res) {
      await router.push('/');
      store.setUser(auth.currentUser);
      const res = await getUser();
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
  const subscribe = onAuthStateChanged(auth, async (user) => {
    if (user === null) {
      store.setUser(false);
      subscribe();
    } else {
      store.setUser(auth.currentUser);
      const res = await getUser();
      reloadMiddleware();
      subscribe();
    }
  });
};

export const signOutUser = async () => {
  const store = useMainStore();
  const auth = getAuth();
  const result = await auth.signOut();
  store.setUser(false);
  const router = useRouter();
  router.push('/');
  return result;
};