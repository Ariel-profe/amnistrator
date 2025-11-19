'use client';

export function HeroSection() {
  return (
    <section
      className="relative w-full overflow-hidden py-32 font-light text-white antialiased md:py-20 min-h-[calc(100vh-22.5rem)] flex items-center"
      style={{
        background: 'linear-gradient(135deg, #060713 0%, #0f0d27 100%)'
      }}
    >
      <div
        className="absolute top-0 right-0 h-full w-1/2"
        style={{
          background:
            'radial-gradient(circle at 70% 30%, rgba(155, 135, 245, 0.15) 0%, rgba(13, 10, 25, 0) 60%)',
        }}
      />
      <div
        className="absolute top-0 left-0 h-full w-1/2 -scale-x-100"
        style={{
          background:
            'radial-gradient(circle at 70% 30%, rgba(121, 101, 209, 0.15) 0%, rgba(13, 10, 25, 0) 60%)',
        }}
      />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className='flex flex-col items-center justify-center'>
          <span className="mb-6 inline-block rounded-full border border-amn px-3 py-1 text-xs text-slate-300">
            Software de administración de datos
          </span>
          <h1 className="mx-auto mb-6 max-w-4xl text-4xl font-light md:text-5xl lg:text-7xl">
            Organiza tu empresa con{' '}
            <span className="text-amn">AMN</span>istrator
          </h1>
        <div className="h-40  md:h-64 animate-spin [animation-duration:30s] ">
          <img
            src="/amn-globe.svg"
            alt="amn globe"
            className="opacity-70 object-contain h-full mx-auto fadeIn"
            />
        </div>
        </div>
      </div>
    </section>
  );
}
