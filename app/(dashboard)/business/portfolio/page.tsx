"use client";

import React, { useState } from "react";
import { Image as ImageIcon, Plus, Tag } from "lucide-react";
import Image from "next/image";
import { Modal } from "@/components/ui/Modal";

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  notes: string;
}

export default function PortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([
    {
      id: "p1",
      title: "Royal Blue Corset Aso-Ebi Gown",
      category: "Womenswear",
      imageUrl: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=600",
      notes: "Hand-stitched lace overlay with velvet waist trim.",
    },
    {
      id: "p2",
      title: "White 7-Star Senator Set",
      category: "Menswear",
      imageUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=600",
      notes: "Gold embroidery details on neck collar and cuffs.",
    },
    {
      id: "p3",
      title: "Navy Blue 3-Piece Tuxedo",
      category: "Suits",
      imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600",
      notes: "Satin lapel finish with custom buttonholes.",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Menswear");
  const [imageUrl, setImageUrl] = useState("");
  const [notes, setNotes] = useState("");

  const handleAddPortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !imageUrl) return;
    setItems([
      {
        id: `p-${Date.now()}`,
        title,
        category,
        imageUrl,
        notes,
      },
      ...items,
    ]);
    setIsModalOpen(false);
    setTitle("");
    setImageUrl("");
    setNotes("");
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-5">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Outfit Portfolio Gallery
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Showcase completed custom tailoring designs to prospective clients.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-[#005B82] px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-[#004A6B] transition-all"
        >
          <Plus className="h-3.5 w-3.5 text-white" />
          Add Portfolio Design
        </button>
      </div>

      {/* Grid of Designs */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all hover:border-slate-300 hover:shadow-md"
          >
            <div className="relative h-64 w-full overflow-hidden bg-slate-100">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-3 right-3 rounded-lg bg-slate-900/80 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-xs">
                {item.category}
              </span>
            </div>

            <div className="p-5 space-y-2">
              <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
              <p className="text-xs text-slate-500 font-medium">{item.notes}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add Portfolio Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Portfolio Design"
        subtitle="Upload a finished outfit photo to your gallery."
      >
        <form onSubmit={handleAddPortfolio} className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Design Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Agbada Senator Set in Emerald Green"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium focus:border-slate-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium focus:border-slate-400 focus:outline-none"
            >
              <option value="Menswear">Menswear</option>
              <option value="Womenswear">Womenswear</option>
              <option value="Suits">Suits & Tuxedos</option>
              <option value="Asoebi">Asoebi & Wedding</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Image URL *
            </label>
            <input
              type="url"
              required
              placeholder="https://images.unsplash.com/photo-..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium focus:border-slate-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Design Details & Notes
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Premium wool fabric with handcrafted embroidery."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium focus:border-slate-400 focus:outline-none resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-4 mt-6">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-[#005B82] px-5 py-2 text-xs font-semibold text-white hover:bg-[#004A6B] transition-colors shadow-2xs"
            >
              Save Design
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
