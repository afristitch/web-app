"use client";

import React, { useEffect, useState } from "react";
import { Ruler, Plus, Sparkles } from "lucide-react";
import Link from "next/link";
import { MeasurementTemplate } from "@/lib/types";
import { measurementService } from "@/lib/services";

export default function MeasurementsPage() {
  const [templates, setTemplates] = useState<MeasurementTemplate[]>([]);

  useEffect(() => {
    measurementService.getTemplates().then((tData) => {
      setTemplates(tData);
    });
  }, []);

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-5">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Measurements & Garment Schemas
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage body sizing profiles and custom measurement templates for all outfit types.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/measurements/templates"
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-all"
          >
            <Sparkles className="h-3.5 w-3.5 text-slate-900" />
            Manage Sizing Templates
          </Link>
          <Link
            href="/clients"
            className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-slate-800 transition-all"
          >
            <Plus className="h-3.5 w-3.5 text-white" />
            Log Client Measurement
          </Link>
        </div>
      </div>

      {/* Templates Showcase Grid */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-900">
          Standard Sizing Templates
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {templates.map((tmpl) => (
            <div
              key={tmpl._id}
              className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-900">
                    <Ruler className="h-4.5 w-4.5 text-slate-900" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{tmpl.name}</h4>
                    <p className="text-[11px] text-slate-500">{tmpl.description}</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                  {tmpl.fields.length} fields
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {tmpl.fields.map((f) => (
                  <span
                    key={f.name}
                    className="inline-flex items-center rounded-md bg-slate-50 px-2 py-1 text-[10px] font-semibold text-slate-700 border border-slate-200/60"
                  >
                    {f.name} ({f.unit})
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
