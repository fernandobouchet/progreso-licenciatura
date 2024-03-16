import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const chipVariants = cva(
  'inline-flex items-center rounded-md px-2.5 py-1.5 text-xs font-semibold shadow',
  {
    variants: {
      variant: {
        default: 'bg-default text-default-foreground',
        success: 'bg-success text-success-foreground',
        caution: 'bg-caution text-caution-foreground',
        muted: 'bg-muted text-muted-foreground',
        info: 'bg-info text-info-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
        card: 'bg-accent text-accent-foreground',
      },
    },
    defaultVariants: {
      variant: 'muted',
    },
  }
);

export interface ChipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipVariants> {}

function Chip({ className, variant, ...props }: ChipProps) {
  return (
    <div className={cn(chipVariants({ variant }), className)} {...props} />
  );
}

export { Chip, chipVariants };
