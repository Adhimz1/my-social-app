// lib/supabase.ts (atau lib/supabase/client.ts)
import { createBrowserClient } from '@supabase/ssr'; // Jika menggunakan SSR/Server Components dengan auth

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}