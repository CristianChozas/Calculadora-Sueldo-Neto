export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-18">
      <section className="w-full max-w-5xl rounded-[var(--radius-card)] border border-border bg-surface px-8 py-12 shadow-[var(--shadow-soft)] sm:px-12 sm:py-16">
        <span className="inline-flex rounded-[var(--radius-pill)] bg-accent-soft px-4 py-2 text-sm font-medium tracking-[0.18em] text-accent uppercase">
          CSN 2025
        </span>
        <div className="mt-8 max-w-3xl space-y-6">
          <h1 className="text-4xl font-semibold tracking-tight text-primary-strong sm:text-6xl">
            Calculadora de sueldo neto con base fiscal 2025.
          </h1>
          <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Base de proyecto preparada para construir una experiencia clara,
            fiable y profesional, con la logica fiscal aislada y lista para los
            siguientes tickets del roadmap.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <article className="rounded-[var(--radius-card)] bg-surface-muted p-5">
            <p className="text-sm font-medium text-muted">Tipografia</p>
            <p className="mt-2 text-lg font-semibold text-primary">
              Geist Sans y Geist Mono
            </p>
          </article>
          <article className="rounded-[var(--radius-card)] bg-surface-muted p-5">
            <p className="text-sm font-medium text-muted">Paleta</p>
            <p className="mt-2 text-lg font-semibold text-primary">
              Azul marino, slate y acento teal
            </p>
          </article>
          <article className="rounded-[var(--radius-card)] bg-surface-muted p-5">
            <p className="text-sm font-medium text-muted">Estado</p>
            <p className="mt-2 text-lg font-semibold text-primary">
              Setup listo para CSN-003
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
