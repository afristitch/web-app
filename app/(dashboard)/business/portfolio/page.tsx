"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Image as ImageIcon, Plus, Loader2, X } from "lucide-react";
import Image from "next/image";
import { Modal } from "@/components/ui/Modal";
import { organizationService, uploadService } from "@/lib/services";

export default function PortfolioPage() {
  const router = useRouter();
  const [items, setItems] = useState<any[]>([]);
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Menswear");
  const [notes, setNotes] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const sub = await organizationService.getSubscription();
        if (sub && (sub.isPremium || sub.status === "ACTIVE")) {
          setIsPremium(true);
          const profile = await organizationService.getProfile();
          if (profile && profile.portfolio) {
            // Sort by newest first just in case
            setItems(profile.portfolio.sort((a: any, b: any) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()));
          }
        } else {
          setIsPremium(false);
          router.replace("/subscription");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles(files);
      setPreviews(files.map(f => URL.createObjectURL(f)));
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
    
    const newPreviews = [...previews];
    URL.revokeObjectURL(newPreviews[index]);
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
  };

  const handleAddPortfolio = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || selectedFiles.length === 0) {
      alert("Title and at least one image are required.");
      return;
    }
    
    setIsUploading(true);
    try {
      const newItems = [];
      for (const file of selectedFiles) {
        const uploadRes = await uploadService.uploadImage(file, 'portfolio');
        newItems.push({
          title,
          tags: [category],
          imageUrl: (uploadRes as any).secure_url || uploadRes.url || (uploadRes as any).imageUrl,
          description: notes,
          createdAt: new Date(),
        });
      }

      const updatedPortfolio = [...newItems, ...items];
      await organizationService.updateProfile({ portfolio: updatedPortfolio });
      
      setItems(updatedPortfolio);
      setIsModalOpen(false);
      setTitle("");
      setSelectedFiles([]);
      setPreviews([]);
      setNotes("");
    } catch (err) {
      console.error(err);
      alert("Failed to upload portfolio. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleOpenModal = () => {
    setTitle("");
    setNotes("");
    setSelectedFiles([]);
    setPreviews([]);
    setIsModalOpen(true);
  };

  if (loading || !isPremium) {
    return (
      <div className="flex h-64 items-center justify-center text-stone-400 font-medium text-xs">
        Checking permissions and loading portfolio...
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
          onClick={handleOpenModal}
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
          {items.map((item, idx) => (
            <div
              key={item._id || idx}
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
                  {item.tags?.[0] || 'Design'}
                </span>
              </div>

              <div className="p-6 space-y-2">
                <h3 className="text-lg font-bold text-white uppercase tracking-tight" style={{ fontFamily: 'var(--font-varela-round)' }}>{item.title}</h3>
                {item.description && <p className="text-xs text-stone-400 font-medium leading-relaxed">{item.description}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Portfolio Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => !isUploading && setIsModalOpen(false)}
        title="Add Portfolio Designs"
        subtitle="Upload multiple finished outfit photos to your gallery."
      >
        <form onSubmit={handleAddPortfolio} className="space-y-4 pt-2 text-white" style={{ fontFamily: 'var(--font-varela-round)' }}>
          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1.5">
              Select Images *
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              disabled={isUploading}
              className="w-full rounded-xl border border-white/10 bg-stone-900 px-3.5 py-2.5 text-xs font-medium text-white focus:border-white/30 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-white file:text-black hover:file:bg-stone-200 cursor-pointer"
            />
            {previews.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-4">
                {previews.map((preview, idx) => (
                  <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden border border-white/10">
                    <Image src={preview} alt="preview" fill className="object-cover" />
                    {!isUploading && (
                      <button
                        type="button"
                        onClick={() => removeFile(idx)}
                        className="absolute top-1 right-1 bg-black/60 rounded-full p-1 hover:bg-red-500/80 transition"
                      >
                        <X className="w-3 h-3 text-white" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1.5">
              Design Title *
            </label>
            <input
              type="text"
              required
              disabled={isUploading}
              placeholder="e.g. Bespoke Tailored Suits"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-stone-900 px-3.5 py-2.5 text-xs font-medium text-white placeholder-stone-500 focus:border-white/30 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1.5">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={isUploading}
              className="w-full rounded-xl border border-white/10 bg-stone-900 px-3.5 py-2.5 text-xs font-medium text-white focus:border-white/30 focus:outline-none"
            >
              <option value="Menswear">Menswear</option>
              <option value="Womenswear">Womenswear</option>
              <option value="Suits & Tuxedos">Suits & Tuxedos</option>
              <option value="Custom Event Apparel">Custom Event Apparel</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1.5">
              Design Details & Notes
            </label>
            <textarea
              rows={3}
              disabled={isUploading}
              placeholder="e.g. Premium wool fabric with handcrafted embroidery."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-stone-900 px-3.5 py-2.5 text-xs font-medium text-white placeholder-stone-500 focus:border-white/30 focus:outline-none resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-4 mt-6">
            <button
              type="button"
              disabled={isUploading}
              onClick={() => setIsModalOpen(false)}
              className="rounded-full border border-white/10 px-5 py-2.5 text-xs font-bold text-stone-400 hover:bg-white/10 hover:text-white transition-all cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading || selectedFiles.length === 0}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-xs font-extrabold text-black hover:bg-stone-200 transition-all cursor-pointer shadow-xs disabled:opacity-50"
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save & Upload"
              )}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
