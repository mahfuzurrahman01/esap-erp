import React from "react";
import cn from "@core/utils/class-names";

const Box = React.forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  ({ children, className }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          "card-shadow mt-4 flex grow flex-col rounded-2xl bg-paper md:mt-6",
          className
        )}
      >
        {children}
      </section>
    );
  }
);

export default Box;
