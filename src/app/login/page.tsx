"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        sessionStorage.setItem("adminAuth", "true");
        router.push("/admin/dashboard");
      } else {
        setError("Invalid password");
      }
    } catch {
      setError("Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3">
            Admin <span className="text-[#00a67e]">Access</span>
          </h1>
          <p className="text-foreground/60">Enter password to continue</p>
        </div>

        <div className="bg-surface p-8 rounded-2xl shadow-2xl border border-[#00a67e]/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-[#00a67e]"
              >
                Admin Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full p-4 rounded-xl bg-surface border-2 border-[#00a67e]/30 
                         text-foreground placeholder:text-foreground/50
                         focus:outline-none focus:border-[#00a67e] 
                         focus:shadow-[0_0_20px_rgba(0,166,126,0.3)] 
                         transition-all duration-300"
                required
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center bg-red-500/10 p-3 rounded-lg border border-red-500/30">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-primary text-white font-bold
                       rounded-xl hover:shadow-[0_0_30px_rgba(0,166,126,0.5)] 
                       transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                       transform hover:scale-[1.02]"
            >
              {loading ? "Authenticating..." : "Access Dashboard"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}