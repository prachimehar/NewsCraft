import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth.jsx";
import newsIcon from "../assets/newspapers.png";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login(email, password);

      navigate(location.state?.from || "/home", {
        replace: true,
      });
    } catch (err) {
      setError(
        err.status === 401
          ? "Invalid email or password."
          : "Unable to connect to NewsCraft. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-[calc(100vh-55px)] bg-[#EFE6D3] flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-[#F5EEDF] border border-[#D8C9A3] shadow-xl">

        {/* ================= LEFT BRANDING ================= */}
        <div className="hidden md:flex bg-[#1C2230] text-[#EFE6D3] p-10 lg:p-14 flex-col justify-between min-h-[570px]">

          <div>
            <div className="flex items-center gap-3 mb-10">
              <img
                src={newsIcon}
                alt="NewsCraft"
                className="w-11 h-11 -rotate-6"
              />

              <div>
                <p className="ncf-mono text-xs tracking-[0.25em] text-[#C41230]">
                  NEWSCRAFT
                </p>

                <p className="text-xs text-[#EFE6D3]/60 mt-1">
                  GLOBAL EDITION
                </p>
              </div>
            </div>

            <div className="border-t border-[#EFE6D3]/20 pt-8">
              <p className="ncf-mono text-xs tracking-[0.2em] text-[#C41230] mb-4">
                WELCOME BACK
              </p>

              <h1 className="ncf-display text-4xl lg:text-5xl font-bold leading-tight">
                Your daily wire is waiting.
              </h1>

              <p className="mt-6 text-sm leading-7 text-[#EFE6D3]/70 max-w-md">
                Sign in to continue reading the latest headlines, save your
                stories, manage your notes, and keep your edition organized.
              </p>
            </div>
          </div>

          <div className="border-t border-[#EFE6D3]/20 pt-5">
            <p className="ncf-mono text-[10px] tracking-[0.18em] text-[#EFE6D3]/50">
              EVERY STORY · EVERY BORDER · EVERY DAY
            </p>
          </div>
        </div>

        {/* ================= RIGHT LOGIN ================= */}
        <div className="p-7 sm:p-10 lg:p-14 flex flex-col justify-center">

          {/* Mobile Logo */}
          <div className="flex md:hidden items-center justify-center gap-3 mb-8">
            <img
              src={newsIcon}
              alt="NewsCraft"
              className="w-10 h-10 -rotate-6"
            />

            <div>
              <p className="ncf-mono text-sm font-semibold tracking-[0.2em] text-[#1C2230]">
                NEWSCRAFT
              </p>

              <p className="ncf-mono text-[9px] tracking-widest text-[#C41230]">
                GLOBAL EDITION
              </p>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <p className="ncf-mono text-xs tracking-[0.2em] text-[#C41230] mb-2">
              MEMBER LOGIN
            </p>

            <h2 className="ncf-display text-3xl sm:text-4xl font-bold text-[#1C2230]">
              Welcome back.
            </h2>

            <p className="text-sm text-[#1C2230]/60 mt-2">
              Sign in to your NewsCraft account.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 flex items-start gap-3 border border-red-300 bg-red-50 px-4 py-3">
              <span className="text-red-600 text-sm">⚠</span>

              <p className="text-sm text-red-700">
                {error}
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block ncf-mono text-xs font-medium tracking-wider text-[#1C2230] mb-2"
              >
                EMAIL ADDRESS
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="w-full px-4 py-3 bg-[#EFE6D3] border border-[#D8C9A3] text-[#1C2230] placeholder-[#1C2230]/40 outline-none transition-all duration-200 focus:border-[#1C2230] focus:ring-1 focus:ring-[#1C2230]"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="ncf-mono text-xs font-medium tracking-wider text-[#1C2230]"
                >
                  PASSWORD
                </label>

                {/* Keep this as a placeholder until forgot-password
                    functionality exists */}
                <span className="text-xs text-[#1C2230]/50">
                  Secure login
                </span>
              </div>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="w-full px-4 py-3 pr-20 bg-[#EFE6D3] border border-[#D8C9A3] text-[#1C2230] placeholder-[#1C2230]/40 outline-none transition-all duration-200 focus:border-[#1C2230] focus:ring-1 focus:ring-[#1C2230]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#24476B] hover:text-[#C41230] transition-colors"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-[#C41230] text-[#EFE6D3] font-bold tracking-wide transition-all duration-200 hover:bg-[#1C2230] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-[#EFE6D3]/40 border-t-[#EFE6D3] rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Sign In →"
              )}
            </button>
          </form>

          {/* Register */}
          <div className="flex items-center gap-3 my-7">
            <div className="flex-1 border-t border-[#D8C9A3]" />
            <span className="ncf-mono text-[10px] text-[#1C2230]/40 tracking-widest">
              NEW HERE?
            </span>
            <div className="flex-1 border-t border-[#D8C9A3]" />
          </div>

          <Link
            to="/register"
            className="w-full text-center py-3 border border-[#1C2230] text-[#1C2230] font-semibold hover:bg-[#1C2230] hover:text-[#EFE6D3] transition-colors duration-200"
          >
            Create an Account
          </Link>

          {/* Footer text */}
          <p className="text-center text-[11px] text-[#1C2230]/40 mt-7 leading-relaxed">
            By signing in, you continue to your personalized
            NewsCraft experience.
          </p>
        </div>
      </div>
    </main>
  );
}

export default Login;