import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { marked } from "marked";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  const post = await prisma.blogPost.findUnique({
    where: { slug, published: true },
  });

  if (!post) notFound();

  return (
    <div className="mx-auto min-h-screen max-w-[1200px] space-y-8 px-4 py-16 md:px-8  ">
      <Link
        href="/blog"
        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-transparent px-4 py-2 font-[family-name:var(--font-body)] text-sm leading-none font-semibold text-[#005a9c] no-underline transition hover:bg-[#f7f9fc] hover:text-[#0d2c4f]"
      >
        ← Volver al blog
      </Link>

      <article>
        <h1 className="mb-2 text-left font-[family-name:var(--font-heading)] text-[1.25rem] font-bold text-[#0d2c4f] md:text-[1.75rem]">
          {post.title}
        </h1>

        <div className="mb-6 flex items-center gap-4 text-sm text-slate-500">
          <span>Por {post.author}</span>
          <span>·</span>
          <span>
            {new Date(post.createdAt).toLocaleDateString("es-PE", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>

        {post.tags && (
          <div className="mb-6 flex flex-wrap gap-2">
            {post.tags.split(",").map((tag) => (
              <span
                key={tag}
                className="mb-2 inline-block rounded-full bg-[#dbeafe] px-[0.6rem] py-[0.2rem] text-xs font-semibold tracking-[0.05em] text-[#1d4ed8] uppercase"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        )}

        <div
          className="prose prose-slate max-w-none"
          dangerouslySetInnerHTML={{ __html: marked.parse(post.content) as string }}
        />
      </article>
    </div>
  );
}

