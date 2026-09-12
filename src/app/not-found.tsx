import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0E0D0C] text-[#EDE8DF] flex flex-col items-center justify-center p-8 text-center select-none">
      <div className="font-mono text-xs tracking-[0.25em] text-ochre uppercase mb-3">
        404 // ROUTE NOT FOUND
      </div>
      <h1 className="font-serif text-5xl md:text-7xl font-light text-cream tracking-tight mb-4">
        Page Not Found
      </h1>
      <p className="font-sans text-sm text-[#8A847C] max-w-md mb-8 leading-relaxed">
        The coordinates you requested do not exist within this portfolio experience.
      </p>
      <Link
        href="/"
        className="font-mono text-xs tracking-[0.2em] uppercase px-5 py-2.5 rounded border border-cream/20 text-cream hover:border-ochre hover:text-ochre transition-colors"
      >
        ← Return to Gateway
      </Link>
    </main>
  );
}
