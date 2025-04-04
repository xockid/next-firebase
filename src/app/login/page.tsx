"use client";

import LoginForm from "@/components/LoginForm";
import { useAuth } from "@/hooks/useAuth";
import { signInWithGitHub, signInWithGoogle } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            router.push("/");
        }
    }, [user, router]);

    return (
        <div>
            <h2>로그인 페이지</h2>
            <LoginForm />
            <button onClick={signInWithGoogle}>Google 회원가입/로그인</button>
            <button onClick={signInWithGitHub}>GitHub 회원가입/로그인</button>
        </div>
    )
}
