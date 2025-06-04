// src/components/auth/LoginForm.tsx
"use client";

import { signIn, type AuthFormState } from "@/lib/actions/auth";
import { useActionState } from "react";      // <--- useActionState dari "react"
import { useFormStatus } from "react-dom";   // <--- useFormStatus dari "react-dom"
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const initialState: AuthFormState = {
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" aria-disabled={pending} disabled={pending}>
      {pending ? "Signing In..." : "Sign In"}
    </Button>
  );
}

export function LoginForm() {
  const [state, formAction] = useActionState(signIn, initialState);
  const searchParams = useSearchParams();
  const message = searchParams.get('message');

  return (
    <form action={formAction} className="space-y-4">
       {/* ... sisa form ... */}
       {message && <p className="text-green-500 bg-green-100 p-2 rounded">{message}</p>}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <Input type="email" id="email" name="email" required className="mt-1"/>
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <Input type="password" id="password" name="password" required className="mt-1"/>
      </div>
      <SubmitButton />
      {state?.error && <p className="text-red-500 mt-2 text-sm">{state.error.message}</p>}
      <p className="text-sm text-center text-gray-600">
        Don&apos;t have an account?{" "}
        <Link href="/auth/register" className="font-medium text-indigo-600 hover:text-indigo-500">
          Sign up
        </Link>
      </p>
    </form>
  );
}