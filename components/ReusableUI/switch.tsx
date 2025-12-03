'use client';

import React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "../../src/libs/utils";
interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  className?: string;
}

const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitives.Root>, SwitchProps>(
  ({ className, ...props }, ref) => (
    <SwitchPrimitives.Root
      ref={ref}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 data-[state=checked]:bg-blue-500 transition-colors",
        className
      )}
      {...props}
    >
      <SwitchPrimitives.Thumb
        className="block h-5 w-5 bg-white rounded-full shadow transform transition-transform data-[state=checked]:translate-x-5"
      />
    </SwitchPrimitives.Root>
  )
);

Switch.displayName = "Switch";

export { Switch };
