import type React from "react";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { getAllowedList, signInWithEmail, signUpWithEmail } from "../../api/db";
import BrutalistSwitch from "../../ui/Switch";
import { Session, User } from "@supabase/supabase-js";
import { useUserSession } from "../../store/auth";

function LoginPage() {
  const [signUpText, setSignUpText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { setSession } = useUserSession();
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");
  const navigate = useNavigate();
  const [allowedEmails, setAllowedEmails] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const emails = await getAllowedList();
        if (!emails) return;
        setAllowedEmails(emails);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    let success: { user: User | null; session: Session | null } | null = null;

    try {
      if (mode == "signIn") {
        success = await signInWithEmail(email, password);
      } else {
        success = await signUpWithEmail(email, password);
        setSignUpText("A Confermation link was sent to your email");
        return;
      }
    } catch (error) {
      console.error(error);
    }

    if (!success) return;

    const { session } = success;

    if (!session) return;

    setLoading(false);

    setSession(session);

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-vibrant-pink/30 rounded-2xl rotate-12 blur-xl animate-float" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-vibrant-amber/30 rounded-2xl -rotate-12 blur-xl animate-float [animation-delay:1s]" />
      <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-vibrant-teal/30 rounded-2xl rotate-45 blur-xl animate-float [animation-delay:2s]" />

      <div className="w-full max-w-md animate-scale-in">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold font-mono mb-2 text-foreground">
            {mode == "signIn" ? "WELCOME BACK" : "CREATE ACCOUNT"}
          </h2>
          <p className="text-muted-foreground">
            {mode == "signIn" ? "Sign in to your dashboard" : "Join FoxwareDen today"}
          </p>
        </div>

        {/* Login Form Container */}
        <div className="border border-foreground/10 rounded-2xl overflow-hidden bg-card shadow-xl">
          <div className="h-1.5 bg-gradient-to-r from-vibrant-purple via-vibrant-teal to-vibrant-amber" />
          <div className="p-8">
            {/* Email Login Form */}
            <form onSubmit={handleEmailLogin} className="space-y-6">
              {/* Email Field */}
              {signUpText && (
                <div className="p-4 bg-vibrant-teal/10 border border-vibrant-teal/20 rounded-xl">
                  <h2 className="text-lg font-mono text-vibrant-teal">
                    {signUpText}
                  </h2>
                </div>
              )}
              <div className="animate-fade-in-up opacity-0 [animation-delay:0.1s]">
                <label
                  htmlFor="email"
                  className="block font-mono font-bold mb-2 text-foreground"
                >
                  EMAIL
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border border-foreground/10 rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-vibrant-purple/50 focus:border-vibrant-purple transition-all ${
                      allowedEmails.includes(email) &&
                      "border-vibrant-teal focus:ring-vibrant-teal/50"
                    }`}
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="animate-fade-in-up opacity-0 [animation-delay:0.2s]">
                <label
                  htmlFor="password"
                  className="block font-mono font-bold mb-2 text-foreground"
                >
                  PASSWORD
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-foreground/10 rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-vibrant-purple/50 focus:border-vibrant-purple transition-all"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    aria-label="reveal password button"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-vibrant-purple transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                disabled={loading}
                type="submit"
                aria-label="submit button"
                className={`w-full py-3 bg-gradient-to-r from-vibrant-purple to-vibrant-teal text-white rounded-xl hover:shadow-lg hover:shadow-vibrant-purple/25 transition-all duration-300 hover:-translate-y-0.5 font-mono font-bold animate-fade-in-up opacity-0 [animation-delay:0.3s] ${
                  loading && "opacity-50 cursor-not-allowed"
                }`}
              >
                {mode === "signIn" ? "SIGN IN" : "SIGN UP"}
              </button>

              <div className="flex gap-4 items-center justify-between animate-fade-in-up opacity-0 [animation-delay:0.4s]">
                <label
                  htmlFor="mode-switch"
                  className="block font-mono text-sm text-muted-foreground"
                >
                  {mode === "signIn" ? "Need an account?" : "Already have an account?"}
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {mode === "signIn" ? "Sign Up" : "Sign In"}
                  </span>
                  <BrutalistSwitch
                    disabled={loading}
                    checked={mode === "signUp"}
                    onCheckedChange={() => {
                      setMode((prev) => (prev == "signIn" ? "signUp" : "signIn"));
                    }}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6 animate-fade-in-up opacity-0 [animation-delay:0.5s]">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-vibrant-purple transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            BACK TO HOME
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
