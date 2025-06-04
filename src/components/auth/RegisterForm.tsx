// src/components/auth/RegisterForm.tsx
"use client";

import { signUp, type AuthFormState } from "@/lib/actions/auth";
import { useActionState } from "react";      // <--- useActionState dari "react"
import { useFormStatus } from "react-dom";   // <--- useFormStatus dari "react-dom"
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Link from "next/link";

const initialState: AuthFormState = {
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" aria-disabled={pending} disabled={pending}>
      {pending ? "Signing Up..." : "Sign Up"}
    </Button>
  );
}

export function RegisterForm() {
  const [state, formAction] = useActionState(signUp, initialState);

  return (
    <form action={formAction} className="space-y-4">
      {/* ... sisa form ... */}
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
        <Input type="text" id="username" name="username" required className="mt-1"/>
      </div>
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
        <Input type="text" id="fullName" name="fullName" required className="mt-1"/>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <Input type="email" id="email" name="email" required className="mt-1"/>
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <Input type="password" id="password" name="password" required className="mt-1" />
      </div>
      <SubmitButton />
      {state?.error && <p className="text-red-500 mt-2 text-sm">{state.error.message}</p>}
      <p className="text-sm text-center text-gray-600">
        Already have an account?{" "}
        <Link href="/auth/login" className="font-medium text-indigo-600 hover:text-indigo-500">
          Login
        </Link>
      </p>
    </form>
  );
}