import "dotenv/config";
import { prisma } from "./src/lib/prisma";
async function main() {
  console.log("URL host:", (process.env.DATABASE_URL || "(undefined)").replace(/(:\/\/[^:]+:)[^@]+@/, "$1****@").slice(0, 70));
  for (let i = 0; i < 3; i++) {
    try {
      const posts = await prisma.blogPost.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } });
      console.log(`try ${i}: OK posts=${posts.length}`);
    } catch (e: any) {
      console.log(`try ${i}: ERR ${e?.code} ${JSON.stringify(e?.message).slice(0, 120)}`);
    }
  }
  await prisma.$disconnect();
}
main();
