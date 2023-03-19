import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, updateProfile } from "firebase/auth";

import { useMainStore } from '/stores/MainStore'


export const createUser = async (username, email, password) => {
    const store = useMainStore()
    const auth = getAuth();
    const credentials = await createUserWithEmailAndPassword(auth, email, password).then(() => {
        updateProfile(auth.currentUser, {displayName: username})
    }).then(() => {
        store.setUser(auth.currentUser);
        return true;
    })
    .catch((error) => {
        return error
    })
    return credentials
}

export const signInUser = async(email, password) => {
    const store = useMainStore()
    const auth = getAuth();
    const credentials = await signInWithEmailAndPassword(auth, email, password).then(() => {
        store.setUser(auth.currentUser);
        return true;
    })
    .catch((error) => {
        return error
    })
    return credentials;
}

export const initUser = async () => {
    const store = useMainStore();
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if(user === null) {
            store.setUser(false)
        } else {
            store.setUser(auth.currentUser)
        } 
    });
}

export const signOutUser = async () => {
    const auth = getAuth();
    const result = await auth.signOut()
    return result
}


