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
  CreateTemplateRequest,
  UpdateTemplateRequest,
  Group,
  Organization,
  NotificationItem,
  NotificationHistoryResponse,
  Style,
  CreateStyleRequest,
  UpdateStyleRequest,
  TeamUser,
  CreateTeamUserRequest,
  UpdateTeamUserRequest,
  Plan,
  DiscountTier,
  PriceBreakdown,
  UploadResult,
  AvatarPreset,
} from "./types";

// Helper to safely extract Array from any API response structure
// e.g. [...], { data: [...] }, { data: { orders: [...] } }, { orders: [...] }, etc.
function extractArray<T>(res: any): T[] {
  if (Array.isArray(res)) return res;
  if (res && Array.isArray(res.data)) return res.data;
  if (res && res.data && Array.isArray(res.data.data)) return res.data.data;
  if (res && res.data && Array.isArray(res.data.orders)) return res.data.orders;
  if (res && res.data && Array.isArray(res.data.clients)) return res.data.clients;
  if (res && res.data && Array.isArray(res.data.measurements)) return res.data.measurements;
  if (res && res.data && Array.isArray(res.data.groups)) return res.data.groups;
  if (res && res.data && Array.isArray(res.data.templates)) return res.data.templates;
  if (res && res.data && Array.isArray(res.data.items)) return res.data.items;
  if (res && res.data && Array.isArray(res.data.styles)) return res.data.styles;
  if (res && res.data && Array.isArray(res.data.users)) return res.data.users;
  if (res && res.data && Array.isArray(res.data.notifications)) return res.data.notifications;
  if (res && Array.isArray(res.orders)) return res.orders;
  if (res && Array.isArray(res.clients)) return res.clients;
  if (res && Array.isArray(res.measurements)) return res.measurements;
  if (res && Array.isArray(res.groups)) return res.groups;
  if (res && Array.isArray(res.templates)) return res.templates;
  if (res && Array.isArray(res.items)) return res.items;
  if (res && Array.isArray(res.styles)) return res.styles;
  if (res && Array.isArray(res.users)) return res.users;
  if (res && Array.isArray(res.notifications)) return res.notifications;
  return [];
}

// ─── Client Service ─────────────────────────────────────────────────────────
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
  async getPaginated(page: number = 1, limit: number = 10, search: string = ""): Promise<{ clients: Client[]; pagination: { total: number; page: number; limit: number; totalPages: number } }> {
    try {
      const query = new URLSearchParams({ page: page.toString(), limit: limit.toString() });
      if (search) query.append("search", search);
      const res = await api.get(`/clients?${query.toString()}`);
      
      const clients = extractArray<Client>(res);
      const pagination = res?.data?.pagination || { total: clients.length, page, limit, totalPages: 1 };
      
      return { clients, pagination };
    } catch (err) {
      console.error("[clientService.getPaginated] Error:", err);
      return { clients: [], pagination: { total: 0, page, limit, totalPages: 1 } };
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

// ─── Order Service ──────────────────────────────────────────────────────────
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

// ─── Measurement Service ────────────────────────────────────────────────────
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
  async update(id: string, data: Partial<CreateMeasurementRequest>): Promise<Measurement> {
    const res = await api.put(`/measurements/${id}`, data);
    return res.data || res;
  },
  async delete(id: string): Promise<void> {
    await api.delete(`/measurements/${id}`);
  },
  async getTemplates(): Promise<MeasurementTemplate[]> {
    try {
      const res = await api.get("/measurements/templates");
      return extractArray<MeasurementTemplate>(res);
    } catch {
      return [];
    }
  },
};

// ─── Template Service (Full CRUD) ───────────────────────────────────────────
// Matches mobile: POST/GET/PUT/DELETE /measurements/templates
export const templateService = {
  async getAll(): Promise<MeasurementTemplate[]> {
    try {
      const res = await api.get("/measurements/templates");
      return extractArray<MeasurementTemplate>(res);
    } catch {
      return [];
    }
  },
  async getById(id: string): Promise<MeasurementTemplate | null> {
    try {
      const res = await api.get(`/measurements/templates/${id}`);
      return res.data || res || null;
    } catch {
      return null;
    }
  },
  async create(data: CreateTemplateRequest): Promise<MeasurementTemplate> {
    const res = await api.post("/measurements/templates", data);
    return res.data || res;
  },
  async update(id: string, data: UpdateTemplateRequest): Promise<MeasurementTemplate> {
    const res = await api.put(`/measurements/templates/${id}`, data);
    return res.data || res;
  },
  async delete(id: string): Promise<void> {
    await api.delete(`/measurements/templates/${id}`);
  },
};

// ─── Group Service ──────────────────────────────────────────────────────────
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

// ─── Organization Service ───────────────────────────────────────────────────
export const organizationService = {
  async getProfile(): Promise<Organization | null> {
    try {
      const res = await api.get("/organization");
      return res.data || res || null;
    } catch {
      return null;
    }
  },
  async getSubscription(): Promise<{ plan?: string; status: string; subscriptionEndsAt?: string; isPremium: boolean; daysLeft: number } | null> {
    try {
      const res = await api.get("/organization/subscription");
      return res.data || res || null;
    } catch {
      return null;
    }
  },
  async updateProfile(data: Partial<Organization>): Promise<any> {
    const res = await api.put("/organization", data);
    return res.data || res;
  },
  async deleteAccount(): Promise<void> {
    await api.delete("/organization");
  },
};

// ─── Auth Service ───────────────────────────────────────────────────────────
export const authService = {
  async changePassword(data: { currentPassword: string; newPassword: string }): Promise<any> {
    const res = await api.post("/auth/change-password", data);
    return res.data || res;
  },
  async forgotPassword(email: string): Promise<any> {
    const res = await api.post("/auth/forgot-password", { email });
    return res.data || res;
  },
};

// ─── Notification Service ───────────────────────────────────────────────────
// Matches mobile: GET /notifications, PATCH /notifications/:id/read, PATCH /notifications/read-all
export const notificationService = {
  async getNotifications(page = 1, limit = 20): Promise<NotificationHistoryResponse | null> {
    try {
      const res = await api.get(`/notifications?page=${page}&limit=${limit}`);
      return res.data || res || null;
    } catch {
      return null;
    }
  },
  async markAsRead(id: string): Promise<void> {
    await api.patch(`/notifications/${id}/read`, {});
  },
  async markAllAsRead(): Promise<void> {
    await api.patch("/notifications/read-all", {});
  },
};

// ─── SMS Service ────────────────────────────────────────────────────────────
// Matches mobile: POST /sms/order-ready, POST /sms/marketing
export const smsService = {
  async notifyOrderReady(orderId: string): Promise<any> {
    const res = await api.post("/sms/order-ready", { orderId });
    return res.data || res;
  },
  async sendBulkMarketing(message: string): Promise<any> {
    const res = await api.post("/sms/marketing", { message });
    return res.data || res;
  },
};

// ─── Style Service (Outfit Catalog) ─────────────────────────────────────────
// Matches mobile: GET/POST/PUT/DELETE /styles
export const styleService = {
  async getAll(params?: { gender?: string; search?: string; page?: number; limit?: number }): Promise<Style[]> {
    try {
      const query = new URLSearchParams();
      if (params?.gender) query.append("gender", params.gender);
      if (params?.search) query.append("search", params.search);
      if (params?.page) query.append("page", params.page.toString());
      if (params?.limit) query.append("limit", params.limit.toString());
      const qs = query.toString();
      const res = await api.get(`/styles${qs ? `?${qs}` : ""}`);
      return extractArray<Style>(res);
    } catch {
      return [];
    }
  },
  async getMine(params?: { gender?: string; page?: number; limit?: number }): Promise<Style[]> {
    try {
      const query = new URLSearchParams();
      if (params?.gender) query.append("gender", params.gender);
      if (params?.page) query.append("page", params.page.toString());
      if (params?.limit) query.append("limit", params.limit.toString());
      const qs = query.toString();
      const res = await api.get(`/styles/me${qs ? `?${qs}` : ""}`);
      return extractArray<Style>(res);
    } catch {
      return [];
    }
  },
  async getById(id: string): Promise<Style | null> {
    try {
      const res = await api.get(`/styles/${id}`);
      return res.data || res || null;
    } catch {
      return null;
    }
  },
  async create(data: CreateStyleRequest): Promise<Style> {
    const res = await api.post("/styles", data);
    return res.data || res;
  },
  async update(id: string, data: UpdateStyleRequest): Promise<Style> {
    const res = await api.put(`/styles/${id}`, data);
    return res.data || res;
  },
  async delete(id: string): Promise<void> {
    await api.delete(`/styles/${id}`);
  },
};

// ─── Team / User Service ────────────────────────────────────────────────────
// Matches mobile: GET/POST/PUT/DELETE /users
export const userService = {
  async getAll(): Promise<TeamUser[]> {
    try {
      const res = await api.get("/users");
      return extractArray<TeamUser>(res);
    } catch {
      return [];
    }
  },
  async getById(id: string): Promise<TeamUser | null> {
    try {
      const res = await api.get(`/users/${id}`);
      return res.data || res || null;
    } catch {
      return null;
    }
  },
  async create(data: CreateTeamUserRequest): Promise<TeamUser> {
    const res = await api.post("/users", data);
    return res.data || res;
  },
  async update(id: string, data: UpdateTeamUserRequest): Promise<TeamUser> {
    const res = await api.put(`/users/${id}`, data);
    return res.data || res;
  },
  async delete(id: string): Promise<void> {
    await api.delete(`/users/${id}`);
  },
};

// ─── Profile Service ────────────────────────────────────────────────────────
// Matches mobile: GET/PUT /profile/me, GET /avatars
export const profileService = {
  async getMyProfile(): Promise<any> {
    try {
      const res = await api.get("/profile/me");
      return res.data || res || null;
    } catch {
      return null;
    }
  },
  async updateProfile(data: Record<string, any>): Promise<any> {
    const res = await api.put("/profile/me", data);
    return res.data || res;
  },
  async getAvatarPresets(): Promise<AvatarPreset[]> {
    try {
      const res = await api.get("/avatars");
      return extractArray<AvatarPreset>(res);
    } catch {
      return [];
    }
  },
  async deleteMyProfile(): Promise<void> {
    await api.delete("/profile/me");
  },
};

// ─── Upload Service ─────────────────────────────────────────────────────────
// Matches mobile: POST /upload?folder=X
export const uploadService = {
  async uploadImage(file: File, folder?: string): Promise<UploadResult> {
    const formData = new FormData();
    formData.append("image", file);
    const path = folder ? `/upload?folder=${encodeURIComponent(folder)}` : "/upload";
    const res = await api.upload(path, formData);
    return res.data || res;
  },
};

// ─── Payment / Plan Service (Paystack) ──────────────────────────────────────
// Matches mobile: GET /plans, GET /plans/discounts, POST /plans/calculate-price, POST /payments/initialize
export const paymentService = {
  async getPlans(): Promise<Plan[]> {
    try {
      const res = await api.get("/plans");
      return extractArray<Plan>(res);
    } catch {
      return [];
    }
  },
  async getDiscounts(): Promise<DiscountTier[]> {
    try {
      const res = await api.get("/plans/discounts");
      return extractArray<DiscountTier>(res);
    } catch {
      return [];
    }
  },
  async calculatePrice(planId: string, months: number): Promise<PriceBreakdown | null> {
    try {
      const res = await api.post("/plans/calculate-price", { planId, months });
      return res.data || res || null;
    } catch {
      return null;
    }
  },
  async initializePayment(planId: string, months: number, callbackUrl?: string): Promise<{ authorization_url: string; access_code: string; reference: string }> {
    const res = await api.post("/payments/initialize", { planId, months, callbackUrl });
    return res.data || res;
  },
};
