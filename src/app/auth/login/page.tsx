// src/app/auth/login/page.tsx
import { LoginForm } from "@/components/auth/LoginForm"; // Pastikan path ini benar
import { getUser } from "@/lib/supabase/server";      // Pastikan path ini benar
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const user = await getUser(); // getUser sekarang async karena createSupabaseServerClient async

  if (user) {
    redirect('/dashboard'); // Atau halaman utama setelah login
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] py-2">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold text-center text-gray-900">
          Login to Your Account
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}