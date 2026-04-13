import About from "../../components/About";
import { ErrorBoundary } from "../../components/ErrorBoundary";

export const metadata = {
  title: "About | Praisejah",
  description: "Learn more about Praisejah - Software Engineer",
};

export default function AboutPage() {
  return (
    <ErrorBoundary
      title="About section error"
      message="The about page hit an unexpected problem. Try reloading this page."
    >
      <About />
    </ErrorBoundary>
  );
}
