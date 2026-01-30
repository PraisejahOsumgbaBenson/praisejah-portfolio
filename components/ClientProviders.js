"use client";

/**
 * ClientProviders component wraps children with any client-side context providers
 * This is used in the layout to provide context without making the layout a client component
 */
export default function ClientProviders({ children }) {
  return <>{children}</>;
}
