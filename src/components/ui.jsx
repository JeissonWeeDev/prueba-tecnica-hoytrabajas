import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";

// Utility function for merging classes
export function cn(...inputs) {
  return clsx(inputs);
}

// Button Component
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-slate-900 text-white shadow hover:bg-slate-800",
        destructive: "bg-red-500 text-white shadow-sm hover:bg-red-600",
        outline: "border border-gray-300 bg-white shadow-sm hover:bg-gray-50 hover:text-gray-900",
        secondary: "bg-gray-100 text-gray-900 shadow-sm hover:bg-gray-200",
        ghost: "hover:bg-gray-100 hover:text-gray-900",
        link: "text-slate-900 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export const Button = forwardRef(({ className = "", variant, size, ...props }, ref) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

// Card Components
export const Card = forwardRef(({ className = "", ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm", className)}
    {...props}
  />
));
Card.displayName = "Card";

export const CardHeader = forwardRef(({ className = "", ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

export const CardTitle = forwardRef(({ className = "", ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

export const CardContent = forwardRef(({ className = "", ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

export const CardDescription = forwardRef(({ className = "", ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-gray-500", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

export const CardFooter = forwardRef(({ className = "", ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
));
CardFooter.displayName = "CardFooter";

// Badge Component
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-slate-900 text-white hover:bg-slate-800",
        secondary: "border-transparent bg-gray-100 text-gray-900 hover:bg-gray-200",
        destructive: "border-transparent bg-red-500 text-white hover:bg-red-600",
        outline: "text-gray-950 border-gray-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const Badge = ({ className = "", variant, ...props }) => {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
};

// Input Component
export const Input = forwardRef(({ className = "", type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-md border border-gray-300 bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

// Label Component
export const Label = forwardRef(({ className = "", ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  />
));
Label.displayName = "Label";

// Separator Component
export const Separator = forwardRef(({ className = "", orientation = "horizontal", decorative = true, ...props }, ref) => (
  <div
    ref={ref}
    role={decorative ? "none" : "separator"}
    aria-orientation={orientation}
    className={cn(
      "shrink-0 bg-gray-200",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      className
    )}
    {...props}
  />
));
Separator.displayName = "Separator";