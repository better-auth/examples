"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/authClient";
import { ArrowLeftIcon, Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function SignIn() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(true);
    const [loading, startTransition] = useTransition();

    const signIn = () => {
        startTransition(async () => {
            await authClient.signIn.email({
                email,
                password,
                rememberMe,
                callbackURL: process.env.NEXT_PUBLIC_DASHBOARD_URL || "http://localhost:3001",
                fetchOptions: {
                    onError: (context) => {
                        setError(context.error.message);
                    },
                    onSuccess: () => {
                        router.replace(process.env.NEXT_PUBLIC_DASHBOARD_URL || "http://localhost:3001");
                    }
                },
            });
        });
    }

    return (
        <div className="grid place-items-center min-h-svh p-4">
            <FieldSet className="w-full max-w-sm">
                <FieldLegend>Sign In</FieldLegend>
                <FieldDescription>Enter your email below to login to your account</FieldDescription>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input id="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Field>
                    <Field orientation="horizontal">
                        <Checkbox id="rememberMe" checked={rememberMe} onCheckedChange={value => setRememberMe(!!value)} />
                        <FieldLabel htmlFor="rememberMe">Remember me</FieldLabel>
                    </Field>
                    {error !== "" && (
                        <FieldError>{error}</FieldError>
                    )}
                    <Field>
                        <Button onClick={signIn} disabled={loading}>
                            {loading && (
                                <Loader2Icon className="animate-spin repeat-infinite" aria-hidden="false" />    
                            )}
                            Sign In
                        </Button>
                        <Link href="/sign-up" className={buttonVariants({
                            variant: "link",
                            size: "sm",
                        })}>
                            <ArrowLeftIcon className="-ms-5" aria-hidden="false" />
                            Sign Up
                        </Link>
                    </Field>
                </FieldGroup>
            </FieldSet>
        </div>
    )
}