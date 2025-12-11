import { PrismaClient } from "./src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  const created = await prisma.product.create({
    data: {
      name: "Test Product",
      category: "Testing",
      price: 99.99,
      product_code: "TEST123",
      quantity: 10,
      unit: "pcs",
    },
  });

  console.log("Created:", created);

  // ✅ 2. Read products
  const allProducts = await prisma.product.findMany();
  console.log("All Products:", allProducts);

  // ✅ 3. Update product
  const updated = await prisma.product.update({
    where: { id: created.id },
    data: { quantity: 20 },
  });

  console.log("Updated:", updated);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });