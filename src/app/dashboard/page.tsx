// src/app/dashboard/page.tsx
import { getUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await getUser();

  if (!user) {
    // Middleware seharusnya sudah menangani ini, tapi sebagai fallback
    redirect('/auth/login?message=You need to login to view this page.');
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="text-lg mb-2">Welcome back, {user.user_metadata?.full_name || user.email}!</p>
      <p className="text-gray-700">Your User ID is: <span className="font-mono">{user.id}</span></p>
      {/* Konten dashboard lainnya bisa ditambahkan di sini */}
    </div>
  );
}