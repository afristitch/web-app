"use client";

import React, { useEffect, useState } from "react";
import { FolderGit2, Plus, Users, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Group } from "@/lib/types";
import { groupService } from "@/lib/services";
import { Modal } from "@/components/ui/Modal";

export default function ClientGroupsPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const fetchGroups = async () => {
    setLoading(true);
    try {
      const data = await groupService.getAll();
      setGroups(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    const newG: Group = {
      _id: `grp-${Date.now()}`,
      name,
      description,
      memberCount: 0,
      createdAt: new Date().toISOString(),
    };
    setGroups([newG, ...groups]);
    setName("");
    setDescription("");
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/clients"
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Clients
            </Link>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Group Orders & Event Collections
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Organize clients by bulk order events such as Weddings, Aso-Ebi, and School Uniforms.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-[#005B82] px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-[#004A6B] transition-all"
        >
          <Plus className="h-3.5 w-3.5 text-white" />
          Create New Group
        </button>
      </div>

      {/* Grid of Groups */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="col-span-full py-12 text-center text-xs text-slate-400">
            Loading groups...
          </div>
        ) : (
          groups.map((group) => (
            <div
              key={group._id}
              className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all hover:border-slate-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-900 font-bold text-xs">
                    <FolderGit2 className="h-4.5 w-4.5 text-slate-900" />
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                    <Users className="h-3 w-3" /> {group.memberCount || 0} Members
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  {group.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {group.description || "No group description provided."}
                </p>
              </div>

              <div className="mt-5 border-t border-slate-100 pt-3 flex items-center justify-between text-xs">
                <span className="text-[10px] text-slate-400">
                  Created {group.createdAt?.split("T")[0] || "recently"}
                </span>
                <button className="font-bold text-slate-900 hover:underline">
                  Manage Group →
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create Group Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Group Order"
        subtitle="Group clients together for event outfits or bulk tailoring."
      >
        <form onSubmit={handleCreateGroup} className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Group / Event Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Adeleke Wedding Aso-Ebi Train"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium focus:border-slate-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Event Description & Notes
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Emerald Green theme, fittings needed by September 15th."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium focus:border-slate-400 focus:outline-none resize-none"
            />
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
              className="rounded-xl bg-[#005B82] px-5 py-2 text-xs font-semibold text-white hover:bg-[#004A6B] transition-colors shadow-2xs"
            >
              Create Group
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
