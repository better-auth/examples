"use client";

import { authClient } from "@/lib/authClient";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="flex flex-col gap-4 p-4">
            <h1 className="font-bold text-2xl">Sign In</h1>
            <div>
                <p>Email</p>
                <input
                    type="text"
                    value={email}
                    className="border"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <p>Password</p>
                <input
                    type="password"
                    value={password}
                    className="border"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button
                className="bg-white text-black"
                onClick={async () => {
                    const { error } = await authClient.signIn.email({
                        email,
                        password,
                        fetchOptions: {
                            onSuccess: () => {
                                router.replace(process.env.NEXT_PUBLIC_DASHBOARD_URL || "http://localhost:3001");
                            },
                        },
                    });
                }}
            >
                <p>Sign In</p>
            </button>
        </div>
    )
}