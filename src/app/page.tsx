"use client";

import { useAuth } from "@/hooks/useAuth";
import { logAnalyticsEvent } from "@/lib/firebase";
import "@/styles/components/home.scss";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
    const [analytics, setAnalytics] = useState<any[]>([]);

    useEffect(() => {
        logAnalyticsEvent("page_view", { page: "/" }); //파이어스토어에 페이지 방문 기록
        async function fetchAnalytics() {
            try {
                const res = await fetch("/api/analytics"); //Next.js의 API를 활용
                const data = await res.json();
                setAnalytics(data);
            } catch (error) {
                console.error("GA 데이터를 가져오는 중 오류 발생:", error);
            }
        }

        fetchAnalytics();
    }, []);

    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    if (loading) return <p>로딩 중...</p>;

    return (
        <main>
            <h1>Google Analytics 데이터</h1>
            <table summary="Google Analytics 데이터">
                <thead>
                    <tr>
                        <th>이벤트</th>
                        <th>데이터</th>
                        <th>시간</th>
                    </tr>
                </thead>
                <tbody>
                    {analytics.length > 0 ? (
                        analytics.map((row, index) => (
                            <tr key={index}>
                                <td>{row.eventName}</td>
                                <td>{JSON.stringify(row.eventData)}</td>
                                <td>
                                    {new Date(
                                        row.timestamp.seconds * 1000
                                    ).toLocaleString()}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3}>데이터를 불러오는 중...</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </main>
    );
}
