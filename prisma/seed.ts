import "dotenv/config";

import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../lib/generated/prisma/client";

const FEATURED_COUNT = 4;
const PRODUCT_LIMIT = 20;

type DummyJsonProduct = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string;
  brand?: string;
  rating?: number;
  stock?: number;
};

async function main() {
  const adapter = new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL ?? "file:./dev.db",
  });
  const prisma = new PrismaClient({ adapter });

  const response = await fetch(
    `https://dummyjson.com/products?limit=${PRODUCT_LIMIT}`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }

  const data = (await response.json()) as { products: DummyJsonProduct[] };

  for (const [index, product] of data.products.entries()) {
    await prisma.product.upsert({
      where: { id: String(product.id) },
      update: {
        title: product.title,
        description: product.description,
        price: product.price,
        category: product.category,
        image: product.thumbnail,
        brand: product.brand ?? null,
        rating: product.rating ?? null,
        stock: product.stock ?? 10,
        featured: index < FEATURED_COUNT,
      },
      create: {
        id: String(product.id),
        title: product.title,
        description: product.description,
        price: product.price,
        category: product.category,
        image: product.thumbnail,
        brand: product.brand ?? null,
        rating: product.rating ?? null,
        stock: product.stock ?? 10,
        featured: index < FEATURED_COUNT,
      },
    });
  }

  const total = await prisma.product.count();
  const featured = await prisma.product.count({ where: { featured: true } });

  console.log(`Seeded ${total} products (${featured} featured for banner).`);

  await prisma.$disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
