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
  const [measValues, setMeasValues] = useState({
    "Neck": "16.5",
    "Bust / Chest": "40",
    "Shoulder": "18",
    "Sleeve Length": "25",
    "Waist": "32",
    "Hips": "38",
    "Full Length": "55",
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
          setMeasurements(mData);
          setOrders(oData.filter((o) => o.client._id === id || (o.client as any) === id));
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
      setMeasurements(updated);
      setIsMeasurementModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="py-12 text-center text-slate-400 text-xs font-semibold">
        Loading client details...
      </div>
    );
  }

  if (!client) {
    return (
      <div className="py-12 text-center text-slate-400 text-xs font-semibold">
        Client not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Clients
      </button>

      {/* Client Profile Header Card */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-lg font-extrabold text-white shadow-xs">
              {client.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                {client.name}
              </h1>
              <div className="mt-1 flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5 text-slate-400" /> {client.phone}
                </span>
                {client.email && (
                  <span className="flex items-center gap-1">
                    <Mail className="h-3.5 w-3.5 text-slate-400" /> {client.email}
                  </span>
                )}
                {client.address && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" /> {client.address}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/${client.phone.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-2 text-xs font-bold text-emerald-700 hover:bg-emerald-100 transition-colors shadow-2xs"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp Chat
            </a>
            <button
              onClick={() => setIsMeasurementModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#005B82] px-4 py-2 text-xs font-semibold text-white hover:bg-[#004A6B] transition-all shadow-2xs"
            >
              <Plus className="h-3.5 w-3.5 text-white" /> Log Measurements
            </button>
          </div>
        </div>

        {client.notes && (
          <div className="mt-4 rounded-xl bg-slate-50 p-3 text-xs text-slate-600 border border-slate-100">
            <span className="font-bold text-slate-900">Tailoring Notes: </span>
            {client.notes}
          </div>
        )}
      </div>

      {/* Grid: Measurements Specs & Client Orders */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left Column: Measurements History */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Ruler className="h-4.5 w-4.5 text-slate-700" />
              <h3 className="text-sm font-bold text-slate-900">Client Measurements</h3>
            </div>
            <button
              onClick={() => setIsMeasurementModalOpen(true)}
              className="text-xs font-semibold text-slate-700 hover:underline"
            >
              + Add Log
            </button>
          </div>

          {measurements.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              No measurements recorded yet for this client.
            </div>
          ) : (
            measurements.map((m, idx) => (
              <div
                key={m._id || idx}
                className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 space-y-3"
              >
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span>
                    {m.template?.name || "Standard Custom Fitting"}
                  </span>
                  <span className="text-[10px] text-slate-400 font-normal">
                    Logged {m.createdAt?.split("T")[0] || "recently"}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  {Object.entries(m.values).map(([key, val]) => (
                    <div
                      key={key}
                      className="rounded-lg bg-white p-2 border border-slate-200/60"
                    >
                      <span className="block text-[10px] font-semibold text-slate-400">
                        {key}
                      </span>
                      <span className="block font-bold text-slate-900">
                        {val} in
                      </span>
                    </div>
                  ))}
                </div>

                {m.notes && (
                  <p className="text-[11px] text-slate-500 italic">
                    Note: {m.notes}
                  </p>
                )}
              </div>
            ))
          )}
        </div>

        {/* Right Column: Order History */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-4.5 w-4.5 text-slate-700" />
              <h3 className="text-sm font-bold text-slate-900">Order History</h3>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              {orders.length} orders
            </span>
          </div>

          {orders.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              No orders found for this client.
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((ord) => (
                <div
                  key={ord._id}
                  className="flex items-center justify-between rounded-xl border border-slate-100 p-3.5 hover:bg-slate-50/60 transition-colors text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">
                        {ord.orderNumber}
                      </span>
                      <OrderStatusBadge status={ord.status} />
                    </div>
                    <p className="text-slate-500 mt-1 font-medium">
                      Due: {ord.dueDate} • ₦{ord.amount.toLocaleString()}
                    </p>
                  </div>
                  <Link
                    href={`/orders/${ord._id}`}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
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
        <form onSubmit={handleSaveMeasurement} className="space-y-3 pt-2">
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(measValues).map(([key, val]) => (
              <div key={key}>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  {key} (in)
                </label>
                <input
                  type="text"
                  value={val}
                  onChange={(e) =>
                    setMeasValues({ ...measValues, [key]: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-medium focus:border-slate-400 focus:outline-none"
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Fitting Notes
            </label>
            <input
              type="text"
              placeholder="e.g. Corset bone preference..."
              value={measNotes}
              onChange={(e) => setMeasNotes(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-medium focus:border-slate-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-3 mt-4">
            <button
              type="button"
              onClick={() => setIsMeasurementModalOpen(false)}
              className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-[#005B82] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#004A6B] transition-colors shadow-2xs"
            >
              Save Measurements
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
