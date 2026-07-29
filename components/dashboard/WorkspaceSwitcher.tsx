"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronDown, Check } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

export function WorkspaceSwitcher() {
  const { activeWorkspace, memberships, switchWorkspace } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!activeWorkspace) {
    return (
      <div className="flex-1 min-w-0 pr-2">
        <span className="block text-sm font-extrabold tracking-tight text-white truncate">
          Loading...
        </span>
      </div>
    );
  }

  const hasMultipleWorkspaces = memberships.length > 1;

  return (
    <div className="relative flex-1 min-w-0 pr-2">
      <button
        onClick={() => hasMultipleWorkspaces && setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-3 w-full text-left focus:outline-none rounded-lg p-1 transition-colors",
          hasMultipleWorkspaces && "hover:bg-white/5 cursor-pointer"
        )}
        disabled={!hasMultipleWorkspaces}
      >
        {activeWorkspace.logoUrl ? (
          <Image
            src={activeWorkspace.logoUrl}
            alt={activeWorkspace.name || "Business Logo"}
            width={38}
            height={38}
            className="object-cover shrink-0 rounded-full h-9 w-9 border border-white/20"
            unoptimized
          />
        ) : (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-lg font-extrabold text-black uppercase">
            {activeWorkspace.name ? activeWorkspace.name.slice(0, 1) : "B"}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <span className="block text-sm font-extrabold tracking-tight text-white truncate">
            {activeWorkspace.name || "My Business"}
          </span>
          <span className="block text-[10px] font-semibold text-stone-400 tracking-wider truncate">
            Workspace
          </span>
        </div>
        
        {hasMultipleWorkspaces && (
          <ChevronDown className="h-4 w-4 text-stone-400 shrink-0 ml-1" />
        )}
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-2 w-[240px] z-50 bg-stone-900 border border-stone-800 rounded-xl shadow-xl overflow-hidden py-1">
            <div className="px-3 py-2 border-b border-stone-800">
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Switch Workspace</p>
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              {memberships.map((membership) => {
                const org = membership.organization;
                if (!org) return null;
                const isActive = activeWorkspace._id === org._id || activeWorkspace.id === org.id;
                
                return (
                  <button
                    key={membership._id}
                    onClick={() => {
                      switchWorkspace(org._id || org.id || "");
                      setIsOpen(false);
                    }}
                    className={cn(
                      "flex items-center gap-3 w-full text-left px-3 py-2.5 transition-colors",
                      isActive ? "bg-white/10" : "hover:bg-white/5"
                    )}
                  >
                    {org.logoUrl ? (
                      <Image
                        src={org.logoUrl}
                        alt={org.name}
                        width={28}
                        height={28}
                        className="object-cover shrink-0 rounded-full h-7 w-7 border border-white/20"
                        unoptimized
                      />
                    ) : (
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-stone-700 text-xs font-extrabold text-white uppercase">
                        {org.name ? org.name.slice(0, 1) : "B"}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <span className="block text-sm font-semibold text-white truncate">
                        {org.name}
                      </span>
                      <span className="block text-[10px] text-stone-400 capitalize">
                        {membership.role.toLowerCase().replace('_', ' ')}
                      </span>
                    </div>
                    {isActive && (
                      <Check className="h-4 w-4 text-white shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
            <div className="border-t border-stone-800 p-2">
               <button
                  onClick={async () => {
                     if (confirm(`Are you sure you want to leave ${activeWorkspace.name}?`)) {
                        try {
                           const { api } = await import('@/lib/api-client');
                           await api.delete('/users/memberships/exit');
                           alert('You have successfully left the workspace.');
                           window.location.href = '/dashboard'; // Force reload to re-fetch memberships
                        } catch (err: any) {
                           alert(err.message || 'Failed to leave workspace.');
                        }
                     }
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded-lg transition-colors"
               >
                 Leave Current Workspace
               </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
