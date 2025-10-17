"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/authClient";
import { ArrowRightIcon, Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function SignUp() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, startTransition] = useTransition();

    const signUp = () => {
        startTransition(async () => {
            await authClient.signUp.email({
                name,
                email,
                password,
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
                <FieldLegend>Sign Up</FieldLegend>
                <FieldDescription>Enter your information to create an account</FieldDescription>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="name">Name</FieldLabel>
                        <Input id="name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} autoFocus />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input id="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <Input id="password" type="password" value={password} autoComplete="off" onChange={(e) => setPassword(e.target.value)} />
                    </Field>
                    {error !== "" && (
                        <FieldError>{error}</FieldError>
                    )}
                    <Field>
                        <Button onClick={signUp} disabled={loading}>
                            {loading && (
                                <Loader2Icon className="animate-spin repeat-infinite" aria-hidden="false" />    
                            )}
                            Sign Up
                        </Button>
                        <Link href="/sign-in" className={buttonVariants({
                            variant: "link",
                            size: "sm",
                        })}>
                            Sign In
                            <ArrowRightIcon className="-me-5" aria-hidden="false" />
                        </Link>
                    </Field>
                </FieldGroup>
            </FieldSet>
        </div>
    )
}
