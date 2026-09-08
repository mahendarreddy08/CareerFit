"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, X, ChevronRight } from "lucide-react"
import { getActiveStudent, StudentProfile } from "@/lib/demo-data"

export function Nav() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [student, setStudent] = useState<StudentProfile | null>(null)

  useEffect(() => {
    setStudent(getActiveStudent())
  }, [pathname])

  const isAppRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/career") ||
    pathname.startsWith("/skills") ||
    pathname.startsWith("/roadmap") ||
    pathname.startsWith("/learning") ||
    pathname.startsWith("/practice") ||
    pathname.startsWith("/interview") ||
    pathname.startsWith("/progress") ||
    pathname.startsWith("/profile")

  const appNavLinks = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Skills", href: "/skills" },
    { label: "Roadmap", href: "/roadmap" },
    { label: "Practice", href: "/practice" },
    { label: "Interviews", href: "/interview" },
    { label: "Progress", href: "/progress" },
  ]

  const publicNavLinks = [
    { label: "4-Year Journey", href: "/#journey" },
    { label: "Next Best Action", href: "/#methodology" },
    { label: "Features", href: "/#features" },
    { label: "About", href: "/#about" },
  ]

  return (
    <header className="site-nav">
      <div className="editorial-shell flex items-center justify-between py-3.5 gap-4">
        {/* Brand */}
        <Link href={isAppRoute ? "/dashboard" : "/"} className="flex items-center gap-2 group text-decoration-none">
          <div className="w-6 h-6 rounded bg-gradient-to-br from-white/90 to-white/60 flex items-center justify-center text-[#0d0f12] text-xs font-bold font-mono">
            C
          </div>
          <span className="text-sm font-semibold tracking-tight text-white group-hover:text-white/90">
            CareerFit <span className="text-[#5ce1e6] font-mono text-xs font-medium">AI</span>
          </span>
        </Link>

        {/* Center Links */}
        <nav className="hidden md:flex items-center gap-6">
          {isAppRoute
            ? appNavLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`nav-link ${isActive ? "nav-link-active" : ""}`}
                  >
                    {link.label}
                  </Link>
                )
              })
            : publicNavLinks.map((link) => (
                <a key={link.href} href={link.href} className="nav-link">
                  {link.label}
                </a>
              ))}
        </nav>

        {/* Right CTA / User profile */}
        <div className="hidden md:flex items-center gap-3">
          {isAppRoute ? (
            <Link
              href="/profile"
              className="flex items-center gap-2.5 px-3 py-1.5 rounded bg-white/[0.04] border border-white/[0.08] hover:border-white/20 transition-all text-decoration-none"
            >
              <div className="w-5 h-5 rounded-full bg-[#5ce1e6]/20 border border-[#5ce1e6]/40 flex items-center justify-center text-[10px] text-[#5ce1e6] font-bold">
                {student?.name?.charAt(0) || "M"}
              </div>
              <div className="text-left leading-tight">
                <span className="block text-xs font-medium text-white/90">
                  {student?.name || "Mahendar Reddy"}
                </span>
                <span className="block text-[10px] text-white/40">
                  {student?.year || "2nd Year"}
                </span>
              </div>
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="text-xs font-medium text-white/70 hover:text-white px-3 py-2 transition-colors"
              >
                Sign In
              </Link>
              <Link href="/onboarding" className="btn-accent text-xs py-2 px-3.5">
                Start Journey <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-white/70 hover:text-white"
          aria-label="Toggle Navigation"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/[0.08] bg-[#0d0f12]/95 px-6 py-4 flex flex-col gap-3">
          {(isAppRoute ? appNavLinks : publicNavLinks).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm py-2 text-white/80 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-white/[0.08] flex flex-col gap-2">
            {isAppRoute ? (
              <Link
                href="/profile"
                onClick={() => setMobileOpen(false)}
                className="btn-secondary text-xs"
              >
                Profile: {student?.name || "Mahendar Reddy"}
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="btn-secondary text-xs"
                >
                  Sign In
                </Link>
                <Link
                  href="/onboarding"
                  onClick={() => setMobileOpen(false)}
                  className="btn-accent text-xs"
                >
                  Start Journey
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
