import { AuthForm } from "@/components/auth-form";
import { AuthLayout } from "../auth-layout";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your InstaFlow AI workspace and resume your content pipeline."
      footerText="New here?"
      footerLink="/signup"
      footerLabel="Create an account"
    >
      <AuthForm mode="login" />
    </AuthLayout>
  );
}
