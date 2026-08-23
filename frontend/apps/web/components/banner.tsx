export function Banner() {
  return (
    <footer className="fixed bottom-0 left-0 z-50 w-full border-t border-border bg-background/95 backdrop-blur-sm">
      <div className="editorial-shell flex items-center justify-between gap-4 py-2.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="text-foreground">CareerFit</span>
          <span aria-hidden="true">/</span>
          <span>Analysis engine</span>
        </div>
        <div className="hidden sm:flex">
          <span>Know your fit.</span>
        </div>
      </div>
    </footer>
  )
}
