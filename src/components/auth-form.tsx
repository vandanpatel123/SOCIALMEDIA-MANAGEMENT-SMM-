"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppShell } from "./app-provider";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type AuthMode = "login" | "signup";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function AuthForm({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const { pushToast } = useAppShell();
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const errors = useMemo(
    () => ({
      fullName:
        mode === "signup" && values.fullName.trim().length < 2
          ? "Please enter your full name."
          : "",
      email: emailPattern.test(values.email) ? "" : "Enter a valid email address.",
      password:
        values.password.length >= 8
          ? ""
          : "Password must be at least 8 characters long.",
    }),
    [mode, values],
  );

  const hasErrors = Object.values(errors).some(Boolean);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);

    if (hasErrors) {
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? "Authentication request failed.");
      }

      pushToast({
        title: mode === "login" ? "Signed in" : "Account created",
        description:
          mode === "login"
            ? "You are now entering the dashboard."
            : "Your workspace account was created successfully.",
      });
      router.push("/dashboard");
    } catch (error) {
      pushToast({
        title: "Auth error",
        description: error instanceof Error ? error.message : "Authentication failed.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {mode === "signup" ? (
        <Field
          label="Full name"
          error={submitted ? errors.fullName : ""}
          input={
            <Input
              value={values.fullName}
              onChange={(event) =>
                setValues((current) => ({ ...current, fullName: event.target.value }))
              }
              placeholder="Alex Morgan"
            />
          }
        />
      ) : null}

      <Field
        label="Email"
        error={submitted ? errors.email : ""}
        input={
          <Input
            type="email"
            value={values.email}
            onChange={(event) =>
              setValues((current) => ({ ...current, email: event.target.value }))
            }
            placeholder="you@company.com"
          />
        }
      />

      <Field
        label="Password"
        error={submitted ? errors.password : ""}
        input={
          <Input
            type="password"
            value={values.password}
            onChange={(event) =>
              setValues((current) => ({ ...current, password: event.target.value }))
            }
            placeholder="Enter your password"
          />
        }
      />

      <Button type="submit" className="w-full" disabled={submitting}>
        {submitting ? "Please wait..." : mode === "login" ? "Login" : "Create account"}
      </Button>
    </form>
  );
}

function Field({
  label,
  input,
  error,
}: {
  label: string;
  input: React.ReactNode;
  error: string;
}) {
  return (
    <label className="block space-y-2 text-sm font-medium text-slate-700">
      <span>{label}</span>
      {input}
      {error ? <span className="block text-xs font-medium text-rose-500">{error}</span> : null}
    </label>
  );
}
