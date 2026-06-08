import Image from "next/image";

type Product = {
  id: string;
  title: string;
  price: number;
  category: string;
  image: string;
  rating: number | null;
  stock: number;
};

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-zinc-100 bg-white shadow-md transition-shadow hover:shadow-lg">
      <div className="relative aspect-square w-full bg-zinc-50">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover p-3"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="text-xs capitalize text-zinc-500">{product.category}</p>
        <h3 className="line-clamp-2 text-sm font-medium text-zinc-900">
          {product.title}
        </h3>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-base font-semibold text-zinc-900">
            ${product.price.toFixed(2)}
          </span>
          {product.rating != null && (
            <span className="text-xs text-amber-600">★ {product.rating}</span>
          )}
        </div>
      </div>
    </article>
  );
}
