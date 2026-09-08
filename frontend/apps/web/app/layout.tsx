import { Inter, Playfair_Display } from "next/font/google"

import "@workspace/ui/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Nav } from "@/components/nav"
import { DemoDock } from "@/components/demo-dock"
import { cn } from "@workspace/ui/lib/utils"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
})

export const metadata = {
  title: "CareerFit AI — Know Your Gap. Build Your Career.",
  description:
    "AI-powered career readiness that understands where you are, identifies what you're missing, and shows you exactly what to do next.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "dark antialiased scroll-smooth",
        inter.variable,
        playfair.variable,
      )}
    >
      <body className="min-h-svh bg-background text-foreground selection:bg-accent/20 selection:text-foreground">
        <ThemeProvider>
          <div className="cf-bg-atmosphere">
            <Nav />
            <main className="pb-16">{children}</main>
            <DemoDock />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
