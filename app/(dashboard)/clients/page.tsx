"use client";

import React, { useEffect, useState } from "react";
import {
  Users,
  Search,
  Plus,
  MapPin,
  Eye,
  Trash2,
  FolderGit2,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { Client, Group } from "@/lib/types";
import { clientService, groupService } from "@/lib/services";
import { ClientModal } from "@/components/clients/ClientModal";
import { Modal } from "@/components/ui/Modal";

export default function ClientsListPage() {
  const [viewMode, setViewMode] = useState<"individual" | "groups">("individual");
  const [clients, setClients] = useState<Client[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalClients, setTotalClients] = useState(0);

  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [clientData, groupData] = await Promise.all([
        clientService.getPaginated(page, 10, searchTerm),
        groupService.getAll(),
      ]);
      setClients(clientData.clients);
      setTotalPages(clientData.pagination.totalPages);
      setTotalClients(clientData.pagination.total);
      setGroups(Array.isArray(groupData) ? groupData : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 300); // debounce search
    return () => clearTimeout(timer);
  }, [page, searchTerm]);

  // When search changes, reset page to 1
  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  const filteredClients = clients; // now handled by backend

  const handleDeleteClient = async (id: string) => {
    if (confirm("Are you sure you want to delete this client record?")) {
      await clientService.delete(id);
      fetchData();
    }
  };

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupName) return;
    const newG: Group = {
      _id: `grp-${Date.now()}`,
      name: groupName,
      description: groupDescription,
      memberCount: 0,
      createdAt: new Date().toISOString(),
    };
    setGroups([newG, ...groups]);
    setGroupName("");
    setGroupDescription("");
    setIsGroupModalOpen(false);
  };

  return (
    <div className="space-y-6 text-white" style={{ fontFamily: 'var(--font-varela-round)' }}>
      {/* Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white uppercase" style={{ fontFamily: 'var(--font-varela-round)' }}>
            Clients & Group Directory
          </h1>
          <p className="text-xs text-stone-400 mt-1 font-medium">
            Manage your client profiles, tailoring measurements, and bulk event group orders.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Toggle View Pills */}
          <div className="flex items-center rounded-full bg-stone-900 border border-white/10 p-1">
            <button
              onClick={() => setViewMode("individual")}
              className={`px-3 sm:px-4 py-1.5 text-xs font-bold rounded-full transition-all cursor-pointer ${
                viewMode === "individual"
                  ? "bg-white text-black font-extrabold shadow-sm"
                  : "text-stone-400 hover:text-white"
              }`}
            >
              <span className="hidden sm:inline">Individual Clients </span>({totalClients})
            </button>
            <button
              onClick={() => setViewMode("groups")}
              className={`px-3 sm:px-4 py-1.5 text-xs font-bold rounded-full transition-all cursor-pointer ${
                viewMode === "groups"
                  ? "bg-white text-black font-extrabold shadow-sm"
                  : "text-stone-400 hover:text-white"
              }`}
            >
              <span className="hidden sm:inline">Group Orders </span>({groups.length})
            </button>
          </div>

          {viewMode === "individual" ? (
            <button
              onClick={() => setIsClientModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-xs font-extrabold text-black shadow-xs hover:bg-stone-200 transition-all cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5 text-black" />
              <span className="hidden sm:inline">Add Client</span>
              <span className="sm:hidden">Add</span>
            </button>
          ) : (
            <button
              onClick={() => setIsGroupModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-xs font-extrabold text-black shadow-xs hover:bg-stone-200 transition-all cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5 text-black" />
              <span className="hidden sm:inline">Create Group</span>
              <span className="sm:hidden">New</span>
            </button>
          )}
        </div>
      </div>

      {/* View Mode 1: Individual Clients */}
      {viewMode === "individual" && (
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="flex items-center justify-between gap-4 rounded-3xl border border-white/10 bg-stone-950 p-4 shadow-xl">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search by name, phone or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-9.5 w-full rounded-xl border border-white/10 bg-stone-900/80 pl-10 pr-4 text-xs font-medium text-white placeholder:text-stone-500 focus:border-white/30 focus:outline-none transition-all"
              />
            </div>
            <div className="text-xs text-stone-400 font-bold whitespace-nowrap">
              <span className="hidden sm:inline">Total Clients: </span>
              <span className="text-white font-extrabold">{totalClients}</span>
            </div>
          </div>

          {/* ── Mobile: Card list ── */}
          <div className="sm:hidden space-y-3">
            {loading ? (
              <div className="py-10 text-center text-xs text-stone-400">Loading clients...</div>
            ) : filteredClients.length === 0 ? (
              <div className="py-10 text-center text-xs text-stone-400">No clients found.</div>
            ) : (
              filteredClients.map((client) => (
                <Link
                  key={client._id}
                  href={`/clients/${client._id}`}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-stone-950 p-4 hover:bg-white/5 transition-colors"
                >
                  {/* Avatar */}
                  {client.photoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={client.photoUrl} alt={client.name} className="h-11 w-11 rounded-full object-cover border border-white/20 flex-shrink-0" />
                  ) : (
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-sm font-extrabold text-black flex-shrink-0 uppercase">
                      {client.name.slice(0, 2)}
                    </div>
                  )}
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-white text-sm truncate">{client.name}</p>
                    <p className="text-xs text-stone-400 font-medium mt-0.5 truncate">{client.phone}</p>
                    {client.email && <p className="text-[11px] text-stone-500 truncate">{client.email}</p>}
                  </div>
                  <ChevronRight className="h-4 w-4 text-stone-500 flex-shrink-0" />
                </Link>
              ))
            )}
          </div>

          {/* ── Desktop: Table ── */}
          <div className="hidden sm:block rounded-3xl border border-white/10 bg-stone-950 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 bg-stone-900/60 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                    <th className="px-6 py-4">Client Name</th>
                    <th className="px-6 py-4">Phone</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Address</th>
                    <th className="px-6 py-4">Notes</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-10 text-center text-stone-400 font-medium">
                        Loading client directory...
                      </td>
                    </tr>
                  ) : filteredClients.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-10 text-center text-stone-400 font-medium">
                        No clients found matching your search.
                      </td>
                    </tr>
                  ) : (
                    filteredClients.map((client) => (
                      <tr key={client._id} className="group transition-colors hover:bg-white/5">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {client.photoUrl ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={client.photoUrl} alt={client.name} className="h-8 w-8 rounded-full object-cover border border-white/20 flex-shrink-0" />
                            ) : (
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white flex-shrink-0">
                                {client.name.slice(0, 2).toUpperCase()}
                              </div>
                            )}
                            <Link href={`/clients/${client._id}`} className="font-bold text-white hover:underline">
                              {client.name}
                            </Link>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-stone-300 font-medium">{client.phone}</td>
                        <td className="px-6 py-4 text-stone-300 font-medium">{client.email || "-"}</td>
                        <td className="px-6 py-4 text-stone-300 font-medium max-w-xs truncate">
                          {client.address ? (
                            <div className="flex items-center gap-1.5">
                              <MapPin className="h-3 w-3 text-stone-400 shrink-0" />
                              <span className="truncate">{client.address}</span>
                            </div>
                          ) : "-"}
                        </td>
                        <td className="px-6 py-4 text-stone-300 font-medium max-w-xs truncate">{client.notes || "-"}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-3">
                            <a href={`https://wa.me/${client.phone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noreferrer" title="WhatsApp Chat" className="group p-1.5 transition-colors cursor-pointer">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src="https://img.icons8.com/?size=100&id=Cq0bCO6BqKJw&format=png&color=000000" alt="WhatsApp" className="h-4 w-4 invert opacity-50 group-hover:opacity-100 transition-opacity" />
                            </a>
                            <Link href={`/clients/${client._id}`} className="p-1.5 text-stone-500 hover:text-white transition-colors cursor-pointer" title="View Client Details">
                              <Eye className="h-4 w-4" />
                            </Link>
                            <button onClick={() => handleDeleteClient(client._id)} className="p-1.5 text-stone-500 hover:text-red-400 transition-colors cursor-pointer" title="Delete Client">
                              <Trash2 className="h-4 w-4" />
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
          
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-white/10 pt-4 px-2">
              <div className="text-xs text-stone-400 font-medium">
                Showing page <span className="text-white font-bold">{page}</span> of{" "}
                <span className="text-white font-bold">{totalPages}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1.5 rounded-lg border border-white/10 text-xs font-bold text-white disabled:opacity-50 hover:bg-white/10 transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1.5 rounded-lg border border-white/10 text-xs font-bold text-white disabled:opacity-50 hover:bg-white/10 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* View Mode 2: Group Orders Grid */}
      {viewMode === "groups" && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <div className="col-span-full py-12 text-center text-xs text-stone-400 font-medium">Loading groups...</div>
          ) : groups.length === 0 ? (
            <div className="col-span-full py-12 text-center text-xs text-stone-400 font-medium">No group orders created yet. Click "Create Group" to start.</div>
          ) : (
            groups.map((group) => (
              <div key={group._id} className="rounded-3xl border border-white/10 bg-stone-950 p-6 shadow-xl space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 border border-white/10 text-white font-bold text-xs">
                      <FolderGit2 className="h-5 w-5 text-white" />
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-white/10 border border-white/10 px-3 py-1 rounded-full">
                      <Users className="h-3.5 w-3.5" /> {group.memberCount || 0} Members
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-tight">{group.name}</h3>
                  <p className="text-xs text-stone-400 mt-2 font-medium line-clamp-2">{group.description || "No group description provided."}</p>
                </div>
                <div className="mt-4 border-t border-white/10 pt-4 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-stone-400 font-medium">Created {group.createdAt?.split("T")[0] || "recently"}</span>
                  <button className="font-extrabold text-white hover:underline cursor-pointer">Manage Group →</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Modals */}
      <ClientModal isOpen={isClientModalOpen} onClose={() => setIsClientModalOpen(false)} onSuccess={fetchData} />

      <Modal isOpen={isGroupModalOpen} onClose={() => setIsGroupModalOpen(false)} title="Create Group Order" subtitle="Group clients together for event outfits or bulk tailoring.">
        <form onSubmit={handleCreateGroup} className="space-y-4 pt-2 text-white" style={{ fontFamily: 'var(--font-varela-round)' }}>
          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1.5">Group / Event Title *</label>
            <input type="text" required placeholder="e.g. Adeleke Wedding Aso-Ebi Train" value={groupName} onChange={(e) => setGroupName(e.target.value)} className="w-full rounded-xl border border-white/10 bg-stone-900 px-3.5 py-2.5 text-xs font-medium text-white placeholder-stone-500 focus:border-white/30 focus:outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1.5">Event Description & Notes</label>
            <textarea rows={3} placeholder="e.g. Emerald Green theme, fittings needed by September 15th." value={groupDescription} onChange={(e) => setGroupDescription(e.target.value)} className="w-full rounded-xl border border-white/10 bg-stone-900 px-3.5 py-2.5 text-xs font-medium text-white placeholder-stone-500 focus:border-white/30 focus:outline-none resize-none" />
          </div>
          <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-4 mt-6">
            <button type="button" onClick={() => setIsGroupModalOpen(false)} className="rounded-full border border-white/10 px-5 py-2.5 text-xs font-bold text-stone-400 hover:bg-white/10 hover:text-white transition-all cursor-pointer">Cancel</button>
            <button type="submit" className="rounded-full bg-white px-6 py-2.5 text-xs font-extrabold text-black hover:bg-stone-200 transition-all cursor-pointer shadow-xs">Create Group</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
