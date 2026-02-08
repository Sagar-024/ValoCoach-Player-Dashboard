import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Container Component
 * Wraps content with standardized max-width and responsive padding.
 * Desktop: 48px padding
 * Tablet: 32px padding
 * Mobile: 20px padding
 */
export default function Container({
  children,
  className = "",
}: ContainerProps) {
  return <div className={`container ${className}`}>{children}</div>;
}
