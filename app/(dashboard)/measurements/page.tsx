"use client";

import React, { useEffect, useState } from "react";
import { Ruler, Plus, Sparkles } from "lucide-react";
import Link from "next/link";
import { MeasurementTemplate } from "@/lib/types";
import { measurementService } from "@/lib/services";

export default function MeasurementsPage() {

  return (
    <div className="space-y-6 text-white" style={{ fontFamily: 'var(--font-varela-round)' }}>
      {/* Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white uppercase" style={{ fontFamily: 'var(--font-varela-round)' }}>
            Measurements & Garment Schemas
          </h1>
          <p className="text-xs text-stone-400 mt-1 font-medium">
            Manage body sizing profiles and custom measurement templates for all outfit types.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/measurements/templates"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-stone-900 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-white hover:text-black transition-all"
            style={{ fontFamily: 'var(--font-varela-round)' }}
          >
            <Sparkles className="h-3.5 w-3.5 text-white" />
            Manage Sizing Templates
          </Link>
          <Link
            href="/clients"
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-xs font-extrabold text-black shadow-xs hover:bg-stone-200 transition-all"
            style={{ fontFamily: 'var(--font-varela-round)' }}
          >
            <Plus className="h-3.5 w-3.5 text-black" />
            Log Client Measurement
          </Link>
        </div>
      </div>

      {/* Measurements List Placeholder */}
      <div className="rounded-3xl border border-white/10 bg-stone-950 p-12 text-center text-stone-400 space-y-3">
        <h3 className="text-base font-bold text-white uppercase" style={{ fontFamily: 'var(--font-varela-round)' }}>
          No Measurements Yet
        </h3>
        <p className="text-xs text-stone-400 font-medium max-w-sm mx-auto">
          Log your first client measurement to see it appear here.
        </p>
      </div>
    </div>
  );
}
