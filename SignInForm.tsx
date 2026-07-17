"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { cn } from "@/app/lib/utils";
import { Shield, Eye, EyeOff, Loader2 } from "lucide-react";

export function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid credentials. Access denied.");
      setIsLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-void px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-cyan/10">
            <Shield className="h-8 w-8 text-cyan" />
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-100">
            ATLAS SENTINEL
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Global Crisis Intelligence Platform
          </p>
          <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-amber-400/20 bg-amber-400/5 px-3 py-1">
            <div className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400">
              Secure Authentication Required
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="rounded-lg border border-border bg-surface p-6 space-y-4">
            {error && (
              <div className="rounded-md border border-crimson/20 bg-crimson/5 px-3 py-2 text-xs text-crimson">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-md border border-border bg-abyss px-3 py-2.5 text-sm text-slate-200 placeholder:text-slate-700 focus:border-cyan/30 focus:outline-none focus:ring-1 focus:ring-cyan/20"
                placeholder="analyst@atlas-sentinel.mil"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                Access Code
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-md border border-border bg-abyss px-3 py-2.5 pr-10 text-sm text-slate-200 placeholder:text-slate-700 focus:border-cyan/30 focus:outline-none focus:ring-1 focus:ring-cyan/20"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "flex w-full items-center justify-center gap-2 rounded-md bg-cyan/10 py-2.5 text-sm font-mono font-bold text-cyan transition-all hover:bg-cyan/20",
                isLoading && "opacity-70 cursor-not-allowed"
              )}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  AUTHENTICATING...
                </>
              ) : (
                "ACCESS PLATFORM"
              )}
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-[10px] font-mono text-slate-700">
            NATO STANAG 4609 COMPLIANT // AES-256 ENCRYPTED
          </p>
        </div>
      </div>
    </div>
  );
}
