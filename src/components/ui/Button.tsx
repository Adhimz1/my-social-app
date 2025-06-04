// src/components/ui/Button.tsx
import React from 'react';

// Definisikan tipe props
// Menggabungkan HTMLButtonElement attributes dengan props custom
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean; // Untuk kompatibilitas dengan Radix Slot jika diperlukan
};

export function Button({
  children,
  className,
  variant = 'default',
  size = 'default',
  type = 'button', // Default type ke 'button' untuk mencegah submit form tak sengaja
  asChild = false, // Jarang dipakai tanpa Radix Slot
  ...props
}: ButtonProps) {
  // Base styles
  const baseStyles =
    'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

  // Variant styles
  const variantStyles = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline',
  };

  // Size styles
  const sizeStyles = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8',
    icon: 'h-10 w-10',
  };

  const Comp = asChild ? 'span' : 'button'; // Sederhana, biasanya 'Slot' dari Radix

  return (
    <Comp
      type={Comp === 'button' ? type : undefined}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className || ''}`}
      {...props}
    >
      {children}
    </Comp>
  );
}

// Opsional: defaultProps jika diperlukan
// Button.defaultProps = {
//   variant: 'default',
//   size: 'default',
//   type: 'button',
// };