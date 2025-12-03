"use client";

import React from "react";
import { cn } from "../../src/libs/utils";

type ButtonVariant =
  | "default"
  | "outline"
  | "secondary"
  | "destructive"
  | "success"
  | "tradeUp"
  | "tradeDown"; 

type ButtonSize = "sm" | "default" | "lg" | "icon" | "xl"; 
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}
const variantClasses: Record<ButtonVariant, string> = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  outline: "border border-input hover:bg-accent hover:text-accent-foreground",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  destructive: "bg-destructive text-white hover:bg-destructive/90",
  success: "bg-success text-white hover:bg-success/90",
  tradeUp: "bg-green-500 text-white hover:bg-green-600",    
  tradeDown: "bg-red-500 text-white hover:bg-red-600",   
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm",
  default: "h-10 px-4",
  lg: "h-12 px-6 text-lg",
  icon: "h-10 w-10 p-0",
  xl: "h-14 px-8 text-xl", 
};

export const Button = ({
  children,
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-all",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
