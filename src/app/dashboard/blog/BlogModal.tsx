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
    <div className="admin-modal" onClick={onCancel}>
      <div
        className="admin-modal__box"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="admin-form">
          <h3 className="admin-form__title">
            {post ? "Editar publicación" : "Crear publicación"}
          </h3>

          <div className="admin-form__grid">
            <div className="form-group">
              <label className="form-label" htmlFor="blog-title">Título</label>
              <input
                id="blog-title"
                className="form-input"
                type="text"
                value={title}
                onChange={(e) => handleTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="blog-slug">Slug</label>
              <input
                id="blog-slug"
                className="form-input"
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="blog-author">Autor</label>
              <input
                id="blog-author"
                className="form-input"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="blog-image">Imagen (URL)</label>
              <input
                id="blog-image"
                className="form-input"
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>

            <div className="form-group form-group--full">
              <label className="form-label" htmlFor="blog-tags">Tags (separados por coma)</label>
              <input
                id="blog-tags"
                className="form-input"
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>

            <div className="form-group form-group--full">
              <label className="form-label" htmlFor="blog-content">Contenido</label>
              <textarea
                id="blog-content"
                className="form-input"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  cursor: "pointer",
                  color: "var(--c-text)",
                }}
              >
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                />
                Publicado
              </label>
            </div>
          </div>

          <div className="admin-form__actions">
            <button
              className="btn btn--primary btn--sm"
              onClick={() =>
                onSave({ title, slug, author, image, tags, content, published })
              }
            >
              Guardar
            </button>
            <button className="btn btn--ghost btn--sm" onClick={onCancel}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
