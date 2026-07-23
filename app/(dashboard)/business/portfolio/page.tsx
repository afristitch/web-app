"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Image as ImageIcon, Plus, Tag } from "lucide-react";
import Image from "next/image";
import { Modal } from "@/components/ui/Modal";
import { organizationService } from "@/lib/services";

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  notes: string;
}

export default function PortfolioPage() {
  const router = useRouter();
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [isPremium, setIsPremium] = useState(false);
  const [loadingSub, setLoadingSub] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Menswear");
  const [imageUrl, setImageUrl] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    organizationService.getSubscription().then((sub) => {
      if (sub && (sub.isPremium || sub.status === "ACTIVE")) {
        setIsPremium(true);
      } else {
        setIsPremium(false);
        router.replace("/subscription");
      }
      setLoadingSub(false);
    });
  }, [router]);

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

  if (loadingSub || !isPremium) {
    return (
      <div className="flex h-64 items-center justify-center text-stone-400 font-medium text-xs">
        Checking PRO subscription permissions...
      </div>
    );
  }

  return (
    <div className="space-y-6 text-white" style={{ fontFamily: 'var(--font-varela-round)' }}>
      {/* Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-5">
        <div>
          <h1 
            className="text-2xl md:text-3xl font-extrabold tracking-tight text-white uppercase"
            style={{ fontFamily: 'var(--font-varela-round)' }}
          >
            Outfit Portfolio Gallery
          </h1>
          <p className="text-xs text-stone-400 mt-1 font-medium">
            Showcase completed custom tailoring designs to prospective clients.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-extrabold text-black shadow-xs hover:bg-stone-200 transition-all cursor-pointer"
          style={{ fontFamily: 'var(--font-varela-round)' }}
        >
          <Plus className="h-3.5 w-3.5 text-black" />
          Add Portfolio Design
        </button>
      </div>

      {/* Grid of Designs */}
      {items.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-stone-950 p-12 text-center text-stone-400 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-stone-400">
            <ImageIcon className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white uppercase" style={{ fontFamily: 'var(--font-varela-round)' }}>
            No Portfolio Designs Yet
          </h3>
          <p className="text-xs text-stone-400 font-medium max-w-sm mx-auto">
            Upload images of your finished tailor creations to show prospective clients. Click "Add Portfolio Design" to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-stone-950 shadow-xl transition-all hover:border-white/20"
            >
              <div className="relative h-64 w-full overflow-hidden bg-stone-900">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 right-3 rounded-full bg-black/80 border border-white/10 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-md">
                  {item.category}
                </span>
              </div>

              <div className="p-6 space-y-2">
                <h3 className="text-lg font-bold text-white uppercase tracking-tight" style={{ fontFamily: 'var(--font-varela-round)' }}>{item.title}</h3>
                <p className="text-xs text-stone-400 font-medium leading-relaxed">{item.notes}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Portfolio Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Portfolio Design"
        subtitle="Upload a finished outfit photo to your gallery."
      >
        <form onSubmit={handleAddPortfolio} className="space-y-4 pt-2 text-white" style={{ fontFamily: 'var(--font-varela-round)' }}>
          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1.5">
              Design Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Bespoke Tailored Suit in Emerald Green"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-stone-900 px-3.5 py-2.5 text-xs font-medium text-white placeholder-stone-500 focus:border-white/30 focus:outline-none"
              style={{ fontFamily: 'var(--font-varela-round)' }}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1.5">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-stone-900 px-3.5 py-2.5 text-xs font-medium text-white focus:border-white/30 focus:outline-none"
              style={{ fontFamily: 'var(--font-varela-round)' }}
            >
              <option value="Menswear" className="bg-stone-900 text-white">Menswear</option>
              <option value="Womenswear" className="bg-stone-900 text-white">Womenswear</option>
              <option value="Suits" className="bg-stone-900 text-white">Suits & Tuxedos</option>
              <option value="Custom Fit" className="bg-stone-900 text-white">Custom Event Apparel</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1.5">
              Image URL *
            </label>
            <input
              type="url"
              required
              placeholder="https://images.unsplash.com/photo-..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-stone-900 px-3.5 py-2.5 text-xs font-medium text-white placeholder-stone-500 focus:border-white/30 focus:outline-none"
              style={{ fontFamily: 'var(--font-varela-round)' }}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1.5">
              Design Details & Notes
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Premium wool fabric with handcrafted embroidery."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-stone-900 px-3.5 py-2.5 text-xs font-medium text-white placeholder-stone-500 focus:border-white/30 focus:outline-none resize-none"
              style={{ fontFamily: 'var(--font-varela-round)' }}
            />
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-4 mt-6">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="rounded-full border border-white/10 px-5 py-2.5 text-xs font-bold text-stone-400 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
              style={{ fontFamily: 'var(--font-varela-round)' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-white px-6 py-2.5 text-xs font-extrabold text-black hover:bg-stone-200 transition-all cursor-pointer shadow-xs"
              style={{ fontFamily: 'var(--font-varela-round)' }}
            >
              Save Design
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
