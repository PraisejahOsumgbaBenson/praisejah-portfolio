import Contact from "../../components/Contact";
import { ErrorBoundary } from "../../components/ErrorBoundary";

export const metadata = {
  title: "Contact | Praisejah",
  description: "Get in touch with Praisejah",
};

export default function ContactPage() {
  return (
    <ErrorBoundary
      title="Contact section error"
      message="The contact page encountered an issue. You can return home and retry."
    >
      <Contact />
    </ErrorBoundary>
  );
}
