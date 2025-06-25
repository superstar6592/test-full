import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, OAuthProvider, onIdTokenChanged } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBdbRz860pfMuyY6ofoiIWGBAU2_ofThw4",
    authDomain: "freelancing-platform-9043a.firebaseapp.com",
    projectId: "freelancing-platform-9043a",
    storageBucket: "freelancing-platform-9043a.firebasestorage.app",
    messagingSenderId: "68901195644",
    appId: "1:68901195644:web:36997b1ced0d5f197f1ef9",
    measurementId: "G-H3NMSPPHDF"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

onIdTokenChanged(auth, async (user) => {
    if (user) {
        const idToken = await user.getIdToken(true);
        localStorage.setItem('freelancingPlatformAuthToken', idToken);
    } else {
        // console.log('User is logged out.')
    }
});

export const googleProvider = new GoogleAuthProvider();
export const appleProvider = new OAuthProvider('apple.com');

export default app;