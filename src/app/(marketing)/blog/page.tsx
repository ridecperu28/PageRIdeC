import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto min-h-screen max-w-[1200px] space-y-8 px-4 py-16 md:px-8">
      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="block w-full overflow-hidden rounded-2xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)]"
          >
            <div className="p-6">
              <div className="mb-1 text-xs text-slate-400">
                {new Date(post.createdAt).toLocaleDateString("es-PE", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
              <h3 className="mb-2 font-[family-name:var(--font-heading)] text-base font-bold text-[#0d2c4f]">{post.title}</h3>
              <p className="mb-2 text-sm leading-[1.5] text-gray-500">
                Por {post.author}
              </p>
              {post.tags && (
                <div className="flex flex-wrap gap-1">
                  {post.tags.split(",").map((tag) => (
                    <span
                      key={tag}
                      className="mb-2 inline-block rounded-full bg-blue-100 px-[0.6rem] py-[0.2rem] text-xs font-semibold tracking-[0.05em] text-blue-700 uppercase"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </section>

      {posts.length === 0 && (
        <p className="text-slate-500">Próximamente publicaremos artículos.</p>
      )}
    </div>
  );
}
