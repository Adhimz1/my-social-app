// src/components/shared/Navbar.tsx
import Link from "next/link";
import { getUser } from "@/lib/supabase/server";
import { signOut } from "@/lib/actions/auth"; // Impor dari @/lib/actions/auth

// Client Component untuk tombol logout karena menggunakan form action
function LogoutButton() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className="px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
      >
        Logout
      </button>
    </form>
  );
}

export async function Navbar() {
  const user = await getUser();

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 h-16 flex justify-between items-center">
        <Link href="/" className="text-lg font-semibold">
          MySocialApp
        </Link>
        <div className="space-x-4 flex items-center">
          <Link href="/" className="hover:text-gray-300">Home</Link>
          {user ? (
            <>
              <Link href="/dashboard" className="hover:text-gray-300">Dashboard</Link>
              {/* Idealnya, link profil menggunakan username jika ada */}
              <Link href={`/profile/${user.user_metadata?.username || user.id}`} className="hover:text-gray-300">
                {user.user_metadata?.full_name || user.email}
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/auth/login" className="hover:text-gray-300">Login</Link>
              <Link href="/auth/register" className="hover:text-gray-300">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}