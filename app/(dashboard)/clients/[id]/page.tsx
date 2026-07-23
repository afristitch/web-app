"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Ruler,
  ShoppingBag,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { Client, Measurement, Order } from "@/lib/types";
import { clientService, measurementService, orderService } from "@/lib/services";
import { OrderStatusBadge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";

export default function ClientDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [client, setClient] = useState<Client | null>(null);
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // New Measurement Modal state
  const [isMeasurementModalOpen, setIsMeasurementModalOpen] = useState(false);
  const [measValues, setMeasValues] = useState<Record<string, string>>({
    "Neck": "",
    "Bust / Chest": "",
    "Shoulder": "",
    "Sleeve Length": "",
    "Waist": "",
    "Hips": "",
    "Full Length": "",
  });
  const [measNotes, setMeasNotes] = useState("");

  useEffect(() => {
    if (id) {
      Promise.all([
        clientService.getById(id),
        measurementService.getByClient(id),
        orderService.getAll(),
      ])
        .then(([cData, mData, oData]) => {
          setClient(cData);
          setMeasurements(Array.isArray(mData) ? mData : []);
          const allOrders = Array.isArray(oData) ? oData : [];
          setOrders(allOrders.filter((o) => o.client?._id === id || (o.client as any) === id));
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSaveMeasurement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    try {
      await measurementService.create({
        clientId: id,
        values: measValues,
        notes: measNotes,
      });
      const updated = await measurementService.getByClient(id);
      setMeasurements(Array.isArray(updated) ? updated : []);
      setIsMeasurementModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="py-16 text-center text-stone-400 text-xs font-medium" style={{ fontFamily: 'var(--font-varela-round)' }}>
        Loading client details...
      </div>
    );
  }

  if (!client) {
    return (
      <div className="py-16 text-center text-stone-400 text-xs font-medium" style={{ fontFamily: 'var(--font-varela-round)' }}>
        Client not found.
      </div>
    );
  }

  return (
    <div className="space-y-6 text-white" style={{ fontFamily: 'var(--font-varela-round)' }}>
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-xs font-bold text-stone-400 hover:text-white transition-colors cursor-pointer"
        style={{ fontFamily: 'var(--font-varela-round)' }}
      >
        <ArrowLeft className="h-4 w-4" /> Back to Clients
      </button>

      {/* Client Profile Header Card */}
      <div className="rounded-3xl border border-white/10 bg-stone-950 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-lg font-extrabold text-black uppercase shadow-xs">
              {client.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase" style={{ fontFamily: 'var(--font-varela-round)' }}>
                {client.name}
              </h1>
              <div className="mt-1.5 flex flex-wrap items-center gap-4 text-xs text-stone-400 font-medium">
                <span className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-stone-400" /> {client.phone}
                </span>
                {client.email && (
                  <span className="flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-stone-400" /> {client.email}
                  </span>
                )}
                {client.address && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-stone-400" /> {client.address}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${client.phone.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-4 py-2.5 text-xs font-bold text-emerald-400 hover:bg-emerald-500 hover:text-black transition-colors shadow-xs"
              style={{ fontFamily: 'var(--font-varela-round)' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://img.icons8.com/?size=100&id=Cq0bCO6BqKJw&format=png&color=000000" alt="WhatsApp" className="h-4 w-4 invert opacity-80" /> WhatsApp Chat
            </a>
            <button
              onClick={() => setIsMeasurementModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-extrabold text-black shadow-xs hover:bg-stone-200 transition-all cursor-pointer"
              style={{ fontFamily: 'var(--font-varela-round)' }}
            >
              <Plus className="h-3.5 w-3.5 text-black" /> Log Measurements
            </button>
          </div>
        </div>

        {client.notes && (
          <div className="mt-5 rounded-2xl bg-stone-900 p-4 text-xs text-stone-300 border border-white/10">
            <span className="font-bold text-white uppercase">Tailoring Notes: </span>
            {client.notes}
          </div>
        )}
      </div>

      {/* Grid: Measurements Specs & Client Orders */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left Column: Measurements History */}
        <div className="rounded-3xl border border-white/10 bg-stone-950 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Ruler className="h-4.5 w-4.5 text-white" />
              <h3 className="text-sm font-bold text-white uppercase tracking-tight" style={{ fontFamily: 'var(--font-varela-round)' }}>Client Measurements</h3>
            </div>
            <button
              onClick={() => setIsMeasurementModalOpen(true)}
              className="text-xs font-bold text-white hover:underline cursor-pointer"
            >
              + Add Log
            </button>
          </div>

          {measurements.length === 0 ? (
            <div className="py-10 text-center text-xs text-stone-400 font-medium">
              No measurements recorded yet for this client.
            </div>
          ) : (
            measurements.map((m, idx) => (
              <div
                key={m._id || idx}
                className="rounded-2xl border border-white/10 bg-stone-900 p-4 space-y-3"
              >
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <span>
                    {m.template?.name || "Standard Custom Fitting"}
                  </span>
                  <span className="text-[10px] text-stone-400 font-normal">
                    Logged {m.createdAt?.split("T")[0] || "recently"}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  {Object.entries(m.values).map(([key, val]) => (
                    <div
                      key={key}
                      className="rounded-xl bg-stone-950 p-2.5 border border-white/10"
                    >
                      <span className="block text-[10px] font-semibold text-stone-400">
                        {key}
                      </span>
                      <span className="block font-bold text-white mt-0.5">
                        {val || "-"} in
                      </span>
                    </div>
                  ))}
                </div>

                {m.notes && (
                  <p className="text-[11px] text-stone-400 italic">
                    Note: {m.notes}
                  </p>
                )}
              </div>
            ))
          )}
        </div>

        {/* Right Column: Order History */}
        <div className="rounded-3xl border border-white/10 bg-stone-950 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-4.5 w-4.5 text-white" />
              <h3 className="text-sm font-bold text-white uppercase tracking-tight" style={{ fontFamily: 'var(--font-varela-round)' }}>Order History</h3>
            </div>
            <span className="text-xs font-bold text-stone-400">
              {orders.length} orders
            </span>
          </div>

          {orders.length === 0 ? (
            <div className="py-10 text-center text-xs text-stone-400 font-medium">
              No orders found for this client.
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((ord) => (
                <div
                  key={ord._id}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-stone-900 p-4 hover:bg-white/5 transition-colors text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">
                        {ord.orderNumber}
                      </span>
                      <OrderStatusBadge status={ord.status} />
                    </div>
                    <p className="text-stone-400 mt-1 font-medium">
                      Due: {ord.dueDate || "N/A"} • ₵{(ord.amount || 0).toLocaleString()}
                    </p>
                  </div>
                  <Link
                    href={`/orders/${ord._id}`}
                    className="rounded-xl border border-white/20 bg-stone-950 px-3 py-1.5 text-xs font-bold text-white hover:bg-white hover:text-black transition-colors"
                  >
                    Details
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Log Measurement Modal */}
      <Modal
        isOpen={isMeasurementModalOpen}
        onClose={() => setIsMeasurementModalOpen(false)}
        title={`Log Measurements for ${client.name}`}
        subtitle="Enter body dimensions in inches."
      >
        <form onSubmit={handleSaveMeasurement} className="space-y-4 pt-2 text-white" style={{ fontFamily: 'var(--font-varela-round)' }}>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(measValues).map(([key, val]) => (
              <div key={key}>
                <label className="block text-[11px] font-bold text-stone-300 mb-1">
                  {key} (in)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 16.5"
                  value={val}
                  onChange={(e) =>
                    setMeasValues({ ...measValues, [key]: e.target.value })
                  }
                  className="w-full rounded-xl border border-white/10 bg-stone-900 px-3 py-2 text-xs font-medium text-white placeholder-stone-500 focus:border-white/30 focus:outline-none"
                  style={{ fontFamily: 'var(--font-varela-round)' }}
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-[11px] font-bold text-stone-300 mb-1">
              Fitting Notes
            </label>
            <input
              type="text"
              placeholder="e.g. High waist cut preference..."
              value={measNotes}
              onChange={(e) => setMeasNotes(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-stone-900 px-3 py-2 text-xs font-medium text-white placeholder-stone-500 focus:border-white/30 focus:outline-none"
              style={{ fontFamily: 'var(--font-varela-round)' }}
            />
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-4 mt-4">
            <button
              type="button"
              onClick={() => setIsMeasurementModalOpen(false)}
              className="rounded-full border border-white/10 px-5 py-2 text-xs font-bold text-stone-400 hover:bg-white/10 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-white px-6 py-2 text-xs font-extrabold text-black hover:bg-stone-200 shadow-xs"
            >
              Save Measurements
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
