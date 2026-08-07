import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Loader2, MailCheck, Send } from "lucide-react";
import { AuthShell } from "@/components/velzx/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset your password — VelzX" },
      {
        name: "description",
        content: "Request a secure reset link for your VelzX workspace account.",
      },
      { property: "og:title", content: "Reset your VelzX password" },
      { property: "og:description", content: "We'll email you a secure reset link." },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <AuthShell
      title={sent ? "Check your inbox" : "Reset your password"}
      subtitle={
        sent
          ? "If an account exists for that address, a secure reset link is on its way. The link expires in 30 minutes."
          : "Enter the email tied to your workspace and we'll send a secure reset link."
      }
      footer={
        <Link to="/login" className="inline-flex items-center gap-1.5 text-primary hover:underline">
          <ArrowLeft className="size-3.5" /> Back to sign in
        </Link>
      }
    >
      {sent ? (
        <div className="flex flex-col items-center py-4 text-center">
          <span className="animate-pulse-ring grid size-14 place-items-center rounded-full bg-success/15 text-success">
            <MailCheck className="size-6" />
          </span>
          <p className="mt-5 text-sm text-muted-foreground">
            Didn't receive it? Check spam, or{" "}
            <button
              type="button"
              onClick={() => setSent(false)}
              className="font-medium text-primary hover:underline"
            >
              try another address
            </button>
            .
          </p>
        </div>
      ) : (
        <form
          className="grid gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              setSent(true);
            }, 700);
          }}
        >
          <div className="grid gap-2">
            <Label htmlFor="email">Work email</Label>
            <Input id="email" type="email" required placeholder="you@company.com" />
          </div>
          <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : <Send />}
            {loading ? "Sending link…" : "Send reset link"}
          </Button>
        </form>
      )}
    </AuthShell>
  );
}