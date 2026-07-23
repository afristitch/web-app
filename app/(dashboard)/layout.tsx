"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { ClientModal } from "@/components/clients/ClientModal";
import { OrderModal } from "@/components/orders/OrderModal";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  return (
    <div 
      className="flex h-screen w-full bg-black text-white font-sans overflow-hidden selection:bg-white selection:text-black"
      style={{ fontFamily: 'var(--font-varela-round)' }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden bg-black text-white">
        <Header />

        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-black">
          <div className="mx-auto max-w-7xl space-y-6">{children}</div>
        </main>
      </div>

      {/* Global Quick Action Modals */}
      <ClientModal
        isOpen={isClientModalOpen}
        onClose={() => setIsClientModalOpen(false)}
      />
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
      />
    </div>
  );
}
