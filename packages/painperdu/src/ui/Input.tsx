import * as React from "react";
import { Search } from 'lucide-react';

import { cn } from "../utils/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <>
        <div className="flex items-center bg-white bg-opacity-60 relative rounded-xl m-0 py-0 px-3 h-14 w-full shadow">
          <Search color="hsl(var(--primary)"/>
          <input
            type={type}
            className={cn(
              "flex h-10 w-full bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              className,
            )}
            ref={ref}
            {...props}
          />
        </div>
      </>
    );
  },
);
Input.displayName = "Input";

export { Input };
