// src/lib/actions/auth.ts
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export interface AuthFormState {
  error: { message: string } | null;
  successMessage?: string;
}

export async function signIn(
  prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  // Tambahkan await di sini
  const supabase = await createSupabaseServerClient();

  // ... sisa kode signIn ...
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: { message: 'Email and password are required.' } };
  }

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (signInError) {
    console.error('Sign In Error:', signInError);
    return { error: { message: signInError.message } };
  }

  revalidatePath('/', 'layout');
  redirect('/dashboard');
}

export async function signUp(
  prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  // Tambahkan await di sini
  const supabase = await createSupabaseServerClient();

  // ... sisa kode signUp ...
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const username = formData.get('username') as string;
  const fullName = formData.get('fullName') as string;

  if (!email || !password || !username || !fullName) {
    return { error: { message: 'All fields are required.' } };
  }
  if (password.length < 6) {
    return { error: { message: 'Password must be at least 6 characters long.'}};
  }

  const { data: authData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { username: username, full_name: fullName, } },
  });

  if (signUpError) {
    console.error('Sign Up Error:', signUpError);
    return { error: { message: signUpError.message } };
  }
  if (!authData?.user) {
    return { error: { message: "User not created in Supabase Auth, please try again." } };
  }
  redirect('/auth/login?message=Signup successful! Please login.');
}

export async function signOut() {
  // Tambahkan await di sini
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Sign Out Error:', error);
  }

  revalidatePath('/', 'layout');
  redirect('/');
}