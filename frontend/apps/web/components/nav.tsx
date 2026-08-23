import Link from "next/link"

export function Nav() {
  return (
    <nav aria-label="Main navigation" className="site-nav"><div className="editorial-shell nav-inner"><Link href="/" className="brand-mark">CareerFit</Link><Link href="/analyze" className="nav-action">Analyze <span aria-hidden="true">→</span></Link></div></nav>
  )
}
