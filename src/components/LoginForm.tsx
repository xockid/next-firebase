"use client";

import { signIn } from "@/lib/auth";
import { useState } from "react";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            await signIn(email, password);
            alert("로그인 성공");
        } catch (err) {
            setError("로그인 실패. 이메일과 비밀번호를 확인하세요.");
        }
    };

    return (
        <form onSubmit={handleSignIn}>
            <input
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">로그인</button>
            {error && <p>{error}</p>}
        </form>
    );
}
