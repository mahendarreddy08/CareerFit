"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Compass,
  LayoutDashboard,
  Sparkles,
  Layers,
  Map,
  BookOpen,
  Code2,
  Mic,
  TrendingUp,
  User,
  ChevronUp,
  ChevronDown,
} from "lucide-react"

export function DemoDock() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  const links = [
    { label: "Landing", href: "/", icon: Compass },
    { label: "Login", href: "/login", icon: Sparkles },
    { label: "Onboarding", href: "/onboarding", icon: Sparkles },
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Skill Gap", href: "/skills", icon: Layers },
    { label: "Roadmap", href: "/roadmap", icon: Map },
    { label: "Learning", href: "/learning", icon: BookOpen },
    { label: "Practice", href: "/practice", icon: Code2 },
    { label: "Interview", href: "/interview", icon: Mic },
    { label: "Progress", href: "/progress", icon: TrendingUp },
    { label: "Profile", href: "/profile", icon: User },
  ]

  return (
    <aside
      aria-label="Judge demo quick navigation"
      className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 transition-all duration-200 pointer-events-auto"
    >
      <div className="bg-[#11141a]/95 border border-white/[0.12] shadow-[0_12px_40px_rgba(0,0,0,0.7)] backdrop-blur-xl rounded-full px-3 py-1.5 flex items-center gap-1.5 text-xs">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-[#5ce1e6] hover:text-white px-2 py-1 rounded-full bg-[#5ce1e6]/10 border border-[#5ce1e6]/25"
        >
          <span>SIH Demo Bar</span>
          {collapsed ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>

        {!collapsed && (
          <nav
            aria-label="Demo steps"
            className="flex items-center gap-1 overflow-x-auto max-w-[85vw] sm:max-w-none scrollbar-none py-0.5"
          >
            {links.map((link) => {
              const isActive = pathname === link.href
              const Icon = link.icon
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all whitespace-nowrap text-decoration-none ${
                    isActive
                      ? "bg-white text-[#0d0f12] font-semibold shadow-sm"
                      : "text-white/60 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{link.label}</span>
                </Link>
              )
            })}
          </nav>
        )}
      </div>
    </aside>
  )
}
