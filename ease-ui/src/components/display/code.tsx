import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils";

export const Code = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  function Code({ className, children, ...rest }, ref) {
    return (
      <code
        ref={ref as never}
        className={cn("ease-code", className)}
        data-ease="code"
        {...rest}
      >
        {children}
      </code>
    );
  },
);

export interface CodeBlockProps extends HTMLAttributes<HTMLElement> {
  language?: string;
}

export const CodeBlock = forwardRef<HTMLElement, CodeBlockProps>(
  function CodeBlock({ language, className, children, ...rest }, ref) {
    return (
      <code
        ref={ref as never}
        className={cn("ease-code-block", className)}
        data-ease="code-block"
        data-language={language}
        {...rest}
      >
        {children}
      </code>
    );
  },
);

export const Kbd = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  function Kbd({ className, children, ...rest }, ref) {
    return (
      <kbd
        ref={ref as never}
        className={cn("ease-kbd", className)}
        data-ease="kbd"
        {...rest}
      >
        {children}
      </kbd>
    );
  },
);
