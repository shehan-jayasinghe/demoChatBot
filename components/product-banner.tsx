import Image from "next/image";

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  brand: string | null;
  rating: number | null;
};

type ProductBannerProps = {
  products: Product[];
};

export function ProductBanner({ products }: ProductBannerProps) {
  if (products.length === 0) {
    return null;
  }

  const hero = products[0];
  const sideProducts = products.slice(1, 4);

  return (
    <section className="w-full rounded-2xl border border-zinc-100 bg-white p-6 shadow-lg md:p-8">
      <div className="mb-6">
        <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
          Featured
        </p>
        <h2 className="mt-1 text-2xl font-semibold text-zinc-900 md:text-3xl">
          Top picks this week
        </h2>
      </div>

      <div className="grid gap-5 lg:grid-cols-5">
        <article className="flex flex-col gap-4 rounded-xl border border-zinc-100 bg-zinc-50 p-4 shadow-md sm:flex-row lg:col-span-3">
          <div className="relative h-52 w-full shrink-0 overflow-hidden rounded-lg bg-white sm:h-60 sm:w-60">
            <Image
              src={hero.image}
              alt={hero.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 240px"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-xs uppercase tracking-wide text-zinc-500">
              {hero.category}
            </p>
            <h3 className="mt-1 text-xl font-semibold text-zinc-900">
              {hero.title}
            </h3>
            <p className="mt-2 line-clamp-3 text-sm text-zinc-600">
              {hero.description}
            </p>
            <div className="mt-4 flex items-center gap-3">
              <span className="text-2xl font-bold text-zinc-900">
                ${hero.price.toFixed(2)}
              </span>
              {hero.rating != null && (
                <span className="text-sm text-amber-600">★ {hero.rating}</span>
              )}
            </div>
          </div>
        </article>

        <div className="grid gap-3 sm:grid-cols-3 lg:col-span-2 lg:grid-cols-1">
          {sideProducts.map((product) => (
            <article
              key={product.id}
              className="flex items-center gap-3 rounded-xl border border-zinc-100 bg-white p-3 shadow-md"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-zinc-50">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <div className="min-w-0">
                <h4 className="line-clamp-2 text-sm font-medium text-zinc-900">
                  {product.title}
                </h4>
                <p className="mt-1 text-sm font-semibold text-zinc-900">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
