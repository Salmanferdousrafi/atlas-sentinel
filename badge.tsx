import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-mono font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        unclassified: "border-slate-400/30 text-slate-400 bg-slate-400/10",
        confidential: "border-emerald-400/30 text-emerald-400 bg-emerald-400/10",
        secret: "border-amber-400/30 text-amber-400 bg-amber-400/10",
        topsecret: "border-crimson/30 text-crimson bg-crimson/10",
        low: "border-emerald-400/30 text-emerald-400 bg-emerald-400/10",
        moderate: "border-amber-400/30 text-amber-400 bg-amber-400/10",
        high: "border-orange-400/30 text-orange-400 bg-orange-400/10",
        critical: "border-crimson/30 text-crimson bg-crimson/10",
        flash: "border-crimson/50 text-crimson bg-crimson/20 animate-pulse-glow",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
