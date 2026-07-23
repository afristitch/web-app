"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { MeasurementField, MeasurementTemplate } from "@/lib/types";
import { measurementService } from "@/lib/services";
import { Modal } from "@/components/ui/Modal";

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<MeasurementTemplate[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [fields, setFields] = useState<MeasurementField[]>([
    { name: "Chest", unit: "inches" },
    { name: "Waist", unit: "inches" },
  ]);

  useEffect(() => {
    measurementService.getTemplates().then((tData) => setTemplates(tData));
  }, []);

  const handleAddField = () => {
    setFields([...fields, { name: "", unit: "inches" }]);
  };

  const handleRemoveField = (idx: number) => {
    setFields(fields.filter((_, i) => i !== idx));
  };

  const handleSaveTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    const newTmpl: MeasurementTemplate = {
      _id: `tmpl-${Date.now()}`,
      name,
      description,
      fields: fields.filter((f) => f.name.trim() !== ""),
    };
    setTemplates([...templates, newTmpl]);
    setIsModalOpen(false);
    setName("");
    setDescription("");
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-5">
        <div>
          <Link
            href="/measurements"
            className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1 mb-1"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Measurements
          </Link>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Custom Sizing Templates
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Configure custom body measurement fields for Senator sets, Corset gowns, Kaftans, and Suits.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-slate-800 transition-all"
        >
          <Plus className="h-3.5 w-3.5 text-white" />
          Create Template
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {templates.map((tmpl) => (
          <div
            key={tmpl._id}
            className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">{tmpl.name}</h3>
              <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                {tmpl.fields.length} Measurement Fields
              </span>
            </div>
            <p className="text-xs text-slate-500">{tmpl.description}</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {tmpl.fields.map((f) => (
                <div
                  key={f.name}
                  className="rounded-xl border border-slate-100 bg-slate-50/50 p-2.5 font-semibold text-slate-800"
                >
                  {f.name} ({f.unit})
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Sizing Template"
        subtitle="Define custom fields for outfit sizing."
      >
        <form onSubmit={handleSaveTemplate} className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Template Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Traditional Agbada & Fila Set"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium focus:border-slate-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Description
            </label>
            <input
              type="text"
              placeholder="e.g. Standard 8-point measurement schema"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium focus:border-slate-400 focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-slate-700">
                Measurement Fields
              </label>
              <button
                type="button"
                onClick={handleAddField}
                className="text-xs font-bold text-slate-900 hover:underline"
              >
                + Add Field
              </button>
            </div>
            {fields.map((field, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Field Name (e.g. Inseam)"
                  value={field.name}
                  onChange={(e) => {
                    const next = [...fields];
                    next[idx].name = e.target.value;
                    setFields(next);
                  }}
                  className="flex-1 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-medium focus:border-slate-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveField(idx)}
                  className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
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
              className="rounded-xl bg-slate-900 px-5 py-2 text-xs font-semibold text-white hover:bg-slate-800 shadow-xs"
            >
              Save Template
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
