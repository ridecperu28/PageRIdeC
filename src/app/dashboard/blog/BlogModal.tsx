"use client";

import { useState } from "react";
import {
  adminForm,
  adminFormActions,
  adminFormGrid,
  adminFormTitle,
  btnGhost,
  btnPrimarySm,
  formGroup,
  formLabel,
  inputClass,
  modalBox,
  modalOverlay,
} from "@/components/admin/ui";

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
      className={modalOverlay}
      onClick={onCancel}
    >
      <div
        className={modalBox}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={adminForm}>
          <h3 className={adminFormTitle}>
            {post ? "Editar publicación" : "Crear publicación"}
          </h3>

          <div className={adminFormGrid}>
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
                className={`${inputClass} min-h-[120px]`}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            <div className={formGroup}>
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                />
                Publicado
              </label>
            </div>
          </div>

          <div className={adminFormActions}>
            <button
              className={btnPrimarySm}
              onClick={() =>
                onSave({ title, slug, author, image, tags, content, published })
              }
            >
              Guardar
            </button>
            <button className={btnGhost} onClick={onCancel}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
