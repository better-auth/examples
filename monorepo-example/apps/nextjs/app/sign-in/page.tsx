"use client";

import { authClient } from "@/lib/authClient";
import { useState } from "react";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const session = authClient.useSession();

    return (
        <div className="flex flex-col gap-4 p-4">
            {JSON.stringify({ session })}
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
                    });
                }}
            >
                <p>Sign In</p>
            </button>
            <button
				className="border-white text-white"
				onClick={async () => {
					const { error } = await authClient.signOut();
				}}
			>
				<p>Logout</p>
			</button>
        </div>
    )
}