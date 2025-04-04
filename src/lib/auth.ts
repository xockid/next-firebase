import {
    createUserWithEmailAndPassword,
    GithubAuthProvider,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import { auth } from "./firebase";

// 회원가입
export const signUp = async (email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        return userCredential.user;
    } catch (error) {
        console.error("회원가입 에러: ", error);
        throw error;
    }
};

// 이메일 로그인
export const signIn = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        return userCredential.user;
    } catch (error) {
        console.error("로그인 에러:", error);
        throw error;
    }
};

// Google 로그인
export const signInWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        return result.user;
    } catch (error) {
        console.error("Google 로그인 에러:", error);
        throw error;
    }
};

// GitHub 로그인
export const signInWithGitHub = async () => {
    try {
        const provider = new GithubAuthProvider();
        const result = await signInWithPopup(auth, provider);
        return result.user;
    } catch (error) {
        console.error("GitHub 로그인 에러:", error);
        throw error;
    }
};

// 로그아웃
export const logOut = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("로그아웃 에러:", error);
        throw error;
    }
};
