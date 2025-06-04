// src/app/auth/layout.tsx
import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="auth-layout-container flex items-center justify-center min-h-screen bg-gray-100">
      {/* Layout ini akan diterapkan ke /auth/login dan /auth/register */}
      <div className="w-full max-w-md">
        {children}
      </div>
    </section>
  );
}