"use client";

import { useState } from "react";

export interface BlogItem {
  id: number;
  title: string;
  slug: string;
  content: string;
  author: string;
  image: string | null;
  tags: string;
  published: boolean;
}

export type BlogInput = Omit<BlogItem, "id">;

const inputClass =
  "w-full rounded-xl border border-[#e0e0e0] bg-white px-[0.9rem] py-[0.6rem] font-[family-name:var(--font-body)] text-base text-[#333] outline-none transition placeholder:text-[#94a3b8] focus:border-[#0d2c4f] focus:shadow-[0_0_0_3px_rgba(13,44,79,0.12)]";
const formGroup = "flex flex-col gap-[0.35rem]";
const formLabel = "text-sm font-medium text-[#333]";
const btnPrimarySm =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-4 py-2 font-[family-name:var(--font-body)] text-sm leading-none font-semibold text-[#060b18] no-underline transition duration-200 hover:-translate-y-px hover:bg-cyan-500 hover:shadow-[0_4px_16px_rgba(34,211,238,0.3)] active:translate-y-0";
const btnGhostSm =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-transparent px-4 py-2 font-[family-name:var(--font-body)] text-sm leading-none font-semibold text-[#6c757d] no-underline transition duration-200 hover:-translate-y-px hover:bg-[#f7f9fc] hover:text-[#0d2c4f] active:translate-y-0";

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function BlogModal({
  post,
  onSave,
  onCancel,
}: {
  post: BlogItem | null;
  onSave: (data: BlogInput) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [author, setAuthor] = useState(post?.author ?? "");
  const [image, setImage] = useState(post?.image ?? "");
  const [tags, setTags] = useState(post?.tags ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [published, setPublished] = useState(post?.published ?? false);

  function handleTitle(value: string) {
    setTitle(value);
    if (!post) setSlug(slugify(value));
  }

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center overflow-y-auto bg-black/60 p-6"
      onClick={onCancel}
    >
      <div
        className="m-auto w-full max-w-[720px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rounded-2xl border border-white/[0.06] bg-white p-12">
          <h3 className="mt-0 mb-8 font-[family-name:var(--font-heading)] text-lg font-bold text-[#0d2c4f]">
            {post ? "Editar publicación" : "Crear publicación"}
          </h3>

          <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
            <div className={formGroup}>
              <label className={formLabel} htmlFor="blog-title">Título</label>
              <input
                id="blog-title"
                className={inputClass}
                type="text"
                value={title}
                onChange={(e) => handleTitle(e.target.value)}
              />
            </div>

            <div className={formGroup}>
              <label className={formLabel} htmlFor="blog-slug">Slug</label>
              <input
                id="blog-slug"
                className={inputClass}
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>

            <div className={formGroup}>
              <label className={formLabel} htmlFor="blog-author">Autor</label>
              <input
                id="blog-author"
                className={inputClass}
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>

            <div className={formGroup}>
              <label className={formLabel} htmlFor="blog-image">Imagen (URL)</label>
              <input
                id="blog-image"
                className={inputClass}
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>

            <div className={`${formGroup} col-span-full`}>
              <label className={formLabel} htmlFor="blog-tags">Tags (separados por coma)</label>
              <input
                id="blog-tags"
                className={inputClass}
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>

            <div className={`${formGroup} col-span-full`}>
              <label className={formLabel} htmlFor="blog-content">Contenido</label>
              <textarea
                id="blog-content"
                className={`${inputClass} min-h-[120px] resize-y`}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            <div className={formGroup}>
              <label className="flex cursor-pointer items-center gap-2 text-[#333]">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                />
                Publicado
              </label>
            </div>
          </div>

          <div className="mt-8 flex gap-2">
            <button
              className={btnPrimarySm}
              onClick={() =>
                onSave({ title, slug, author, image, tags, content, published })
              }
            >
              Guardar
            </button>
            <button className={btnGhostSm} onClick={onCancel}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
