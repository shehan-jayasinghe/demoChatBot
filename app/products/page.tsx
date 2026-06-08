export const dynamic = "force-dynamic";

import { ProductBanner } from "@/components/product-banner";
import { PageWrapper } from "@/components/page-wrapper";
import { ProductCard } from "@/components/product-card";
import { prisma } from "@/lib/db";

function groupByCategory<T extends { category: string }>(items: T[]) {
  return items.reduce<Record<string, T[]>>((groups, item) => {
    const list = groups[item.category] ?? [];
    list.push(item);
    groups[item.category] = list;
    return groups;
  }, {});
}

export default async function ProductsPage() {
  const [featured, allProducts] = await Promise.all([
    prisma.product.findMany({
      where: { featured: true },
      orderBy: { title: "asc" },
      take: 4,
    }),
    prisma.product.findMany({
      orderBy: [{ category: "asc" }, { title: "asc" }],
    }),
  ]);

  const nonFeatured = allProducts.filter((product) => !product.featured);
  const byCategory = groupByCategory(nonFeatured);
  const categories = Object.keys(byCategory).sort();

  return (
    <PageWrapper title="Demo Store" subtitle="Products by category">
      {featured.length > 0 ? (
        <ProductBanner products={featured} />
      ) : (
        <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-6 text-center">
          <p className="text-zinc-600">No products yet.</p>
          <p className="mt-2 text-sm text-zinc-500">
            Run <code className="rounded bg-zinc-100 px-1">npm run db:setup</code>{" "}
            to seed demo data.
          </p>
        </div>
      )}

      {categories.map((category) => (
        <section
          key={category}
          className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-lg sm:p-6"
        >
          <h2 className="mb-4 text-lg font-semibold capitalize text-zinc-900">
            {category}
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {byCategory[category].map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      ))}
    </PageWrapper>
  );
}
