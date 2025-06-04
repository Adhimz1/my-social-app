// src/components/ui/Input.tsx
import React from 'react';

// Definisikan tipe props
// Menggabungkan HTMLInputElement attributes dengan props custom
type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  // Anda bisa menambahkan props custom di sini jika perlu
  // Misalnya: error?: string;
};

export function Input({ className, type, ...props }: InputProps) {
  // Base styles
  const baseStyles =
    'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

  return (
    <input
      type={type}
      className={`${baseStyles} ${className || ''}`}
      {...props}
    />
  );
}

// Opsional: defaultProps jika diperlukan
// Input.defaultProps = {
//   type: 'text',
// };