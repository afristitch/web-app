"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Ruler,
  ShoppingBag,
  Plus,
  Pencil,
  Trash2,
  X,
  ChevronRight,
  Check,
  Camera,
} from "lucide-react";
import Link from "next/link";
import { Client, Measurement, Order } from "@/lib/types";
import { clientService, measurementService, orderService, uploadService } from "@/lib/services";
import { OrderStatusBadge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";

const DEFAULT_MEAS_VALUES: Record<string, string> = {
  "Neck": "",
  "Bust / Chest": "",
  "Shoulder": "",
  "Sleeve Length": "",
  "Waist": "",
  "Hips": "",
  "Full Length": "",
};

export default function ClientDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [client, setClient] = useState<Client | null>(null);
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // ── Profile edit state ────────────────────────────────────────────────────
  const [editingProfile, setEditingProfile] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [profileSaving, setProfileSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  // ── Add Measurement modal ─────────────────────────────────────────────────
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [templates, setTemplates] = useState<any[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<any | null>(null);
  const [measValues, setMeasValues] = useState<Record<string, string>>({});
  const [measNotes, setMeasNotes] = useState("");
  const [addSaving, setAddSaving] = useState(false);

  // ── Measurement detail / edit modal ──────────────────────────────────────
  const [selectedMeas, setSelectedMeas] = useState<Measurement | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editMeasValues, setEditMeasValues] = useState<Record<string, string>>({});
  const [editMeasNotes, setEditMeasNotes] = useState("");
  const [editSaving, setEditSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      Promise.all([
        clientService.getById(id),
        measurementService.getByClient(id),
        orderService.getAll(),
        measurementService.getTemplates(),
      ])
        .then(([cData, mData, oData, tData]) => {
          setClient(cData);
          if (cData) {
            setEditName(cData.name || "");
            setEditPhone(cData.phone || "");
            setEditEmail(cData.email || "");
            setEditAddress(cData.address || "");
            setEditNotes(cData.notes || "");
          }
          setMeasurements(Array.isArray(mData) ? mData : []);
          const allOrders = Array.isArray(oData) ? oData : [];
          setOrders(allOrders.filter((o) => o.client?._id === id || (o.client as any) === id));
          setTemplates(Array.isArray(tData) ? tData : []);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  // ── Upload client photo ───────────────────────────────────────────────────
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !id) return;
    setUploadingPhoto(true);
    try {
      const result = await uploadService.uploadImage(file, "profiles");
      const updated = await clientService.update(id, { photoUrl: result.url });
      setClient(updated);
    } catch (err: any) {
      console.error("Photo upload failed:", err);
      alert("Failed to upload photo: " + (err.message || "Unknown error"));
    } finally {
      setUploadingPhoto(false);
    }
  };

  // ── Save client profile ───────────────────────────────────────────────────
  const handleSaveProfile = async () => {
    if (!id) return;
    setProfileSaving(true);
    try {
      const updated = await clientService.update(id, {
        name: editName,
        phone: editPhone,
        email: editEmail,
        address: editAddress,
        notes: editNotes,
      });
      setClient(updated);
      setEditingProfile(false);
    } catch (err) {
      console.error(err);
    } finally {
      setProfileSaving(false);
    }
  };

  const handleCancelProfileEdit = () => {
    if (!client) return;
    setEditName(client.name || "");
    setEditPhone(client.phone || "");
    setEditEmail(client.email || "");
    setEditAddress(client.address || "");
    setEditNotes(client.notes || "");
    setEditingProfile(false);
  };

  // ── Add Measurement ───────────────────────────────────────────────────────
  const handleSaveMeasurement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !selectedTemplate) return;
    setAddSaving(true);
    try {
      await measurementService.create({ clientId: id, templateId: selectedTemplate._id, values: measValues, notes: measNotes });
      const updated = await measurementService.getByClient(id);
      setMeasurements(Array.isArray(updated) ? updated : []);
      setIsAddModalOpen(false);
      setSelectedTemplate(null);
      setMeasValues({});
      setMeasNotes("");
    } catch (err) {
      console.error(err);
    } finally {
      setAddSaving(false);
    }
  };

  // ── Open measurement detail ───────────────────────────────────────────────
  const openDetail = (m: Measurement) => {
    setSelectedMeas(m);
    setEditMeasValues({ ...m.values });
    setEditMeasNotes(m.notes || "");
    setIsEditMode(false);
    setIsDetailModalOpen(true);
  };

  // ── Save measurement edit ─────────────────────────────────────────────────
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMeas?._id) return;
    setEditSaving(true);
    try {
      await measurementService.update(String(selectedMeas._id), {
        values: editMeasValues,
        notes: editMeasNotes,
      });
      const updated = await measurementService.getByClient(id);
      setMeasurements(Array.isArray(updated) ? updated : []);
      setIsDetailModalOpen(false);
      setSelectedMeas(null);
    } catch (err) {
      console.error(err);
    } finally {
      setEditSaving(false);
    }
  };

  // ── Delete measurement ────────────────────────────────────────────────────
  const handleDelete = async (measId: string) => {
    setDeletingId(measId);
    try {
      await measurementService.delete(measId);
      setMeasurements((prev) => prev.filter((m) => String(m._id) !== measId));
      setIsDetailModalOpen(false);
      setSelectedMeas(null);
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingId(null);
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
      >
        <ArrowLeft className="h-4 w-4" /> Back to Clients
      </button>

      {/* Client Profile Header Card */}
      <div className="rounded-3xl border border-white/10 bg-stone-950 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

          {/* Avatar + Info */}
          <div className="flex items-start gap-4 flex-1 min-w-0">
            {/* Perfectly round avatar with camera upload */}
            <label className="relative cursor-pointer group flex-shrink-0">
              {client.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={client.photoUrl}
                  alt={client.name}
                  className="h-16 w-16 rounded-full object-cover border-2 border-white/20 shadow-md group-hover:opacity-75 transition-opacity"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-lg font-extrabold text-black uppercase shadow-md group-hover:opacity-75 transition-opacity">
                  {(editName || client.name).slice(0, 2).toUpperCase()}
                </div>
              )}
              {/* Camera overlay */}
              <div className="absolute -bottom-1 -right-1 p-1.5 bg-white rounded-full border border-black/10 text-black group-hover:scale-110 transition-transform shadow-sm">
                {uploadingPhoto ? (
                  <div className="h-3.5 w-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                ) : (
                  <Camera className="h-3.5 w-3.5" />
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
                disabled={uploadingPhoto}
              />
            </label>

            <div className="flex-1 min-w-0">
              {editingProfile ? (
                /* ── Edit form inline ── */
                <div className="space-y-2.5">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Full name"
                    className="w-full rounded-xl border border-white/20 bg-stone-900 px-3 py-2 text-sm font-bold text-white placeholder-stone-500 focus:border-white/40 focus:outline-none"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      placeholder="Phone number"
                      className="w-full rounded-xl border border-white/20 bg-stone-900 px-3 py-2 text-xs font-medium text-white placeholder-stone-500 focus:border-white/40 focus:outline-none"
                    />
                    <input
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      placeholder="Email address"
                      className="w-full rounded-xl border border-white/20 bg-stone-900 px-3 py-2 text-xs font-medium text-white placeholder-stone-500 focus:border-white/40 focus:outline-none"
                    />
                  </div>
                  <input
                    type="text"
                    value={editAddress}
                    onChange={(e) => setEditAddress(e.target.value)}
                    placeholder="Physical address"
                    className="w-full rounded-xl border border-white/20 bg-stone-900 px-3 py-2 text-xs font-medium text-white placeholder-stone-500 focus:border-white/40 focus:outline-none"
                  />
                  <input
                    type="text"
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    placeholder="Tailoring notes..."
                    className="w-full rounded-xl border border-white/20 bg-stone-900 px-3 py-2 text-xs font-medium text-white placeholder-stone-500 focus:border-white/40 focus:outline-none"
                  />

                  {/* Save / Cancel */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={handleCancelProfileEdit}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-1.5 text-xs font-bold text-stone-300 hover:bg-stone-800 hover:text-white transition-all cursor-pointer"
                    >
                      <X className="h-3.5 w-3.5" /> Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveProfile}
                      disabled={profileSaving}
                      className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-xs font-extrabold text-black hover:bg-stone-200 transition-all cursor-pointer disabled:opacity-50"
                    >
                      <Check className="h-3.5 w-3.5" />
                      {profileSaving ? "Saving..." : "Save"}
                    </button>
                  </div>
                </div>
              ) : (
                /* ── Read-only view ── */
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
                      {client.name}
                    </h1>
                    <button
                      type="button"
                      onClick={() => setEditingProfile(true)}
                      className="p-1 text-stone-400 hover:text-white transition-colors cursor-pointer"
                      title="Edit client profile"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="mt-1.5 flex flex-wrap items-center gap-4 text-xs text-stone-400 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5" /> {client.phone}
                    </span>
                    {client.email && (
                      <span className="flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5" /> {client.email}
                      </span>
                    )}
                    {client.address && (
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" /> {client.address}
                      </span>
                    )}
                  </div>
                  {client.notes && (
                    <div className="mt-3 rounded-2xl bg-stone-900 p-3 text-xs text-stone-300 border border-white/10">
                      <span className="font-bold text-white uppercase">Notes: </span>
                      {client.notes}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Action buttons */}
          {!editingProfile && (
            <div className="flex items-center gap-3 flex-shrink-0">
              <a
                href={`https://wa.me/${client.phone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-stone-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-white hover:text-black transition-colors shadow-xs"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://img.icons8.com/?size=100&id=Cq0bCO6BqKJw&format=png&color=000000"
                  alt="WhatsApp"
                  className="h-4 w-4 invert opacity-80"
                />
                WhatsApp
              </a>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-extrabold text-black shadow-xs hover:bg-stone-200 transition-all cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" /> Add Measurements
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Grid: Measurements & Orders */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left: Measurements as summary cards */}
        <div className="rounded-3xl border border-white/10 bg-stone-950 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Ruler className="h-4 w-4 text-white" />
              <h3 className="text-sm font-bold text-white uppercase tracking-tight">Client Measurements</h3>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="text-xs font-bold text-white hover:underline cursor-pointer"
            >
              + Add Measurement
            </button>
          </div>

          {measurements.length === 0 ? (
            <div className="py-10 text-center text-xs text-stone-400 font-medium">
              No measurements recorded yet for this client.
            </div>
          ) : (
            <div className="space-y-2">
              {measurements.map((m, idx) => {
                const valueEntries = Object.entries(m.values).filter(([, v]) => v && v !== "");
                const preview = valueEntries.slice(0, 3);
                return (
                  <button
                    key={String(m._id) || idx}
                    onClick={() => openDetail(m)}
                    className="w-full text-left rounded-2xl border border-white/10 bg-stone-900 px-4 py-3.5 hover:bg-white/5 hover:border-white/20 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <span className="block text-xs font-bold text-white truncate">
                          {m.template?.name || "Standard Custom Fitting"}
                        </span>
                        <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                          {preview.map(([key, val]) => (
                            <span key={key} className="text-[10px] text-stone-400 font-medium">
                              <span className="text-stone-500">{key}:</span> {val}&rdquo;
                            </span>
                          ))}
                          {valueEntries.length > 3 && (
                            <span className="text-[10px] text-stone-500">+{valueEntries.length - 3} more</span>
                          )}
                        </div>
                        {m.notes && (
                          <p className="text-[10px] text-stone-500 italic mt-1 truncate">{m.notes}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 ml-3 flex-shrink-0">
                        <span className="text-[10px] text-stone-500 hidden sm:block">
                          {m.createdAt?.split("T")[0] || ""}
                        </span>
                        <ChevronRight className="h-3.5 w-3.5 text-stone-500 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Order History */}
        <div className="rounded-3xl border border-white/10 bg-stone-950 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4 text-white" />
              <h3 className="text-sm font-bold text-white uppercase tracking-tight">Order History</h3>
            </div>
            <span className="text-xs font-bold text-stone-400">{orders.length} orders</span>
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
                      <span className="font-bold text-white">{ord.orderNumber}</span>
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

      {/* ── Add Measurement Modal ─────────────────────────────────────────── */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => { setIsAddModalOpen(false); setSelectedTemplate(null); }}
        title={selectedTemplate ? `Log Measurements — ${selectedTemplate.name}` : `Select Template — ${client.name}`}
        subtitle={selectedTemplate ? "Enter body dimensions in inches." : "Choose a measurement profile format."}
      >
        <div className="pt-2 text-white" style={{ fontFamily: 'var(--font-varela-round)' }}>
          {!selectedTemplate ? (
            <div className="space-y-4">
              {templates.length === 0 ? (
                <div className="py-6 text-center text-xs text-stone-400 font-medium border border-dashed border-white/20 rounded-xl">
                  No templates available. Please create templates in Settings.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {templates.map((t) => (
                    <button
                      key={t._id}
                      onClick={() => {
                        setSelectedTemplate(t);
                        const initialVals: Record<string, string> = {};
                        if (t.fields && Array.isArray(t.fields)) {
                          t.fields.forEach((f: any) => initialVals[f.name] = "");
                        }
                        setMeasValues(initialVals);
                      }}
                      className="flex flex-col items-center justify-center gap-3 rounded-xl border border-white/10 bg-stone-900 p-5 text-center hover:bg-white/5 transition-colors cursor-pointer group"
                    >
                      {t.iconUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={t.iconUrl} alt={t.name} className="h-10 w-10 object-contain flex-shrink-0 invert opacity-80 group-hover:opacity-100 transition-opacity" />
                      ) : (
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 border border-white/10 text-white">
                          <Ruler className="h-5 w-5" />
                        </div>
                      )}
                      <div className="w-full">
                        <span className="block text-xs font-bold text-white group-hover:text-white truncate">{t.name}</span>
                        <span className="block text-[10px] text-stone-400 mt-1 line-clamp-2">{t.description || `${t.fields?.length || 0} fields`}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-stone-500 group-hover:text-white flex-shrink-0" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSaveMeasurement} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(measValues).map(([key, val]) => (
                  <div key={key}>
                    <label className="block text-[11px] font-bold text-stone-300 mb-1">{key} (in)</label>
                    <input
                      type="text"
                      placeholder="e.g. 16.5"
                      value={val}
                      onChange={(e) => setMeasValues({ ...measValues, [key]: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-stone-900 px-3 py-2 text-xs font-medium text-white placeholder-stone-500 focus:border-white/30 focus:outline-none"
                    />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-[11px] font-bold text-stone-300 mb-1">Fitting Notes</label>
                <input
                  type="text"
                  placeholder="e.g. High waist cut preference..."
                  value={measNotes}
                  onChange={(e) => setMeasNotes(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-stone-900 px-3 py-2 text-xs font-medium text-white placeholder-stone-500 focus:border-white/30 focus:outline-none"
                />
              </div>
              <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-4">
                <button
                  type="button"
                  onClick={() => setSelectedTemplate(null)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-400 hover:text-white cursor-pointer"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Back to Templates
                </button>
                <button type="submit" disabled={addSaving} className="rounded-full bg-white px-6 py-2 text-xs font-extrabold text-black hover:bg-stone-200 shadow-xs disabled:opacity-50 cursor-pointer">
                  {addSaving ? "Saving..." : "Save Measurements"}
                </button>
              </div>
            </form>
          )}
        </div>
      </Modal>

      {/* ── Measurement Detail / Edit Modal ───────────────────────────────── */}
      {selectedMeas && (
        <Modal
          isOpen={isDetailModalOpen}
          onClose={() => { setIsDetailModalOpen(false); setSelectedMeas(null); setIsEditMode(false); }}
          title={selectedMeas.template?.name || "Standard Custom Fitting"}
          subtitle={`Logged ${selectedMeas.createdAt?.split("T")[0] || "recently"}`}
        >
          <div className="space-y-4 pt-2 text-white" style={{ fontFamily: 'var(--font-varela-round)' }}>
            {isEditMode ? (
              <form onSubmit={handleSaveEdit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(editMeasValues).map(([key, val]) => (
                    <div key={key}>
                      <label className="block text-[11px] font-bold text-stone-300 mb-1">{key} (in)</label>
                      <input
                        type="text"
                        value={val}
                        onChange={(e) => setEditMeasValues({ ...editMeasValues, [key]: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-stone-900 px-3 py-2 text-xs font-medium text-white placeholder-stone-500 focus:border-white/30 focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-stone-300 mb-1">Fitting Notes</label>
                  <input
                    type="text"
                    value={editMeasNotes}
                    onChange={(e) => setEditMeasNotes(e.target.value)}
                    placeholder="e.g. High waist cut preference..."
                    className="w-full rounded-xl border border-white/10 bg-stone-900 px-3 py-2 text-xs font-medium text-white placeholder-stone-500 focus:border-white/30 focus:outline-none"
                  />
                </div>
                <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditMode(false)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-400 hover:text-white cursor-pointer"
                  >
                    <X className="h-3.5 w-3.5" /> Cancel
                  </button>
                  <button type="submit" disabled={editSaving} className="rounded-full bg-white px-6 py-2 text-xs font-extrabold text-black hover:bg-stone-200 shadow-xs disabled:opacity-50 cursor-pointer">
                    {editSaving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {Object.entries(selectedMeas.values).map(([key, val]) => (
                    <div key={key} className="rounded-xl bg-stone-900 border border-white/10 p-3">
                      <span className="block text-[10px] font-semibold text-stone-400">{key}</span>
                      <span className="block text-sm font-bold text-white mt-0.5">
                        {val || "—"}<span className="text-xs font-normal text-stone-400"> in</span>
                      </span>
                    </div>
                  ))}
                </div>

                {selectedMeas.notes && (
                  <div className="rounded-xl bg-stone-900 border border-white/10 p-3 text-xs text-stone-300">
                    <span className="font-bold text-white uppercase text-[10px]">Notes: </span>
                    {selectedMeas.notes}
                  </div>
                )}

                <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-2">
                  <button
                    type="button"
                    onClick={() => handleDelete(String(selectedMeas._id))}
                    disabled={deletingId === String(selectedMeas._id)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-950/60 px-4 py-2 text-xs font-bold text-red-400 hover:bg-red-600 hover:text-white transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    {deletingId === String(selectedMeas._id) ? "Deleting..." : "Delete"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditMode(true)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2 text-xs font-extrabold text-black hover:bg-stone-200 transition-all cursor-pointer"
                  >
                    <Pencil className="h-3.5 w-3.5" /> Edit
                  </button>
                </div>
              </>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
