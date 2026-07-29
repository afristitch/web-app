"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeft, Plus, Trash2, Loader2, Lock } from "lucide-react";
import Link from "next/link";
import { MeasurementField, MeasurementTemplate } from "@/lib/types";
import { templateService } from "@/lib/services";
import { Modal } from "@/components/ui/Modal";
import { useAuth } from "@/context/AuthContext";

const SUGGESTED_ICONS = [
  { name: "Full Body", url: "https://img.icons8.com/ios-filled/100/body.png" },
  { name: "Shirt", url: "https://img.icons8.com/ios-filled/100/shirt.png" },
  { name: "Pants", url: "https://img.icons8.com/ios-filled/100/trousers.png" },
  { name: "Dress", url: "https://img.icons8.com/ios-filled/100/modelled-dress.png" },
  { name: "Suit", url: "https://img.icons8.com/ios-filled/100/suit.png" },
  { name: "Wedding Dress", url: "https://img.icons8.com/ios-filled/100/wedding-dress.png" },
];

export default function TemplatesPage() {
  const { activeWorkspace: organization } = useAuth();
  const [templates, setTemplates] = useState<MeasurementTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<MeasurementTemplate | null>(null);
  const [isEditingOwned, setIsEditingOwned] = useState(true);
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [iconUrl, setIconUrl] = useState(SUGGESTED_ICONS[0].url);
  const [fields, setFields] = useState<MeasurementField[]>([
    { name: "", unit: "inch" },
  ]);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState("");

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const data = await templateService.getAll();
      setTemplates(data);
    } catch {
      setError("Failed to load templates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  // Populate modal fields when editingTemplate changes
  useEffect(() => {
    if (editingTemplate) {
      setName(editingTemplate.name);
      setDescription(editingTemplate.description || "");
      setIconUrl(editingTemplate.iconUrl || SUGGESTED_ICONS[0].url);
      setFields(editingTemplate.fields.length > 0 ? editingTemplate.fields : [{ name: "", unit: "inch" }]);
    } else {
      setName("");
      setDescription("");
      setIconUrl(SUGGESTED_ICONS[0].url);
      setFields([{ name: "", unit: "inch" }]);
    }
  }, [editingTemplate, isModalOpen]);

  const handleOpenCreate = () => {
    setEditingTemplate(null);
    setIsEditingOwned(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (tmpl: MeasurementTemplate, isOwned: boolean) => {
    setEditingTemplate(tmpl);
    setIsEditingOwned(isOwned);
    setIsModalOpen(true);
  };

  const handleAddField = () => {
    setFields([...fields, { name: "", unit: "inch" }]);
  };

  const handleRemoveField = (idx: number) => {
    if (fields.length <= 1) return;
    setFields(fields.filter((_, i) => i !== idx));
  };

  const handleSaveTemplate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    if (fields.some((f) => !f.name.trim())) {
      setError("All fields must have a name");
      return;
    }

    setSaving(true);
    setError("");
    try {
      const payload = {
        name: name.trim(),
        description: description.trim() || undefined,
        iconUrl,
        fields: fields.filter((f) => f.name.trim() !== ""),
      };

      if (editingTemplate) {
        await templateService.update(editingTemplate._id, payload);
      } else {
        await templateService.create(payload);
      }
      
      setIsModalOpen(false);
      setEditingTemplate(null);
      await fetchTemplates();
    } catch (err: any) {
      setError(err?.message || "Failed to create template");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteTemplate = async (id: string) => {
    if (!confirm("Are you sure you want to delete this template?")) return;
    setDeleting(id);
    try {
      await templateService.delete(id);
      setTemplates(templates.filter((t) => t._id !== id));
    } catch (err: any) {
      setError(err?.message || "Failed to delete template");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="space-y-6 text-white" style={{ fontFamily: 'var(--font-varela-round)' }}>
      {/* Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-5">
        <div>
          <Link
            href="/measurements"
            className="text-xs font-bold text-stone-400 hover:text-white flex items-center gap-1 mb-1 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Measurements
          </Link>
          <h1
            className="text-2xl md:text-3xl font-extrabold tracking-tight text-white uppercase"
            style={{ fontFamily: 'var(--font-varela-round)' }}
          >
            Custom Sizing Templates
          </h1>
          <p className="text-xs text-stone-400 mt-1 font-medium">
            Create and manage measurement templates for different garment types.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-extrabold text-black shadow-xs hover:bg-stone-200 transition-all cursor-pointer"
          style={{ fontFamily: 'var(--font-varela-round)' }}
        >
          <Plus className="h-3.5 w-3.5 text-black" />
          Create Template
        </button>
      </div>

      {error && (
        <div className="rounded-2xl bg-red-950/40 border border-red-500/20 px-4 py-3 text-xs text-red-300 font-medium flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError("")} className="text-red-400 hover:text-red-200 cursor-pointer">✕</button>
        </div>
      )}

      {loading ? (
        <div className="py-16 text-center text-xs text-stone-400 font-medium">
          Loading templates...
        </div>
      ) : templates.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-stone-950 p-12 text-center text-stone-400 space-y-3">
          <h3 className="text-base font-bold text-white uppercase" style={{ fontFamily: 'var(--font-varela-round)' }}>
            No Templates Yet
          </h3>
          <p className="text-xs text-stone-400 font-medium max-w-sm mx-auto">
            Create your first measurement template to define sizing fields for different garment types.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {templates.map((tmpl) => {
            const orgIdStr = typeof tmpl.organizationId === 'object' ? (tmpl.organizationId as any)._id : tmpl.organizationId;
            const isOwned = orgIdStr && (orgIdStr === organization?._id || orgIdStr === organization?.id);
            return (
            <div
              key={tmpl._id}
              onClick={() => handleOpenEdit(tmpl, isOwned ?? false)}
              className={`group flex aspect-square flex-col items-center justify-center rounded-3xl border border-white/10 bg-stone-950 p-4 shadow-sm transition-all relative hover:border-white/30 hover:bg-stone-900 cursor-pointer`}
              style={{ fontFamily: 'var(--font-varela-round)' }}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-stone-900 border border-white/5 mb-3 group-hover:scale-110 transition-transform">
                {tmpl.iconUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={tmpl.iconUrl}
                    alt={tmpl.name}
                    className="h-8 w-8 invert opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full border-2 border-stone-400 opacity-50" />
                )}
              </div>
              <h3 className="text-[13px] font-bold text-stone-200 text-center uppercase tracking-tight line-clamp-2 px-2 flex items-center justify-center gap-1.5">
                {!isOwned && <Lock className="h-3 w-3 text-stone-500 shrink-0" />}
                {tmpl.name}
              </h3>
              
              {isOwned && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteTemplate(tmpl._id);
                  }}
                  disabled={deleting === tmpl._id}
                  className="absolute top-2 right-2 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity rounded-full bg-stone-900 border border-white/10 hover:bg-red-950 hover:border-red-500/50 hover:text-red-400 text-stone-400 cursor-pointer disabled:opacity-50"
                >
                  {deleting === tmpl._id ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <Trash2 className="h-3 w-3" />
                  )}
                </button>
              )}
            </div>
            );
          })}
        </div>
      )}

      {/* Create/Edit Template Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTemplate ? "Edit Template" : "Create Sizing Template"}
        subtitle="Define custom measurement fields for a garment type."
      >
        <form onSubmit={handleSaveTemplate} className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1">
              Template Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Male Full Body"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!isEditingOwned}
              className="w-full rounded-xl border border-white/20 bg-stone-900 px-3 py-2 text-xs font-medium text-white placeholder:text-stone-500 focus:border-white/40 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1">
              Description
            </label>
            <input
              type="text"
              placeholder="e.g. Standard 8-point measurement schema"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={!isEditingOwned}
              className="w-full rounded-xl border border-white/20 bg-stone-900 px-3 py-2 text-xs font-medium text-white placeholder:text-stone-500 focus:border-white/40 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Icon Picker */}
          <div>
            <label className="block text-xs font-bold text-stone-300 mb-2">
              Select Icon
            </label>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_ICONS.map((icon) => (
                <button
                  type="button"
                  key={icon.url}
                  onClick={() => isEditingOwned && setIconUrl(icon.url)}
                  disabled={!isEditingOwned}
                  className={`flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all ${
                    isEditingOwned ? "cursor-pointer" : "cursor-not-allowed opacity-70"
                  } ${
                    iconUrl === icon.url
                      ? "border-white bg-white/10"
                      : "border-white/10 bg-stone-900 hover:border-white/30"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={icon.url} alt={icon.name} className="h-5 w-5 invert" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-stone-300">
                Measurement Fields
              </label>
              {isEditingOwned && (
                <button
                  type="button"
                  onClick={handleAddField}
                  className="text-xs font-bold text-white hover:underline cursor-pointer"
                >
                  + Add Field
                </button>
              )}
            </div>
            {fields.map((field, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder={`Field ${idx + 1} name (e.g. Chest)`}
                  value={field.name}
                  onChange={(e) => {
                    const next = [...fields];
                    next[idx].name = e.target.value;
                    setFields(next);
                  }}
                  disabled={!isEditingOwned}
                  className="flex-1 rounded-xl border border-white/20 bg-stone-900 px-3 py-1.5 text-xs font-medium text-white placeholder:text-stone-500 focus:border-white/40 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {isEditingOwned && (
                  <button
                    type="button"
                    onClick={() => handleRemoveField(idx)}
                    className="p-1.5 text-stone-400 hover:text-red-400 hover:bg-red-950/40 rounded-lg cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-white/10 pt-4 mt-6">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="rounded-full border border-white/20 px-4 py-2 text-xs font-bold text-stone-300 hover:bg-stone-800 cursor-pointer"
            >
              {isEditingOwned ? "Cancel" : "Close"}
            </button>
            {isEditingOwned && (
              <button
                type="submit"
                disabled={saving}
                className="rounded-full bg-white px-5 py-2 text-xs font-extrabold text-black hover:bg-stone-200 shadow-xs disabled:opacity-50 cursor-pointer"
              >
                {saving ? "Saving..." : "Save Template"}
              </button>
            )}
          </div>
        </form>
      </Modal>
    </div>
  );
}
