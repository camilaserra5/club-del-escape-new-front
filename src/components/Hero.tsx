const Hero = () => {
  return (
    <section className="bg-stone-900 text-white">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-red-300 via-amber-100 to-orange-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            Las mejores salas de escape en Buenos Aires
          </h1>

          <p className="mx-auto mt-4 max-w-xl sm:text-xl sm:leading-relaxed">
            Algo algo que no se me ocurre que poner pero bueno chau
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded border border-amber-600 px-12 py-3 text-sm font-medium text-white hover:bg-amber-600 focus:outline-none focus:ring active:bg-amber-500 sm:w-auto"
              href="/book/colegiales"
            >
              Reservar en Colegiales
            </a>

            <a
              className="block w-full rounded border border-amber-600 px-12 py-3 text-sm font-medium text-white hover:bg-amber-600 focus:outline-none focus:ring active:bg-amber-500 sm:w-auto"
              href="/book/palermo"
            >
              Reservar en Palermo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
