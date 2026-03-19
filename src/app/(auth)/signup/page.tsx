import { AuthForm } from "@/components/auth-form";
import { AuthLayout } from "../auth-layout";

export default function SignupPage() {
  return (
    <AuthLayout
      title="Create your workspace"
      subtitle="Start building a smarter Instagram publishing workflow with AI-assisted drafting and inbox management."
      footerText="Already have an account?"
      footerLink="/login"
      footerLabel="Sign in"
    >
      <AuthForm mode="signup" />
    </AuthLayout>
  );
}
