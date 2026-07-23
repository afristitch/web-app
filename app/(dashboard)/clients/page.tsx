"use client";

import React, { useEffect, useState } from "react";
import {
  Users,
  Search,
  Plus,
  Phone,
  Mail,
  MapPin,
  Eye,
  Trash2,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { Client } from "@/lib/types";
import { clientService } from "@/lib/services";
import { ClientModal } from "@/components/clients/ClientModal";

export default function ClientsListPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const data = await clientService.getAll();
      setClients(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const filteredClients = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm) ||
      (c.email && c.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this client record?")) {
      await clientService.delete(id);
      fetchClients();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-5">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
            Clients Directory
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Manage your client profiles, contact numbers, and tailoring measurements.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/clients/groups"
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 transition-all"
          >
            Group Orders
          </Link>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-slate-800 transition-all"
          >
            <Plus className="h-3.5 w-3.5 text-white" />
            Add New Client
          </button>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by client name, phone number, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-4 text-xs font-medium text-slate-900 focus:border-slate-400 focus:bg-white focus:outline-none transition-all"
          />
        </div>
        <div className="text-xs text-slate-500 font-semibold">
          Total Clients: <span className="text-slate-900 font-bold">{filteredClients.length}</span>
        </div>
      </div>

      {/* Clean Table */}
      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-3">Client Name</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Address</th>
                <th className="px-6 py-3">Notes</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-400">
                    Loading client directory...
                  </td>
                </tr>
              ) : filteredClients.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-400">
                    No clients found matching your search.
                  </td>
                </tr>
              ) : (
                filteredClients.map((client) => (
                  <tr
                    key={client._id}
                    className="group transition-colors hover:bg-slate-50/60"
                  >
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-900">
                          {client.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <Link
                            href={`/clients/${client._id}`}
                            className="font-bold text-slate-900 hover:underline"
                          >
                            {client.name}
                          </Link>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3.5 text-slate-600 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Phone className="h-3 w-3 text-slate-400" />
                        {client.phone}
                      </div>
                    </td>
                    <td className="px-6 py-3.5 text-slate-500 font-medium">
                      {client.email ? (
                        <div className="flex items-center gap-1.5">
                          <Mail className="h-3 w-3 text-slate-400" />
                          {client.email}
                        </div>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="px-6 py-3.5 text-slate-500 font-medium max-w-xs truncate">
                      {client.address ? (
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-3 w-3 text-slate-400 shrink-0" />
                          <span className="truncate">{client.address}</span>
                        </div>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="px-6 py-3.5 text-slate-500 font-medium max-w-xs truncate">
                      {client.notes || "-"}
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={`https://wa.me/${client.phone.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noreferrer"
                          title="WhatsApp Chat"
                          className="rounded-lg border border-emerald-200 bg-emerald-50 p-1.5 text-emerald-700 hover:bg-emerald-100 transition-colors"
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                        </a>
                        <Link
                          href={`/clients/${client._id}`}
                          className="rounded-lg border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-100 transition-colors"
                          title="View Client Details"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(client._id)}
                          className="rounded-lg border border-rose-100 bg-rose-50 p-1.5 text-rose-600 hover:bg-rose-100 transition-colors"
                          title="Delete Client"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ClientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchClients}
      />
    </div>
  );
}
