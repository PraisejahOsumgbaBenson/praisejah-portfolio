"use client";

import React from "react";
import Link from "next/link";
import "./ErrorBoundary.css";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
    // TODO: Send to Sentry/Datadog in production.
    // Sentry.captureException(error, { extra: errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <DefaultErrorFallback
          title={this.props.title}
          message={this.props.message}
          showHomeLink={this.props.showHomeLink}
          onReset={this.handleReset}
        />
      );
    }

    return this.props.children;
  }
}

export function DefaultErrorFallback({
  title = "Something went wrong",
  message = "A section of this page failed to load. You can try again or return home.",
  showHomeLink = true,
  onReset,
}) {
  return (
    <section className="error-boundary-shell" role="alert" aria-live="polite">
      <div className="error-boundary-panel">
        <p className="error-kicker">Portfolio Recovery Mode</p>
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="error-actions">
          <button type="button" onClick={onReset}>
            Try Again
          </button>
          {showHomeLink ? <Link href="/">Go Home</Link> : null}
        </div>
      </div>
    </section>
  );
}
