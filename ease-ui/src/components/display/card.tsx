import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { elevated, className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn("ease-card", className)}
      data-ease="card"
      data-elevated={elevated ? "true" : undefined}
      {...rest}
    />
  );
});

export const CardHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function CardHeader({ className, ...rest }, ref) {
  return (
    <div ref={ref} className={className} data-ease-card="header" {...rest} />
  );
});

export const CardTitle = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function CardTitle({ className, ...rest }, ref) {
  return (
    <div ref={ref} className={className} data-ease-card="title" {...rest} />
  );
});

export const CardDescription = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function CardDescription({ className, ...rest }, ref) {
  return (
    <div
      ref={ref}
      className={className}
      data-ease-card="description"
      {...rest}
    />
  );
});

export const CardContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function CardContent({ className, ...rest }, ref) {
  return (
    <div ref={ref} className={className} data-ease-card="content" {...rest} />
  );
});

export const CardFooter = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function CardFooter({ className, ...rest }, ref) {
  return (
    <div ref={ref} className={className} data-ease-card="footer" {...rest} />
  );
});
