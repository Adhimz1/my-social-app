// src/lib/supabase/server.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies as nextCookies } from 'next/headers';
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export async function createSupabaseServerClient() {
  const cookieStore: ReadonlyRequestCookies = await nextCookies();

  if (typeof cookieStore?.get !== 'function' || typeof cookieStore?.set !== 'function') {
      console.error("Error: cookieStore from 'next/headers' is still not behaving as expected even after await.");
      throw new Error("Failed to initialize cookie store correctly.");
  }

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: { // <--- Kurung kurawal pembuka untuk objek 'cookies'
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch {
            // Error intentionally ignored
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch /* (errorParam) */ { // Anda bisa menghapus (errorParam) jika tidak dipakai
            // Error intentionally ignored
          }
        } // <--- Ini adalah akhir dari fungsi 'remove'
      } // <--- TAMBAHKAN KURUNG KURAWAL PENUTUP INI untuk objek 'cookies'
    } // <--- Kurung kurawal penutup untuk objek options dari createServerClient
  ); // <--- Tanda kurung penutup untuk pemanggilan createServerClient
}

export async function getUser() {
  const supabase = await createSupabaseServerClient();
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();

  if (sessionError) {
    console.error("Error getting session in getUser:", sessionError);
    return null;
  }
  if (!session) {
    return null;
  }

  const { data: userProfile, error: profileError } = await supabase
    .from('user')
    .select('*')
    .eq('id', session.user.id)
    .single();

  if (profileError && profileError.code !== 'PGRST116') {
    console.error('Error fetching user profile in getUser:', profileError.message);
    return session.user;
  }

  return userProfile ? { ...session.user, ...userProfile } : session.user;
}