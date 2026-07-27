"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, FileText, Trash2, Calendar, User } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { proformaService, organizationService } from "@/lib/services";
import { Proforma, ProformaItem } from "@/lib/types";

export default function ProformasPage() {
  const router = useRouter();
  const [proformas, setProformas] = useState<Proforma[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [items, setItems] = useState<ProformaItem[]>([]);
  
  const [newItemDesc, setNewItemDesc] = useState("");
  const [newItemQty, setNewItemQty] = useState(1);
  const [newItemPrice, setNewItemPrice] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const sub = await organizationService.getSubscription();
        if (sub && (sub.isPremium || sub.status === "ACTIVE")) {
          setIsPremium(true);
          const data = await proformaService.getAll();
          setProformas(data);
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

  const handleAddItem = () => {
    const priceNum = parseFloat(newItemPrice);
    if (!newItemDesc || isNaN(priceNum) || priceNum <= 0) return;
    
    setItems([
      ...items,
      { id: Date.now().toString(), description: newItemDesc, quantity: newItemQty, price: priceNum }
    ]);
    setNewItemDesc("");
    setNewItemQty(1);
    setNewItemPrice("");
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  const handleCreateProforma = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone || items.length === 0) {
      alert("Please enter client details and at least one item.");
      return;
    }
    
    try {
      const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      const newProforma = await proformaService.create({
        clientName,
        clientPhone,
        items,
        subtotal
      });
      setProformas([newProforma, ...proformas]);
      setIsModalOpen(false);
      setClientName("");
      setClientPhone("");
      setItems([]);
    } catch (err) {
      console.error(err);
      alert("Failed to create pro-forma invoice.");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this pro-forma invoice?")) {
      try {
        await proformaService.delete(id);
        setProformas(proformas.filter(p => p._id !== id));
      } catch (err) {
        console.error(err);
        alert("Failed to delete pro-forma.");
      }
    }
  };

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (loading || !isPremium) {
    return (
      <div className="flex h-64 items-center justify-center text-stone-400 font-medium text-xs">
        Loading Pro-Formas...
      </div>
    );
  }

  return (
    <div className="space-y-6 text-white" style={{ fontFamily: 'var(--font-varela-round)' }}>
      {/* Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white uppercase" style={{ fontFamily: 'var(--font-varela-round)' }}>
            Pro-Forma Invoices
          </h1>
          <p className="text-xs text-stone-400 mt-1 font-medium">
            Generate and manage quotes for prospective clients.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-extrabold text-black shadow-xs hover:bg-stone-200 transition-all cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5 text-black" />
          Create Quote
        </button>
      </div>

      {/* Grid of Proformas */}
      {proformas.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-stone-950 p-12 text-center text-stone-400 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-stone-400">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white uppercase" style={{ fontFamily: 'var(--font-varela-round)' }}>
            No Quotes Yet
          </h3>
          <p className="text-xs text-stone-400 font-medium max-w-sm mx-auto">
            Create professional pro-forma invoices to send to clients for approval before starting an order.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {proformas.map((proforma) => (
            <div
              key={proforma._id}
              className="rounded-3xl border border-white/10 bg-stone-950 p-6 shadow-xl transition-all hover:border-white/20 relative"
            >
              <button 
                onClick={() => handleDelete(proforma._id)}
                className="absolute top-4 right-4 p-2 bg-rose-950/40 text-rose-400 rounded-full hover:bg-rose-500 hover:text-white transition cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white">
                  <User className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase">{proforma.clientName}</h3>
                  <p className="text-xs text-stone-400">{proforma.clientPhone}</p>
                </div>
              </div>
              
              <div className="space-y-3 border-t border-white/10 pt-4">
                <div className="flex justify-between text-xs">
                  <span className="text-stone-400">Total Amount:</span>
                  <span className="font-bold text-emerald-400">GH₵ {proforma.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-stone-400">Items:</span>
                  <span className="font-bold text-white">{proforma.items.length} items</span>
                </div>
                <div className="flex justify-between text-xs items-center">
                  <span className="text-stone-400"><Calendar className="w-3 h-3 inline mr-1" /> Created:</span>
                  <span className="font-bold text-white">{new Date(proforma.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Pro-Forma Invoice"
        subtitle="Provide an exact quote to a prospective client."
      >
        <div className="space-y-4 pt-2 text-white" style={{ fontFamily: 'var(--font-varela-round)' }}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1.5">Client Name *</label>
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g. Ama Ghana"
                className="w-full rounded-xl border border-white/10 bg-stone-900 px-3.5 py-2.5 text-xs font-medium text-white placeholder-stone-500 focus:border-white/30 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1.5">Client Phone *</label>
              <input
                type="tel"
                required
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder="e.g. +233 55 000 0000"
                className="w-full rounded-xl border border-white/10 bg-stone-900 px-3.5 py-2.5 text-xs font-medium text-white placeholder-stone-500 focus:border-white/30 focus:outline-none"
              />
            </div>
          </div>
          
          <div className="border border-white/10 rounded-xl p-4 bg-stone-900/50 mt-4">
            <h4 className="text-xs font-bold text-white uppercase mb-3">Invoice Items</h4>
            
            {items.length > 0 && (
              <div className="space-y-2 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between bg-stone-900 p-2 rounded-lg border border-white/5 text-xs">
                    <span className="font-medium">{item.quantity}x {item.description}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-emerald-400 font-bold">GH₵ {(item.price * item.quantity).toFixed(2)}</span>
                      <button onClick={() => handleRemoveItem(item.id)} className="text-rose-400 hover:text-rose-500">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between items-center text-sm border-t border-white/10 pt-2 mt-2">
                  <span className="font-bold text-stone-400">Total:</span>
                  <span className="font-extrabold text-emerald-400">GH₵ {subtotal.toFixed(2)}</span>
                </div>
              </div>
            )}

            <div className="flex gap-2 items-start mt-2">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Item description..."
                  value={newItemDesc}
                  onChange={(e) => setNewItemDesc(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-stone-900 px-3 py-2 text-xs text-white placeholder-stone-500 focus:outline-none mb-2"
                />
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Qty"
                    min="1"
                    value={newItemQty}
                    onChange={(e) => setNewItemQty(parseInt(e.target.value) || 1)}
                    className="w-20 rounded-lg border border-white/10 bg-stone-900 px-3 py-2 text-xs text-white focus:outline-none"
                  />
                  <input
                    type="number"
                    placeholder="Unit Price"
                    value={newItemPrice}
                    onChange={(e) => setNewItemPrice(e.target.value)}
                    className="flex-1 rounded-lg border border-white/10 bg-stone-900 px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>
              <button 
                type="button" 
                onClick={handleAddItem}
                className="bg-white/10 hover:bg-white/20 text-white rounded-lg p-2 h-[72px] transition flex items-center justify-center cursor-pointer"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-4 mt-6">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="rounded-full border border-white/10 px-5 py-2.5 text-xs font-bold text-stone-400 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateProforma}
              className="rounded-full bg-white px-6 py-2.5 text-xs font-extrabold text-black hover:bg-stone-200 transition-all cursor-pointer shadow-xs"
            >
              Generate Quote
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
