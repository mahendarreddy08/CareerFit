import { Inter } from "next/font/google"

import "@workspace/ui/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Nav } from "@/components/nav"
import { cn } from "@workspace/ui/lib/utils"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata = {
  title: "CareerFit — Know your fit. Close the gap.",
  description:
    "Compare your experience with any role and see what matches, what is missing, and what matters next.",
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
      className={cn("antialiased scroll-smooth", inter.variable, "font-sans")}
    >
      <body className="min-h-svh bg-background text-foreground selection:bg-[#7e8164]/20 selection:text-foreground">
        <ThemeProvider>
          <div className="min-h-svh bg-[linear-gradient(to_bottom,_rgba(23,23,20,0.02),_transparent_28%)]">
            <Nav />
            <main>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
