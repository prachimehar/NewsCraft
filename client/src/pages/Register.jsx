import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl } from "../api";
import newsIcon from "../assets/newspapers.png";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function updateField(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(apiUrl("/api/auth/register"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const body = await response.json().catch(() => null);

      if (!response.ok) {
        const error = new Error(
          body?.message || "Unable to register"
        );

        error.status = response.status;
        throw error;
      }

      navigate("/login", { replace: true });
    } catch (err) {
      setError(
        err.status === 409
          ? "An account with this email already exists."
          : "Unable to connect to NewsCraft. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-[calc(100vh-55px)] bg-[#EFE6D3] flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-[#F5EEDF] border border-[#D8C9A3] shadow-xl">

        {/* =====================================================
            LEFT BRANDING
        ====================================================== */}
        <div className="hidden md:flex bg-[#1C2230] text-[#EFE6D3] p-10 lg:p-14 flex-col justify-between min-h-[650px]">

          <div>

            {/* Logo */}
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


            {/* Editorial Content */}
            <div className="border-t border-[#EFE6D3]/20 pt-8">

              <p className="ncf-mono text-xs tracking-[0.2em] text-[#C41230] mb-4">
                NEW READER
              </p>

              <h1 className="ncf-display text-4xl lg:text-5xl font-bold leading-tight">
                Your daily
                <br />
                wire starts here.
              </h1>

              <p className="mt-6 text-sm leading-7 text-[#EFE6D3]/70 max-w-md">
                Create your NewsCraft account and build your personalized
                news desk. Follow headlines, save stories, manage notes,
                and keep everything that matters in one place.
              </p>

            </div>

          </div>


          {/* Bottom Editorial Text */}
          <div className="border-t border-[#EFE6D3]/20 pt-5">

            <p className="ncf-mono text-[10px] tracking-[0.18em] text-[#EFE6D3]/50">
              EVERY STORY · EVERY BORDER · EVERY DAY
            </p>

          </div>

        </div>


        {/* =====================================================
            RIGHT REGISTER FORM
        ====================================================== */}
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
          <div className="mb-7">

            <p className="ncf-mono text-xs tracking-[0.2em] text-[#C41230] mb-2">
              CREATE ACCOUNT
            </p>

            <h2 className="ncf-display text-3xl sm:text-4xl font-bold text-[#1C2230]">
              Join the desk.
            </h2>

            <p className="text-sm text-[#1C2230]/60 mt-2">
              Create your NewsCraft account to get started.
            </p>

          </div>


          {/* Error */}
          {error && (
            <div className="mb-5 flex items-start gap-3 border border-red-300 bg-red-50 px-4 py-3">

              <span className="text-red-600 text-sm">
                ⚠
              </span>

              <p className="text-sm text-red-700">
                {error}
              </p>

            </div>
          )}


          {/* =====================================================
              REGISTER FORM
          ====================================================== */}
          <form onSubmit={handleSubmit} className="space-y-4">


            {/* Name */}
            <div>

              <label
                htmlFor="name"
                className="block ncf-mono text-xs font-medium tracking-wider text-[#1C2230] mb-2"
              >
                FULL NAME
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={updateField}
                autoComplete="name"
                required
                className="w-full px-4 py-3 bg-[#EFE6D3] border border-[#D8C9A3] text-[#000000] placeholder-[#1C2230]/40 outline-none transition-all duration-200 focus:border-[#1C2230] focus:ring-1 focus:ring-[#1C2230]"
              />

            </div>


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
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={updateField}
                autoComplete="email"
                required
                className="w-full px-4 py-3 bg-[#EFE6D3] border border-[#D8C9A3] text-[#000000] placeholder-[#1C2230]/40 outline-none transition-all duration-200 focus:border-[#1C2230] focus:ring-1 focus:ring-[#1C2230]"
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

                <span className="text-xs text-[#1C2230]/50">
                  Min. 6 characters
                </span>

              </div>


              <div className="relative">

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={form.password}
                  onChange={updateField}
                  autoComplete="new-password"
                  minLength="6"
                  required
                  className="w-full px-4 py-3 pr-16 bg-[#EFE6D3] border border-[#D8C9A3] text-[#000000] placeholder-[#1C2230]/40 outline-none transition-all duration-200 focus:border-[#1C2230] focus:ring-1 focus:ring-[#1C2230]"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#24476B] hover:text-[#C41230] transition-colors"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>

              </div>

            </div>


            {/* Confirm Password */}
            <div>

              <label
                htmlFor="confirmPassword"
                className="block ncf-mono text-xs font-medium tracking-wider text-[#1C2230] mb-2"
              >
                CONFIRM PASSWORD
              </label>

              <div className="relative">

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Repeat your password"
                  value={form.confirmPassword}
                  onChange={updateField}
                  autoComplete="new-password"
                  minLength="6"
                  required
                  className="w-full px-4 py-3 pr-16 bg-[#EFE6D3] border border-[#D8C9A3] text-[#000000] placeholder-[#1C2230]/40 outline-none transition-all duration-200 focus:border-[#1C2230] focus:ring-1 focus:ring-[#1C2230]"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#24476B] hover:text-[#C41230] transition-colors"
                >
                  {showConfirmPassword ? "HIDE" : "SHOW"}
                </button>

              </div>

            </div>


            {/* Register Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-[#C41230] text-[#EFE6D3] font-bold tracking-wide transition-all duration-200 hover:bg-[#1C2230] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">

                  <span className="w-4 h-4 border-2 border-[#EFE6D3]/40 border-t-[#EFE6D3] rounded-full animate-spin" />

                  Creating account...

                </span>
              ) : (
                "Create Account →"
              )}
            </button>

          </form>


          {/* Already Registered */}
          <div className="flex items-center gap-3 my-7">

            <div className="flex-1 border-t border-[#D8C9A3]" />

            <span className="ncf-mono text-[10px] text-[#1C2230]/40 tracking-widest">
              ALREADY A READER?
            </span>

            <div className="flex-1 border-t border-[#D8C9A3]" />

          </div>


          <Link
            to="/login"
            className="w-full text-center py-3 border border-[#1C2230] text-[#1C2230] font-semibold hover:bg-[#1C2230] hover:text-[#EFE6D3] transition-colors duration-200"
          >
            Sign In to NewsCraft
          </Link>


          {/* Footer */}
          <p className="text-center text-[11px] text-[#1C2230]/40 mt-7 leading-relaxed">
            Create your account and start building
            your personalized NewsCraft experience.
          </p>

        </div>

      </div>

    </main>
  );
}

export default Register;