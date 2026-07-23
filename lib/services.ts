import { api } from "./api-client";
import {
  Client,
  CreateClientRequest,
  UpdateClientRequest,
  Order,
  CreateOrderRequest,
  OrderStatus,
  Measurement,
  CreateMeasurementRequest,
  MeasurementTemplate,
  Group,
} from "./types";

// Helper to safely extract Array from any API response structure
// e.g. [...], { data: [...] }, { data: { orders: [...] } }, { orders: [...] }, etc.
function extractArray<T>(res: any): T[] {
  if (Array.isArray(res)) return res;
  if (res && Array.isArray(res.data)) return res.data;
  if (res && res.data && Array.isArray(res.data.orders)) return res.data.orders;
  if (res && res.data && Array.isArray(res.data.clients)) return res.data.clients;
  if (res && res.data && Array.isArray(res.data.measurements)) return res.data.measurements;
  if (res && res.data && Array.isArray(res.data.groups)) return res.data.groups;
  if (res && res.data && Array.isArray(res.data.templates)) return res.data.templates;
  if (res && res.data && Array.isArray(res.data.items)) return res.data.items;
  if (res && Array.isArray(res.orders)) return res.orders;
  if (res && Array.isArray(res.clients)) return res.clients;
  if (res && Array.isArray(res.measurements)) return res.measurements;
  if (res && Array.isArray(res.groups)) return res.groups;
  if (res && Array.isArray(res.templates)) return res.templates;
  if (res && Array.isArray(res.items)) return res.items;
  return [];
}

// API Client Services (Live Backend API Integration)
export const clientService = {
  async getAll(): Promise<Client[]> {
    try {
      const res = await api.get("/clients");
      return extractArray<Client>(res);
    } catch (err) {
      console.error("[clientService.getAll] Error:", err);
      return [];
    }
  },
  async getById(id: string): Promise<Client | null> {
    try {
      const res = await api.get(`/clients/${id}`);
      return res.data || res || null;
    } catch {
      return null;
    }
  },
  async create(data: CreateClientRequest): Promise<Client> {
    const res = await api.post("/clients", data);
    return res.data || res;
  },
  async update(id: string, data: UpdateClientRequest): Promise<Client> {
    const res = await api.put(`/clients/${id}`, data);
    return res.data || res;
  },
  async delete(id: string): Promise<void> {
    await api.delete(`/clients/${id}`);
  },
};

export const orderService = {
  async getAll(): Promise<Order[]> {
    try {
      const res = await api.get("/orders");
      return extractArray<Order>(res);
    } catch (err) {
      console.error("[orderService.getAll] Error:", err);
      return [];
    }
  },
  async getById(id: string): Promise<Order | null> {
    try {
      const res = await api.get(`/orders/${id}`);
      return res.data || res || null;
    } catch {
      return null;
    }
  },
  async create(data: CreateOrderRequest): Promise<Order> {
    const res = await api.post("/orders", data);
    return res.data || res;
  },
  async updateStatus(id: string, status: OrderStatus): Promise<Order> {
    const res = await api.patch(`/orders/${id}/status`, { status });
    return res.data || res;
  },
  async recordPayment(id: string, amount: number): Promise<Order> {
    const res = await api.patch(`/orders/${id}/payment`, { amount });
    return res.data || res;
  },
};

export const measurementService = {
  async getByClient(clientId: string): Promise<Measurement[]> {
    try {
      const res = await api.get(`/measurements/client/${clientId}`);
      return extractArray<Measurement>(res);
    } catch {
      return [];
    }
  },
  async create(data: CreateMeasurementRequest): Promise<Measurement> {
    const res = await api.post("/measurements", data);
    return res.data || res;
  },
  async getTemplates(): Promise<MeasurementTemplate[]> {
    try {
      const res = await api.get("/templates");
      return extractArray<MeasurementTemplate>(res);
    } catch {
      return [];
    }
  },
};

export const groupService = {
  async getAll(): Promise<Group[]> {
    try {
      const res = await api.get("/groups");
      return extractArray<Group>(res);
    } catch {
      return [];
    }
  },
};
