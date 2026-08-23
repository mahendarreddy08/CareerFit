import { howItWorks } from "@/data/careerfit"

export function HowItWorks() {
  return (
    <section className="editorial-shell px-4 py-16 md:py-24">
      <div className="border-t border-border pt-10">
        <div className="grid gap-8 md:grid-cols-4 md:gap-10">
          {howItWorks.map((item) => (
            <article key={item.step} className="pt-5 md:pt-6">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {item.step}
              </p>
              <h3 className="mt-4 text-2xl leading-none tracking-[-0.06em] text-foreground md:text-3xl">
                {item.title}
              </h3>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}